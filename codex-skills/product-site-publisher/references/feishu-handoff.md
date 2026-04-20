# Feishu Handoff

## Goal

Use Feishu as the ingestion layer and this skill as the execution layer.

Recommended flow:

1. A Feishu bot receives a product materials package.
2. An automation worker downloads the attachment to local disk.
3. The worker invokes Codex with `$product-site-publisher`.
4. The skill validates the package in `check` mode.
5. The skill runs `preview` first, unless the message explicitly authorizes deployment.
6. The worker sends a result summary back to Feishu with slug, warnings, and preview or deploy status.

## Recommended Prompt Contract

For preview-first automation:

```text
Use $product-site-publisher to validate and preview the uploaded product materials at <local-path>. Only deploy if the message contains [DEPLOY]. Return the slug, warnings, and resulting preview path.
```

For immediate deployment:

```text
Use $product-site-publisher to validate and deploy the uploaded product materials at <local-path>. If validation fails, stop and report the errors instead of guessing.
```

## Operational Advice

- Prefer a two-stage flow: `check` or `preview` first, then deploy after approval.
- The current repo workflow pushes to the configured production branch, so direct deployment should be treated as production-affecting.
- Keep the downloaded materials path stable until Codex finishes, especially when the package is large.
- If Feishu delivers multiple files instead of one folder, assemble them into one local package before invoking the skill.
- Return warnings to Feishu instead of silently suppressing them. Missing gallery or A+ assets should be visible to the operator.
