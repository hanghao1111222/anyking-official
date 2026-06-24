#!/usr/bin/env python3
"""
Listen for Lark bot file messages, download zip packages locally, and invoke the
product-site-publisher workflow against a target repo.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


DEFAULT_FILENAME_REGEX = r".+\.zip$"
DEPLOY_MARKERS = ("[deploy]", ".deploy.", "__deploy__")
PREVIEW_MARKERS = ("[preview]", ".preview.", "__preview__")


@dataclass
class FileMessage:
    message_id: str
    chat_id: str
    sender_type: str
    sender_id: str
    file_key: str
    file_name: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run a local Lark bot loop for product package publishing."
    )
    parser.add_argument("--repo", required=True, help="Target product-site repo root.")
    parser.add_argument(
        "--work-dir",
        help="Runtime directory for state, downloads, and logs. Defaults to <repo>/.lark-product-bot",
    )
    parser.add_argument(
        "--default-mode",
        choices=("preview", "deploy"),
        default="preview",
        help="Default workflow mode when the file name does not override it.",
    )
    parser.add_argument(
        "--filename-regex",
        default=DEFAULT_FILENAME_REGEX,
        help="Only process file messages whose file name matches this regex.",
    )
    parser.add_argument(
        "--allowed-chat-id",
        action="append",
        default=[],
        help="Limit processing to one or more chat IDs. Repeat this flag for multiple chats.",
    )
    parser.add_argument(
        "--preview-base-url",
        default="http://localhost:3000",
        help="Base URL included in success replies for preview mode.",
    )
    parser.add_argument(
        "--reply-in-thread",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Reply in thread instead of the main chat stream.",
    )
    parser.add_argument(
        "--skip-reply",
        action="store_true",
        help="Do not send Feishu replies; log locally only.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse events and print intended actions without downloading or publishing.",
    )
    parser.add_argument(
        "--once-event-file",
        help="Process one saved event JSON or NDJSON file and exit. Useful for local testing.",
    )
    return parser.parse_args()


def log(message: str) -> None:
    timestamp = datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")
    print(f"[{timestamp}] {message}", file=sys.stderr)


def fail(message: str) -> None:
    raise RuntimeError(message)


def repo_looks_valid(candidate: Path) -> bool:
    return (
        candidate.exists()
        and (candidate / "package.json").is_file()
        and (candidate / "scripts" / "agent-deploy.js").is_file()
    )


def sanitize_filename(value: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9._-]+", "-", value.strip())
    cleaned = re.sub(r"-{2,}", "-", cleaned).strip(".-")
    return cleaned or "package.zip"


def ensure_runtime_dirs(work_dir: Path) -> dict[str, Path]:
    paths = {
        "state": work_dir / "state.json",
        "jobs": work_dir / "jobs",
        "logs": work_dir / "logs",
    }
    work_dir.mkdir(parents=True, exist_ok=True)
    paths["jobs"].mkdir(parents=True, exist_ok=True)
    paths["logs"].mkdir(parents=True, exist_ok=True)
    if not paths["state"].exists():
        paths["state"].write_text(
            json.dumps({"processed": {}}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
    return paths


def load_state(state_path: Path) -> dict:
    try:
        return json.loads(state_path.read_text(encoding="utf-8"))
    except Exception:
        return {"processed": {}}


def save_state(state_path: Path, state: dict) -> None:
    state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")


def mark_processed(state: dict, state_path: Path, message_id: str, data: dict) -> None:
    processed = state.setdefault("processed", {})
    processed[message_id] = {
        **data,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    save_state(state_path, state)


def infer_mode(file_name: str, default_mode: str) -> str:
    lower_name = file_name.lower()
    if any(marker in lower_name for marker in DEPLOY_MARKERS):
        return "deploy"
    if any(marker in lower_name for marker in PREVIEW_MARKERS):
        return "preview"
    return default_mode


def load_json_file(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        return []
    try:
        payload = json.loads(text)
        if isinstance(payload, list):
            return payload
        if isinstance(payload, dict):
            return [payload]
    except json.JSONDecodeError:
        pass
    return [json.loads(line) for line in text.splitlines() if line.strip()]


def extract_file_message(payload: dict) -> FileMessage | None:
    event = payload.get("event") or {}
    message = event.get("message") or {}
    sender = event.get("sender") or {}

    if message.get("message_type") != "file":
        return None

    sender_type = sender.get("sender_type", "")
    if sender_type == "app":
        return None

    content_raw = message.get("content") or "{}"
    try:
        content = json.loads(content_raw)
    except json.JSONDecodeError:
        log(f"Skip message {message.get('message_id')}: file content is not valid JSON")
        return None

    file_key = content.get("file_key")
    if not isinstance(file_key, str) or not file_key:
        log(f"Skip message {message.get('message_id')}: missing file_key")
        return None

    file_name = content.get("file_name") or content.get("name") or f"{message.get('message_id', 'package')}.bin"
    sender_id = ((sender.get("sender_id") or {}).get("open_id")) or ""

    return FileMessage(
        message_id=message.get("message_id", ""),
        chat_id=message.get("chat_id", ""),
        sender_type=sender_type,
        sender_id=sender_id,
        file_key=file_key,
        file_name=file_name,
    )


def run_command(command: list[str], cwd: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        cwd=cwd,
        text=True,
        capture_output=True,
        check=False,
    )


def send_reply(message_id: str, text: str, reply_in_thread: bool) -> None:
    command = [
        "lark-cli",
        "im",
        "+messages-reply",
        "--as",
        "bot",
        "--message-id",
        message_id,
        "--text",
        text,
    ]
    if reply_in_thread:
        command.append("--reply-in-thread")

    result = run_command(command, Path.cwd())
    if result.returncode != 0:
        log(f"Reply failed for {message_id}: {result.stderr.strip()}")


def download_attachment(job_dir: Path, message: FileMessage) -> Path:
    downloads_dir = job_dir / "downloads"
    downloads_dir.mkdir(parents=True, exist_ok=True)

    safe_name = sanitize_filename(message.file_name)
    relative_output = Path("downloads") / safe_name

    command = [
        "lark-cli",
        "im",
        "+messages-resources-download",
        "--as",
        "bot",
        "--message-id",
        message.message_id,
        "--file-key",
        message.file_key,
        "--type",
        "file",
        "--output",
        str(relative_output),
    ]
    result = run_command(command, job_dir)
    if result.returncode != 0:
        fail(f"Download failed: {result.stderr.strip() or result.stdout.strip()}")

    return job_dir / relative_output


def run_publish_workflow(repo_root: Path, package_path: Path, mode: str) -> dict:
    script_path = Path(__file__).resolve().parent / "publish_product_site.py"
    command = [
        "python3",
        str(script_path),
        "--repo",
        str(repo_root),
        "--input",
        str(package_path),
        "--mode",
        mode,
        "--json",
    ]
    result = run_command(command, repo_root)
    if not result.stdout.strip():
        fail(f"Publisher returned no output: {result.stderr.strip()}")

    try:
        summary = json.loads(result.stdout)
    except json.JSONDecodeError as exc:
        fail(f"Publisher returned invalid JSON: {exc}: {result.stdout}")

    summary["_returncode"] = result.returncode
    summary["_stderr"] = result.stderr
    return summary


def build_success_text(file_name: str, mode: str, summary: dict, preview_base_url: str) -> str:
    lines = [
        f"已处理素材包：{file_name}",
        f"Slug: {summary.get('slug') or '-'}",
        f"模式: {'部署' if mode == 'deploy' else '预览'}",
    ]

    if mode == "preview" and summary.get("slug"):
        preview_url = f"{preview_base_url.rstrip('/')}/product/{summary['slug']}"
        lines.append(f"预览地址: {preview_url}")

    warnings = summary.get("warnings") or []
    if warnings:
        lines.append("警告:")
        lines.extend(f"- {warning}" for warning in warnings[:5])

    return "\n".join(lines)


def build_failure_text(file_name: str, mode: str, errors: list[str], warnings: list[str]) -> str:
    lines = [
        f"素材包处理失败：{file_name}",
        f"模式: {'部署' if mode == 'deploy' else '预览'}",
    ]
    if warnings:
        lines.append("警告:")
        lines.extend(f"- {warning}" for warning in warnings[:5])
    if errors:
        lines.append("错误:")
        lines.extend(f"- {error}" for error in errors[:5])
    return "\n".join(lines)


def should_process_message(message: FileMessage, args: argparse.Namespace) -> tuple[bool, str]:
    if args.allowed_chat_id and message.chat_id not in set(args.allowed_chat_id):
        return False, f"Skip {message.message_id}: chat {message.chat_id} is not allow-listed"

    if not re.match(args.filename_regex, message.file_name, re.IGNORECASE):
        return False, f"Skip {message.message_id}: filename {message.file_name!r} does not match {args.filename_regex!r}"

    return True, ""


def handle_file_message(
    message: FileMessage,
    args: argparse.Namespace,
    repo_root: Path,
    runtime_paths: dict[str, Path],
    state: dict,
) -> None:
    state_path = runtime_paths["state"]
    if message.message_id in state.get("processed", {}):
        log(f"Skip {message.message_id}: already processed")
        return

    allowed, reason = should_process_message(message, args)
    if not allowed:
        log(reason)
        mark_processed(
            state,
            state_path,
            message.message_id,
            {
                "status": "ignored",
                "reason": reason,
                "file_name": message.file_name,
            },
        )
        return

    mode = infer_mode(message.file_name, args.default_mode)
    job_dir = runtime_paths["jobs"] / message.message_id
    job_dir.mkdir(parents=True, exist_ok=True)
    (job_dir / "event.json").write_text(
        json.dumps(message.__dict__, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    if args.dry_run:
        plan = {
            "message_id": message.message_id,
            "file_name": message.file_name,
            "mode": mode,
            "repo": str(repo_root),
        }
        print(json.dumps(plan, ensure_ascii=False))
        return

    if not args.skip_reply:
        send_reply(
            message.message_id,
            f"已收到素材包 {message.file_name}，开始执行{'部署' if mode == 'deploy' else '预览'}流程。",
            args.reply_in_thread,
        )

    downloaded_file: Path | None = None
    summary: dict | None = None
    try:
        downloaded_file = download_attachment(job_dir, message)
        summary = run_publish_workflow(repo_root, downloaded_file, mode)
        (job_dir / "publisher-result.json").write_text(
            json.dumps(summary, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

        warnings = summary.get("warnings") or []
        errors = summary.get("errors") or []
        if summary.get("_returncode", 1) == 0 and not errors:
            reply_text = build_success_text(message.file_name, mode, summary, args.preview_base_url)
            status = "success"
        else:
            reply_text = build_failure_text(message.file_name, mode, errors, warnings)
            status = "failed"

        if not args.skip_reply:
            send_reply(message.message_id, reply_text, args.reply_in_thread)

        mark_processed(
            state,
            state_path,
            message.message_id,
            {
                "status": status,
                "mode": mode,
                "file_name": message.file_name,
                "slug": summary.get("slug"),
                "job_dir": str(job_dir),
            },
        )
    except Exception as exc:  # noqa: BLE001
        log(f"Message {message.message_id} failed: {exc}")
        if not args.skip_reply:
            send_reply(
                message.message_id,
                build_failure_text(message.file_name, mode, [str(exc)], []),
                args.reply_in_thread,
            )
        mark_processed(
            state,
            state_path,
            message.message_id,
            {
                "status": "failed",
                "mode": mode,
                "file_name": message.file_name,
                "error": str(exc),
                "job_dir": str(job_dir),
            },
        )


def iter_live_events() -> subprocess.Popen[str]:
    command = [
        "lark-cli",
        "event",
        "+subscribe",
        "--event-types",
        "im.message.receive_v1",
        "--quiet",
    ]
    return subprocess.Popen(
        command,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo).expanduser().resolve()
    if not repo_looks_valid(repo_root):
        fail(f"Invalid repo root: {repo_root}")

    if shutil.which("lark-cli") is None:
        fail("lark-cli is not installed or not on PATH")

    work_dir = Path(args.work_dir).expanduser().resolve() if args.work_dir else repo_root / ".lark-product-bot"
    runtime_paths = ensure_runtime_dirs(work_dir)
    state = load_state(runtime_paths["state"])

    try:
        if args.once_event_file:
            payloads = load_json_file(Path(args.once_event_file).expanduser().resolve())
            for payload in payloads:
                message = extract_file_message(payload)
                if message:
                    handle_file_message(message, args, repo_root, runtime_paths, state)
            return 0

        log("Starting Lark local bot loop")
        log(f"Repo root: {repo_root}")
        log(f"Runtime dir: {work_dir}")
        log(f"Default mode: {args.default_mode}")
        log(f"Filename regex: {args.filename_regex}")

        process = iter_live_events()
        assert process.stdout is not None

        for line in process.stdout:
            raw = line.strip()
            if not raw:
                continue
            try:
                payload = json.loads(raw)
            except json.JSONDecodeError:
                log(f"Skip non-JSON event line: {raw[:200]}")
                continue

            message = extract_file_message(payload)
            if not message:
                continue

            handle_file_message(message, args, repo_root, runtime_paths, state)

        return_code = process.wait()
        if return_code != 0 and process.stderr is not None:
            stderr_output = process.stderr.read().strip()
            if stderr_output:
                log(f"Lark event loop exited with errors: {stderr_output}")
        return return_code
    except KeyboardInterrupt:
        log("Shutting down local bot loop")
        return 0


if __name__ == "__main__":
    sys.exit(main())
