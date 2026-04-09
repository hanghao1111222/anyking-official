#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
SKILL_NAME="product-site-publisher"
SOURCE_DIR="${REPO_ROOT}/codex-skills/${SKILL_NAME}"
TARGET_ROOT="${CODEX_HOME:-$HOME/.codex}/skills"
TARGET_DIR="${TARGET_ROOT}/${SKILL_NAME}"

if [[ ! -d "${SOURCE_DIR}" ]]; then
  echo "Skill source not found: ${SOURCE_DIR}" >&2
  exit 1
fi

mkdir -p "${TARGET_ROOT}"
rm -rf "${TARGET_DIR}"
cp -R "${SOURCE_DIR}" "${TARGET_DIR}"

echo "Installed ${SKILL_NAME} to ${TARGET_DIR}"
