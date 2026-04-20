---
name: product-site-publisher
description: Create, validate, preview, and deploy a product website from a local materials folder or zip package by checking `data.json`, product images, and invoking an existing repo workflow such as `pnpm run agent-preview` or `pnpm run agent-deploy`. Use when Codex receives product assets from Feishu, a downloaded attachment, or any folder containing product metadata plus `thumbnail.*`, `gallery/`, and `aplus/`, and needs to turn that package into a live product page automatically.
---

# Product Site Publisher

## Overview

Use this skill to turn a product materials package into a product site entry inside the current Next.js catalog repo. Prefer the bundled script for repeatable execution and only fall back to manual shell steps when the repo uses a different command surface.

## Quick Start

1. Confirm the repo root. In this project, expect `package.json` plus `scripts/agent-deploy.js`.
2. Confirm the input is a folder or `.zip` containing `data.json`. Read [references/materials-format.md](references/materials-format.md) only if the structure is unclear.
3. Run `scripts/publish_product_site.py --repo <repo-root> --input <materials-or-zip> --mode check`.
4. If validation passes, run preview first unless the user explicitly asked to deploy: `scripts/publish_product_site.py --repo <repo-root> --input <materials-or-zip> --mode preview`.
5. Deploy only after user approval, or when the automation is intended to publish immediately: `scripts/publish_product_site.py --repo <repo-root> --input <materials-or-zip> --mode deploy`.
6. Report the detected slug, warnings, and resulting preview or deploy status.

## Workflow

### 1. Normalize the input package

- Accept a local directory or a `.zip`.
- If the archive extracts into a single wrapper folder, operate on the inner folder that actually contains `data.json`.
- Require `data.json`.
- Treat `thumbnail.*`, `gallery/*`, and `aplus/*` as optional but recommended.
- Preserve filenames; the repo workflow already maps them into `public/products/<slug>/...`.

### 2. Validate before touching the repo

- Read `data.json` and ensure it is valid JSON.
- Hard fail if `slug` or `name` is missing.
- Warn if `price`, `description`, `features`, or `specs` are missing or empty because the site UI expects them.
- Warn if no thumbnail or gallery image is present; the current repo falls back to `/product-1.jpg`.
- In automation contexts, stop on hard failures and surface warnings back to the caller instead of guessing.

### 3. Invoke the repo workflow

- Use `scripts/publish_product_site.py` instead of rewriting shell logic.
- `check` mode validates only and never writes to the repo.
- `preview` mode runs `pnpm run agent-preview -- <materials-dir>` from the repo root.
- `deploy` mode runs `pnpm run agent-deploy -- <materials-dir>` from the repo root.
- Treat the repo root as valid only when `package.json` and `scripts/agent-deploy.js` exist.
- Do not swap package managers; this repo is `pnpm`-only.

### 4. Summarize the outcome

- Always report `repo_root`, `materials_root`, `slug`, warnings, and whether preview or deployment was executed.
- For preview mode in this repo, the resulting path is usually `/product/<slug>` on the local dev server.
- For deploy mode in this repo, mention that the current workflow commits and pushes to the configured production branch (`DEPLOY_GIT_BRANCH`) or the git default branch when unset.

## Feishu Handoff

When the request comes from Feishu or another bot channel, first download the attachment to local disk, then run this skill on the downloaded folder or zip. Read [references/feishu-handoff.md](references/feishu-handoff.md) when designing the bot-to-skill bridge.

## Local Bot Loop

Use `scripts/lark_local_bot.py` when you want the fastest local closed loop on one machine:

1. Configure the Feishu bot and event subscription for `im.message.receive_v1`.
2. Start the local listener with the repo root and default mode.
3. Send a `.zip` product package to the bot in Feishu.
4. The listener downloads the zip, invokes `publish_product_site.py`, and replies with the result.

For this first version, prefer a single `.zip` upload containing the whole materials package. Read [references/local-bot-loop.md](references/local-bot-loop.md) for setup and naming rules.

## Resources

- `scripts/publish_product_site.py`: validate a folder or zip, then optionally invoke the repo preview/deploy command.
- `scripts/lark_local_bot.py`: subscribe to Feishu IM events, download uploaded zip packages, and invoke the product publishing workflow.
- `references/materials-format.md`: expected folder contract and `data.json` guidance.
- `references/feishu-handoff.md`: recommended automation architecture for Feishu bot ingestion.
- `references/local-bot-loop.md`: concrete local listener setup for one-machine Feishu bot automation.
- `assets/data-template.json`: starting template for a new product payload.
