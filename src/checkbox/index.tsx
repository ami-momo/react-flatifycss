import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface CheckboxProps
  extends FlatifyGeneralProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'color' | 'onChange' | 'size'
    > {
  /** Checked state, makes it controlled. Use `defaultChecked` for an uncontrolled one. */
  checked?: boolean;
  /** Content of the component. */
  children?: React.ReactNode;
  /** Border color of the `valid` state. */
  colorValid?: string;
  /** Border color of the `warning` state. */
  colorWarning?: string;
  /** Border color of the `invalid` state. */
  colorInvalid?: string;
  /** Disables the element. */
  disabled?: boolean;
  /** Label text, you can use `children` instead. */
  label?: string;
  /** Called with the event and the new checked state. */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  /** Validation state. */
  state?: 'valid' | 'warning' | 'invalid';
}

const CheckboxWrapper = styled.label`
  ${({ colorValid }: CheckboxProps) =>
    colorValid
      ? `--flatify__form-element-border-color__valid: ${colorValid};`
      : ''}
  ${({ colorWarning }: CheckboxProps) =>
    colorWarning
      ? `--flatify__form-element-border-color__warning: ${colorWarning};`
      : ''}
  ${({ colorInvalid }: CheckboxProps) =>
    colorInvalid
      ? `--flatify__form-element-border-color__invalid: ${colorInvalid};`
      : ''}  
  ${({ sx }: CheckboxProps) => (sx ? sx : '')}
`;

export const Checkbox = forwardRef(
  (
    props: CheckboxProps,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    const {
      as,
      checked,
      children,
      colorValid,
      colorWarning,
      colorInvalid,
      id,
      onChange,
      label,
      size,
      state,
      sx,
      ...rest
    } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // if checked is passed toggle its bool, otherwise send event value
      const isChecked =
        typeof checked != 'undefined' ? !checked : e.target.checked;
      onChange?.(e, isChecked);
    };

    return (
      <CheckboxWrapper
        as={as}
        id={id}
        sx={sx}
        colorValid={colorValid}
        colorWarning={colorWarning}
        colorInvalid={colorInvalid}
        className={clsx(
          'checkbox-wrapper',
          { [state + '']: state },
          ...generalClasses(props)
        )}
      >
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleOnChange}
        />
        <span aria-hidden={true} className="check" />
        {children}
        {label}
      </CheckboxWrapper>
    );
  }
);
