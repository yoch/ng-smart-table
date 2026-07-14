#!/usr/bin/env bash
# Angular 22 partial compilation emits ChangeDetectionStrategy.Eager in FESM metadata.
# Angular 18–20 only expose Default/OnPush — rewrite before pack/publish.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FESM_DIR="$ROOT/dist/ng2-smart-table/fesm2022"
shopt -s nullglob
files=("$FESM_DIR"/*.mjs)
if [[ ${#files[@]} -eq 0 ]]; then
  echo "No FESM bundles found in $FESM_DIR" >&2
  exit 1
fi
for f in "${files[@]}"; do
  sed -i 's/ChangeDetectionStrategy\.Eager/ChangeDetectionStrategy.Default/g' "$f"
done
echo "Patched change detection strategy aliases in ${#files[@]} bundle(s)."
