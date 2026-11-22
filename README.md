<p align="center">
  <a target="_blank" href="https://react-flatifycss.amimomo.me">
    <img src="https://raw.githubusercontent.com/ami-momo/react-flatifycss/master/website/public/react-flatifycss.gif" alt="React FlatifyCSS" width="160" height="160">
  </a>
</p>

<h3 align="center">React FlatifyCSS</h3>

<p align="center">
   A collection of React flat design components, based on FlatifyCSS.
</p>

<p align="center">
  <a target="_blank" href="https://react-flatifycss.amimomo.me/playground/?path=/docs/documents-getting-started--docs">Getting started</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a target="_blank" href="https://react-flatifycss.amimomo.me/playground/">Playground</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a target="_blank" href="https://github.com/ami-momo/react-flatifycss/issues">Issues</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a target="_blank" href="https://flatifycss.amimomo.me">FlatifyCSS</a>
</p>

<hr>

[![npm version](https://img.shields.io/npm/v/react-flatifycss)](https://www.npmjs.com/package/react-flatifycss)
[![License: MIT](https://img.shields.io/npm/l/react-flatifycss)](LICENSE)

# Getting started

Start using React FlatifyCSS after installing packages and importing the style file, here is how.

## Installing packages

To install and use the library you should install both the `flatifycss` and `react-flatifycss` packages. We use the base `flatifycss` package to import styles.

```bash
npm i flatifycss react-flatifycss
# or
yarn add flatifycss react-flatifycss
```

| Package | Version |
| --- | --- |
| `react`, `react-dom` | 16.8 to 18 |
| `flatifycss` | 2.x is recommended, 1.5 works too |

`styled-components` comes with React FlatifyCSS, you do not need to install it yourself. TypeScript types are included.

## Import styles

React FlatifyCSS itself does not include the FlatifyCSS styles, so you can import <a href="https://flatifycss.amimomo.me/docs/intro#css" target="_blank">your preferred stylesheet</a> in your application.

```js
import 'flatifycss/dist/css/flatify-min.css';
```

The same file works for right to left pages since FlatifyCSS 2, just set `dir="rtl"` on `<html>`. With FlatifyCSS 1.x, import `flatify-rtl-min.css` instead.

## Use components!

Now, just import the component you need from `react-flatifycss`, for example a simple button:

```js
import React from 'react';
import { Button } from 'react-flatifycss';

export default function App() {
  return <Button theme="green">Success!</Button>;
}
```

Using toasts? Add `<ToastsWrapper />` once near the root of your app.

Every component accepts a few [common props](https://react-flatifycss.amimomo.me/playground/?path=/docs/documents-common-props--docs): `theme`, `color`, `size`, `roundness`, `sx` for your own CSS, and `as` to change the HTML tag.

## Components

| Group | Components |
| --- | --- |
| Buttons | `Button`, `ButtonGroup`, `AddButton`, `ArrowButton`, `Hamburger`, `Badge` |
| Content | `Figure`, `Highlight`, `Quote`, `Separator` |
| Forms | `Input`, `Checkbox`, `Radio`, `Select`, `ToggleSwitch` |
| Components | `Accordion`, `Alert`, `Breadcrumbs`, `Dropdown`, `Element`, `Fireworks`, `ItemsGroup`, `Loading`, `Modal`, `Progress`, `Tabs`, `Toast` |

Try them all in the [playground](https://react-flatifycss.amimomo.me/playground/).

## Development

```bash
bun install
bun run storybook   # playground on localhost:6006
bun run test
bun run build       # the library, into /dist
bun run build:site  # the landing page and the playground, into /website/dist
```

The landing page lives in `/website` and the playground pages in `/stories`. Both are deployed together on Vercel, see `vercel.json`.

## Contributing

Found a bug or have an idea? [Open an issue](https://github.com/ami-momo/react-flatifycss/issues) first, then pull requests are welcome. Please add or update the story and its docs page when you change a component.

## License

[MIT](LICENSE)
