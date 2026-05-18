#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! npm whoami >/dev/null 2>&1; then
  echo "npm login required" >&2
  echo "Or set NPM_TOKEN (publish with //registry.npmjs.org/:_authToken=...)" >&2
  exit 1
fi

npm run build:lib
npm publish --access=public --tag next ./dist/ng2-smart-table
echo "Published @yoch/ng-smart-table@$(node -p "require('./dist/ng2-smart-table/package.json').version") (dist-tag next)"
