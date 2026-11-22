# AGENTS.md

React FlatifyCSS is a library of React components for [FlatifyCSS](https://flatifycss.amimomo.me), written in TypeScript with styled-components. It is a one person project by Amir M. Mohamadi, MIT licensed. The docs are a Storybook playground, deployed with a small landing page at https://react-flatifycss.amimomo.me.

## Commands

Package manager is Bun, two separate installs (root and `website/`). Run everything with `bun run <script>`.

```bash
bun install                  # root (this also runs `tsdx build` via "prepare", it takes a while)
bun install --cwd website    # landing page
bun run storybook            # playground on localhost:6006
bun run test                 # jest through tsdx
bun run lint src             # tsdx lint (eslint + prettier)
bun run typecheck         # tsc --noEmit
bun run build                # the library into dist/
bun run build:site           # landing page + storybook, into website/dist (what Vercel runs)
```

Before saying a change is done: tests, lint, typecheck and `bun run build:site` should all pass.

## Layout

- `src/<component>/` one folder per component, `index.tsx` exports it. Every component takes `FlatifyGeneralProps` from `src/interfaces.ts` (`as`, `className`, `color`, `roundness`, `size`, `sx`, `theme`).
- `src/classes.tsx` `generalClasses()` turns those common props into FlatifyCSS class names.
- `stories/<name>.stories.tsx` examples, `stories/<name>.mdx` the docs page for that component, `stories/documents/` guides.
- `.storybook/` Storybook 10 (Vite) config, `website/` the landing page (separate Vite app), `website/public/` has `robots.txt`, `llms.txt` and `sitemap.xml`.

## Rules that are easy to break

- **Build tooling is old and fragile.** The library builds with `tsdx` 0.14. Do not install or update packages without the lockfile (`bun update`, deleting `bun.lock`) because a fresh resolve breaks tsdx's Babel setup. If you must add a dependency, check `bun run build` and `bun run test` afterwards.
- Do not add a `picomatch` override, it breaks the build. The overrides in `package.json` (`lodash`, `@babel/runtime`, `@babel/traverse`) are there for security advisories.
- **Do not use `export type { ... }`** in `src`, tsdx cannot parse it. Re-export types with `export * from './file'`. A plain `export { SomeProps } from` works in the production build but breaks the Storybook dev server, do not use it either.
- Do not use `defaultProps` (removed in React 19). Parent components find specific children (`DropdownButton`, `DropdownBody`, `AlertIcon`) through a static `__TYPE` marker, see `src/utils/children.tsx`.
- Supported React is 16.8 to 18 (`peerDependencies`), because `@reach/*` 0.17 stops at 18. Do not claim React 19 support.
- Code that touches `document` during render (Toast, Modal) is not SSR safe, keep that noted in docs if you add similar code.
- `prepare` runs `tsdx build` on every install, so an install failing usually means the build failed, read the error above it.

## Adding or changing a component

1. Component in `src/<name>/` with a props interface that extends `FlatifyGeneralProps`.
2. **Every prop needs a JSDoc comment** (and `@default` where the code sets a default). Storybook builds the props tables from them.
3. Export it from `src/index.tsx`, and export its props type through `export *`.
4. Add `stories/<name>.stories.tsx`. Keep titles and export names stable, story ids are links (`components-accordion--default`).
5. Add `stories/<name>.mdx` with `<Meta of={...} />`, a `<Canvas of={...} />` per example and a `## Props` section with `<ArgTypes of={...} />` for the component and each sub component.
6. Add a smoke test `src/<name>/<name>.test.tsx` (Testing Library, see existing tests).
7. Add a line to `CHANGELOG.md` under `Unreleased`.

## Docs conventions (Storybook 10)

- MDX 3: `className`, not `class`. Markdown tables work through `remark-gfm` in `.storybook/main.ts`.
- Imports come from `@storybook/addon-docs/blocks`, `@storybook/react-vite` (types) and `storybook/manager-api`, `storybook/theming`.
- Intro paragraph is `<p className="component-doc-intro">` on **one line** (a line break inside inline JSX breaks the rendering).
- Do not reuse HTML ids or radio `name`s across stories, they all render on one docs page.
- Docs voice: friendly, plain, "you" for the reader and "I" for the author, no "we" or "our team". No em or en dashes, no marketing words. Do not invent facts or numbers. Fix errors instead of rewriting pages.

## Releases

Releasing is a human decision. Do not tag, publish or push. Version and tags are bumped by hand. `v2.1.2` is published on npm but was never tagged, tag it before releasing.
