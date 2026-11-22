# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project follows [Semantic Versioning](https://semver.org/).

## [2.2.0] - 2026-11-22

A minor release because props types are now exported. Everything else is a fix.

### Added

- Props types are exported, like `ButtonProps`, `ModalProps` or `DropdownProps`, together with `Colors`, `Sizes` and `FlatifyGeneralProps`.
- Every prop has a description, so your editor shows what it does.

### Fixed

- `Dropdown` and `Alert` found their `DropdownButton`, `DropdownBody` and `AlertIcon` children through `defaultProps`, which React 19 removed and React 18.3 warns about. They use a static marker now.
- `Input` ignored `defaultValue`.
- `Figure` added a `style-undefined` class when `creditTheme` was not set.
- `Fireworks` gave every spark the same `NaN` key.
- `Dropdown` added `className` twice.
- `Breadcrumbs` and `Select` rendered a stray `0` with an empty list.
- `Select` props now include the native select attributes, like `disabled` and `required`.
- `peerDependencies` were missing since 2.1.2, `react` and `react-dom` 16.8 to 18 are back.

### Changed

- Documentation moved to [react-flatifycss.amimomo.me](https://react-flatifycss.amimomo.me), the repository to [ami-momo/react-flatifycss](https://github.com/ami-momo/react-flatifycss).
- The playground runs on Storybook 10, every component has a docs page with a props table.
- Tests are no longer included in the npm package.
- Development moved from Yarn to Bun. A few transitive dependencies are pinned with `overrides` to fix advisories, only `picomatch` (a build-time glob matcher used by `babel-plugin-styled-components`) is left, upgrading it breaks the tsdx build.

## [2.1.2] - 2024-08-01

- Removed `peerDependencies`.

[Unreleased]: https://github.com/ami-momo/react-flatifycss/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/ami-momo/react-flatifycss/compare/v2.1.2...v2.2.0
[2.1.2]: https://github.com/ami-momo/react-flatifycss/releases/tag/v2.1.2
