#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

npm run build:lib
rm -rf dist-pack && mkdir -p dist-pack
npm pack ./dist/ng2-smart-table --pack-destination dist-pack
shopt -s nullglob
mapfile -t TGZ < <(ls -1 dist-pack/*.tgz 2>/dev/null || true)
if [[ ${#TGZ[@]} -eq 0 ]]; then
  echo "No tarball produced in dist-pack" >&2
  exit 1
fi
cp "${TGZ[0]}" dist-pack/lib.tgz

cd consumer-smoke
rm -rf node_modules package-lock.json
# Do not use npm ci: the lockfile would pin the sha512 integrity of lib.tgz
# and the packaged tarball contents, which change on every build.
npm install --no-audit --no-fund
npm run build
