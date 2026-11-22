import { ElementType } from 'react';

export type Colors =
  | 'default'
  | 'blue'
  | 'blue-light'
  | 'green'
  | 'green-light'
  | 'yellow'
  | 'yellow-light'
  | 'orange'
  | 'orange-light'
  | 'red'
  | 'red-light'
  | 'pink'
  | 'pink-light'
  | 'purple'
  | 'purple-light'
  | 'accent'
  | 'accent-light'
  | 'success'
  | 'success-light'
  | 'info'
  | 'info-light'
  | 'warning'
  | 'warning-light'
  | 'danger'
  | 'danger-light'
  | 'light'
  | 'light-light'
  | 'dark'
  | 'dark-light';

type Roundness =
  | 'default'
  | 'sharp'
  | 'round-sm'
  | 'round-md'
  | 'round-lg'
  | 'circle'
  | 'oval'
  | 'triangle';

export type Sizes =
  | 'default'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | '2x'
  | '3x'
  | '4x'
  | '5x';

export interface FlatifyGeneralProps {
  /** Changes the rendered HTML tag or component, like `as="a"`. */
  as?: ElementType;
  /** Extra class names. */
  className?: string;
  /** Text color, adds a `.color-{color}` class. */
  color?: Colors;
  /** Test id for your tests. */
  'data-testid'?: string;
  /** HTML id. */
  id?: string;
  /** Border radius, adds an `.edge-{roundness}` class. */
  roundness?: Roundness;
  /** Size of the component, adds a `.size-{size}` class. */
  size?: Sizes;
  /** Your own CSS, passed to styled-components. */
  sx?: string;
  /** Background, text and border colors, adds a `.style-{theme}` class. */
  theme?: Colors;
}
