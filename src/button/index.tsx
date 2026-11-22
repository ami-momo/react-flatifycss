import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { Loading } from '../loading';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface ButtonProps
  extends FlatifyGeneralProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Adds borders. */
  bordered?: boolean;
  /** `false` removes the button styles, adds `.no-style`. */
  buttonStyle?: boolean;
  /** Content of the component. */
  children?: React.ReactNode;
  /** Disables the element. */
  disabled?: boolean;
  /** Link address, use it with `as="a"`. */
  href?: string;
  /** Covers the text with a loading animation. */
  loading?: boolean;
  /** Uses a spinner instead of dots when `loading` is set. */
  spinnerLoading?: boolean;
  /** Click handler. */
  onClick?: () => void;
  /** Only borders, no background. */
  outline?: boolean;
  /** Text or icon shown on hover and focus, makes a two layer button. */
  secondaryText?: React.ReactNode | string;
  /** Keeps the button in one state: `active`, `static` or `disabled`. */
  state?: 'active' | 'static' | 'disabled';
  /** Button text, you can use `children` instead. */
  text?: string;
  /** Importance of the button. */
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const ButtonWrapper = styled.button`
  ${({ sx }: ButtonProps) => (sx ? sx : '')}
`;

export const Button = React.forwardRef(
  (props: ButtonProps, ref: React.LegacyRef<HTMLButtonElement> | undefined) => {
    const {
      bordered,
      buttonStyle,
      children,
      disabled,
      loading,
      outline,
      secondaryText,
      spinnerLoading,
      state,
      text,
      variant,
      ...rest
    } = props;

    return (
      <ButtonWrapper
        {...rest}
        ref={ref}
        disabled={disabled || state === 'disabled'}
        className={clsx(
          {
            button: variant !== 'tertiary',
            bordered: bordered,
            outline: outline,
            active: state === 'active',
            disabled: state === 'disabled',
            static: state === 'static',
            'no-style': buttonStyle === false,
            'style-accent': variant === 'primary',
            'style-light': variant === 'secondary',
            'link-button': variant === 'tertiary',
            'two-layer-button': secondaryText,
            'overlay-layer': loading,
          },
          ...generalClasses(props)
        )}
      >
        {text}
        {children}
        {secondaryText && (
          <span className="secondary-text">{secondaryText}</span>
        )}
        {loading && <Loading spinner={spinnerLoading} />}
      </ButtonWrapper>
    );
  }
);
