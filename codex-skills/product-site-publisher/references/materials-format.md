# Materials Format

## Folder Contract

Use one product per package.

```text
product-package/
├── data.json
├── thumbnail.jpg            # optional but recommended
├── gallery/                 # optional but recommended
│   ├── 01.jpg
│   └── 02.jpg
└── aplus/                   # optional
    ├── 01.jpg
    └── 02.jpg
```

The skill also accepts a `.zip` file containing that structure.

## `data.json`

Hard requirements:

- `slug`
- `name`

Strongly recommended because the site UI expects them:

- `price`
- `description`
- `features` as a string array
- `specs` as an object

Useful common fields in the current repo:

- `subtitle`
- `originalPrice`
- `discount`
- `highlightMessage`
- `best`
- `amazonUrl`
- `rating`
- `reviews`
- `soldBadge`
- `viewingNow`

## Image Rules

- Put `thumbnail.*` in the package root if you want an explicit cover image.
- Put product gallery images under `gallery/`.
- Put A+ detail images under `aplus/`.
- Preserve filenames; the repo workflow copies them into `public/products/<slug>/...`.
- If both thumbnail and gallery are missing, the current repo falls back to `/product-1.jpg`.

## Notes for Feishu

- If the upload arrives as a zip, do not manually unpack it unless needed; the script already handles zip extraction.
- If the zip contains a single wrapper folder, that is fine. The script searches for the folder containing `data.json`.
