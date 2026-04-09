# Codex Skills

This directory stores portable Codex skills that are versioned with the repository.

## Included

- `product-site-publisher`: validates a product materials package, runs preview or deployment, and can be used behind a local Feishu bot loop.

## Install On Another Computer

1. Clone this repository.
2. Run:

```bash
bash scripts/install-product-site-publisher-skill.sh
```

3. Restart Codex if it is already open.

The skill will be installed into `${CODEX_HOME:-$HOME/.codex}/skills/product-site-publisher`.
