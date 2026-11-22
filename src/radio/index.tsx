import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface RadioProps
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
  /** Label text, you can use `children` instead. */
  label?: string;
  /** Name of the input, radios in one group share the same name. */
  name?: string;
  /** Called with the event, the checked state and the radio value. */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    value: string | number | undefined | null
  ) => void;
  /** Validation state. */
  state?: 'valid' | 'warning' | 'invalid';
  /** Value of the input. */
  value?: string | number;
}

const RadioWrapper = styled.label`
  ${({ colorValid }: RadioProps) =>
    colorValid
      ? `--flatify__form-element-border-color__valid: ${colorValid};`
      : ''}
  ${({ colorWarning }: RadioProps) =>
    colorWarning
      ? `--flatify__form-element-border-color__warning: ${colorWarning};`
      : ''}
  ${({ colorInvalid }: RadioProps) =>
    colorInvalid
      ? `--flatify__form-element-border-color__invalid: ${colorInvalid};`
      : ''}  
  ${({ sx }: RadioProps) => (sx ? sx : '')}
`;

export const Radio = forwardRef(
  (props: RadioProps, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    const {
      as,
      checked,
      children,
      colorValid,
      colorWarning,
      colorInvalid,
      id,
      label,
      onChange,
      size,
      state,
      sx,
      value,
      ...rest
    } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // if checked is passed toggle its bool, otherwise send event value
      const isChecked =
        typeof checked != 'undefined' ? !checked : e.target.checked;
      onChange?.(e, isChecked, value);
    };

    return (
      <RadioWrapper
        as={as}
        id={id}
        sx={sx}
        colorValid={colorValid}
        colorWarning={colorWarning}
        colorInvalid={colorInvalid}
        className={clsx(
          'radio-wrapper',
          { [state + '']: state },
          ...generalClasses(props)
        )}
      >
        <input
          {...rest}
          ref={ref}
          type="radio"
          checked={checked}
          value={value}
          onChange={handleOnChange}
        />
        <span aria-hidden={true} className="check" />
        {children}
        {label}
      </RadioWrapper>
    );
  }
);
