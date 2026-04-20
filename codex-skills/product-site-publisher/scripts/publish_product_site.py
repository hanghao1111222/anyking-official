#!/usr/bin/env python3
"""
Validate a product materials folder or zip package, then optionally invoke
the current repo's preview/deploy workflow.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
RECOMMENDED_FIELDS = ("price", "description", "features", "specs")


def fail(message: str) -> None:
    raise RuntimeError(message)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate and publish a product materials package."
    )
    parser.add_argument("--input", required=True, help="Path to materials folder or zip file.")
    parser.add_argument(
        "--mode",
        choices=("check", "preview", "deploy"),
        default="check",
        help="Workflow mode. 'check' validates only.",
    )
    parser.add_argument(
        "--repo",
        help="Repo root containing package.json and scripts/agent-deploy.js. Defaults to auto-detect from cwd.",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print machine-readable JSON summary.",
    )
    parser.add_argument(
        "--keep-temp",
        action="store_true",
        help="Keep extracted zip contents for inspection.",
    )
    return parser.parse_args()


def path_has_image_files(directory: Path) -> bool:
    return directory.exists() and any(
        child.is_file() and child.suffix.lower() in IMAGE_EXTENSIONS
        for child in directory.iterdir()
    )


def find_repo_root(explicit_repo: str | None) -> Path | None:
    if explicit_repo:
        candidate = Path(explicit_repo).expanduser().resolve()
        return candidate if repo_looks_valid(candidate) else None

    current = Path.cwd().resolve()
    for candidate in (current, *current.parents):
        if repo_looks_valid(candidate):
            return candidate

    return None


def repo_looks_valid(candidate: Path) -> bool:
    return (
        candidate.exists()
        and (candidate / "package.json").is_file()
        and (candidate / "scripts" / "agent-deploy.js").is_file()
    )


def extract_if_needed(input_path: Path, keep_temp: bool) -> tuple[Path, Path | None]:
    if input_path.is_dir():
        return input_path.resolve(), None

    if input_path.is_file() and input_path.suffix.lower() == ".zip":
        temp_dir = Path(tempfile.mkdtemp(prefix="product-site-publisher-"))
        with zipfile.ZipFile(input_path, "r") as archive:
            archive.extractall(temp_dir)
        if keep_temp:
            return temp_dir, temp_dir
        return temp_dir, temp_dir

    fail(f"Unsupported input: {input_path}. Expected a directory or .zip file.")


def locate_materials_root(base_path: Path) -> Path:
    if (base_path / "data.json").is_file():
        return base_path

    candidates = sorted(
        {
            path.parent.resolve()
            for path in base_path.rglob("data.json")
            if path.is_file() and ".git" not in path.parts
        }
    )

    if not candidates:
        fail(f"Could not find data.json under {base_path}")

    if len(candidates) > 1:
        preview = ", ".join(str(path) for path in candidates[:3])
        fail(f"Found multiple material roots. Please disambiguate: {preview}")

    return candidates[0]


def load_payload(materials_root: Path) -> dict:
    data_path = materials_root / "data.json"
    try:
        return json.loads(data_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(f"data.json is not valid JSON: {exc}")


def validate_payload(payload: dict, materials_root: Path) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    for field in ("slug", "name"):
        value = payload.get(field)
        if not isinstance(value, str) or not value.strip():
            errors.append(f"Missing required field: {field}")

    for field in RECOMMENDED_FIELDS:
        value = payload.get(field)
        if field in ("price", "description"):
            if not isinstance(value, str) or not value.strip():
                warnings.append(f"Recommended field is empty: {field}")
        elif field == "features":
            if not isinstance(value, list) or not any(
                isinstance(item, str) and item.strip() for item in value
            ):
                warnings.append("Recommended field is empty: features")
        elif field == "specs":
            if not isinstance(value, dict) or not value:
                warnings.append("Recommended field is empty: specs")

    has_thumbnail = any(
        child.is_file()
        and child.name.lower().startswith("thumbnail.")
        and child.suffix.lower() in IMAGE_EXTENSIONS
        for child in materials_root.iterdir()
    )
    has_gallery = path_has_image_files(materials_root / "gallery")
    has_aplus = path_has_image_files(materials_root / "aplus")

    if not has_thumbnail and not has_gallery:
        warnings.append(
            "No thumbnail.* or gallery images found. Repo workflow will fall back to /product-1.jpg."
        )

    if not has_aplus:
        warnings.append("No A+ images found under aplus/.")

    return errors, warnings


def build_command(mode: str, materials_root: Path) -> list[str]:
    if mode == "preview":
        return ["pnpm", "run", "agent-preview", "--", str(materials_root)]
    if mode == "deploy":
        return ["pnpm", "run", "agent-deploy", "--", str(materials_root)]
    return []


def run_workflow(repo_root: Path, command: list[str]) -> subprocess.CompletedProcess[str]:
    try:
        return subprocess.run(
            command,
            cwd=repo_root,
            text=True,
            capture_output=True,
            check=False,
        )
    except FileNotFoundError as exc:
        fail(f"Failed to start command {command[0]!r}: {exc}")


def emit_text(summary: dict) -> None:
    print(f"ok: {summary['ok']}")
    print(f"mode: {summary['mode']}")
    print(f"materials_root: {summary['materials_root']}")
    if summary.get("repo_root"):
        print(f"repo_root: {summary['repo_root']}")
    if summary.get("slug"):
        print(f"slug: {summary['slug']}")
    print(f"warnings: {len(summary['warnings'])}")
    for warning in summary["warnings"]:
        print(f"- {warning}")

    if summary.get("command"):
        print(f"command: {' '.join(summary['command'])}")
    if summary.get("preview_path"):
        print(f"preview_path: {summary['preview_path']}")
    if summary.get("stdout"):
        print("stdout:")
        print(summary["stdout"].rstrip())
    if summary.get("stderr"):
        print("stderr:")
        print(summary["stderr"].rstrip())


def main() -> int:
    args = parse_args()
    input_path = Path(args.input).expanduser().resolve()
    cleanup_path: Path | None = None

    try:
        unpacked_root, cleanup_path = extract_if_needed(input_path, args.keep_temp)
        materials_root = locate_materials_root(unpacked_root)
        payload = load_payload(materials_root)
        errors, warnings = validate_payload(payload, materials_root)

        summary = {
            "ok": not errors,
            "mode": args.mode,
            "materials_root": str(materials_root),
            "repo_root": None,
            "slug": payload.get("slug"),
            "warnings": warnings,
            "errors": errors,
            "command": [],
            "preview_path": None,
            "stdout": "",
            "stderr": "",
        }

        if errors:
            if args.json:
                print(json.dumps(summary, ensure_ascii=False, indent=2))
            else:
                emit_text(summary)
                print("errors:")
                for error in errors:
                    print(f"- {error}")
            return 1

        if args.mode in {"preview", "deploy"}:
            repo_root = find_repo_root(args.repo)
            if not repo_root:
                fail("Could not locate repo root. Pass --repo pointing to the project root.")

            command = build_command(args.mode, materials_root)
            result = run_workflow(repo_root, command)
            summary["repo_root"] = str(repo_root)
            summary["command"] = command
            summary["stdout"] = result.stdout
            summary["stderr"] = result.stderr
            summary["ok"] = result.returncode == 0
            summary["preview_path"] = f"/product/{payload.get('slug', '')}"

            if result.returncode != 0:
                summary["errors"].append(
                    f"Workflow command exited with status {result.returncode}"
                )

        if args.json:
            print(json.dumps(summary, ensure_ascii=False, indent=2))
        else:
            emit_text(summary)
            if summary["errors"]:
                print("errors:")
                for error in summary["errors"]:
                    print(f"- {error}")

        return 0 if summary["ok"] else 1
    except Exception as exc:  # noqa: BLE001
        summary = {
            "ok": False,
            "mode": args.mode,
            "materials_root": "",
            "repo_root": args.repo or "",
            "slug": None,
            "warnings": [],
            "errors": [str(exc)],
            "command": [],
            "preview_path": None,
            "stdout": "",
            "stderr": "",
        }
        if args.json:
            print(json.dumps(summary, ensure_ascii=False, indent=2))
        else:
            print(f"ok: False\nmode: {args.mode}\nerror: {exc}")
        return 1
    finally:
        if cleanup_path and cleanup_path.exists() and not args.keep_temp:
            shutil.rmtree(cleanup_path, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
