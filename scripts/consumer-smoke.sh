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
# Ne pas utiliser npm ci : le lockfile figerait l'intégrité sha512 de lib.tgz
# et le contenu du paquet packagé, qui changent à chaque build.
npm install --no-audit --no-fund
npm run build
