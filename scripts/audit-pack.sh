#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

npm run pack:lib >/dev/null
TGZ="$(ls -1 dist-pack/*.tgz | head -1)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cd "$TMP"
npm init -y >/dev/null
npm install "$ROOT/$TGZ" --omit=dev --no-audit --no-fund
npm audit --omit=dev
