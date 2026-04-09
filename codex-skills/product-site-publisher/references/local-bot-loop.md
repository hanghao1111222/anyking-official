# Local Bot Loop

## Purpose

Use this setup when you want the fastest one-machine workflow:

1. A Feishu bot receives a product package.
2. This machine listens for new IM messages.
3. The machine downloads the uploaded zip.
4. The local worker runs the product-site-publisher flow against the target repo.
5. The bot replies with success, warnings, and the preview path.

## V1 Input Contract

For the first local closed-loop version, send exactly one `.zip` file to the bot.

The zip should contain:

```text
product-package.zip
└── <any-folder-or-root>/
    ├── data.json
    ├── thumbnail.jpg
    ├── gallery/
    └── aplus/
```

Recommended naming rules:

- Default behavior is preview mode.
- Include `[deploy]` or `.deploy.` in the zip file name if you want the worker to deploy immediately.
- Include `[preview]` or `.preview.` in the zip file name if you want to force preview mode.

Examples:

- `monitor-launch.preview.zip`
- `monitor-launch.[deploy].zip`
- `monitor-launch.deploy.package.zip`

## Feishu Platform Setup

In the Feishu Open Platform console:

1. Set the bot to use long connection for events.
2. Subscribe to `im.message.receive_v1`.
3. Enable the required scopes:
   - `im:message:receive_as_bot`
   - `im:message:readonly`
   - `im:message:send_as_bot`
4. Make sure the bot has been added to the target chat.

On this machine, make sure `lark-cli config init` has already been completed for the app.

## Start Command

From the repo root, the local launcher added by this task is:

```bash
pnpm run agent-lark-bot
```

Useful optional flags:

```bash
pnpm run agent-lark-bot -- --default-mode deploy
pnpm run agent-lark-bot -- --allowed-chat-id oc_xxx
pnpm run agent-lark-bot -- --preview-base-url http://localhost:3000
pnpm run agent-lark-bot -- --skip-reply
```

## Runtime Files

The worker stores runtime files under:

```text
<repo>/.lark-product-bot/
├── state.json
└── jobs/
    └── <message-id>/
        ├── event.json
        ├── downloads/
        └── publisher-result.json
```

This directory is runtime-only and should stay out of git.

## Local Testing

You can test the routing logic with a saved event file before connecting to Feishu:

```bash
python3 ~/.codex/skills/product-site-publisher/scripts/lark_local_bot.py \
  --repo /path/to/repo \
  --once-event-file /path/to/event.json \
  --dry-run
```

## Limitations

- V1 assumes the whole product package arrives as one zip file.
- V1 does not try to assemble multiple separate file messages into one package.
- Preview mode assumes the local product site is already running if you want the URL to open immediately.
