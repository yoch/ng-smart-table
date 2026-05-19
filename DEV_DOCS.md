# Release

0. For a major version, search for `@breaking-change` to document breaking changes.

# npm publishing (`@yoch/ng-smart-table`)

1. Create a `release/vX.Y.Z` branch if needed.
2. Run `npm run build:lib` to validate the library build.
3. Bump the version in [projects/ng2-smart-table/package.json](projects/ng2-smart-table/package.json) (the published package). The root `package.json` is private and only serves the workspace.
4. Run `npm run changelog` (requires a git tag for the previous version).
5. Commit with message style `release: vX.Y.Z`.
6. Beta publish: `npm run publish:beta` — publishes with dist-tag `next` only (`npm install @yoch/ng-smart-table@next`).
7. Stable publish: `npm run publish:dist` (requires `npm login` and an authenticated `@yoch` npm account; default tag `latest`).
8. Optional: `npm run docs:gh-pages` for the GitHub Pages demo.
9. Git tag `vX.Y.Z`, then `git push --tags`.

## Local checks

- `npm run build:ci` — lib + demo build and library unit tests.
- `npm run pack:lib` — tarball in `dist-pack/` (copy as `lib.tgz` for `consumer-smoke`).
- `npm run consumer:smoke` — installs the packaged tarball in the `consumer-smoke` mini-app and verifies a production build.
- `consumer-smoke` has no versioned `package-lock.json`: the `file:../dist-pack/lib.tgz` dependency changes integrity on every `npm pack`; CI uses `npm install`, not `npm ci`.
- `npm audit --omit=dev` — clean on the workspace (Angular and tooling are devDependencies only).
- `npm run audit:pack` — audits published runtime deps (`lodash-es`, `tslib`) by installing the packaged tarball.

Internal release notes (`RELEASE_CHECKLIST.md`, `EVOLUTION.md`) are gitignored locally; copy the checklist from [README.md](README.md#before-publishing-to-npm) before publishing.
