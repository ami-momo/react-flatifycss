import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import getUniqueID from '../utils/id-generator';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface InputProps
  extends FlatifyGeneralProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'color' | 'onChange' | 'onBlur' | 'onFocus'
    > {
  /** Content of the component. */
  children?: React.ReactNode;
  /** Border color of the `valid` state. */
  colorValid?: string;
  /** Border color of the `warning` state. */
  colorWarning?: string;
  /** Border color of the `invalid` state. */
  colorInvalid?: string;
  /** Puts the label inside the input. */
  hasFloatingLabel?: boolean;
  /** Label text. */
  label?: string;
  /** Called with the value and the event. */
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  /** Called with the value and the event. */
  onBlur?: (value: string, event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called with the value and the event. */
  onFocus?: (value: string, event: React.FocusEvent<HTMLInputElement>) => void;
  /** Validation state. */
  state?: 'default' | 'valid' | 'warning' | 'invalid';
  /** Shows the state icon next to the input. */
  stateIcon?: boolean;
  /** Shows a button to show or hide the password. */
  togglePassword?: boolean;
  /** Accessible label of the password button. */
  togglePasswordLabel?: string;
  /** Class names of the wrapper, `className` goes to the input. */
  wrapperClassName?: string;
}

const InputWrapper = styled.div`
${({ colorValid }: InputProps) =>
  colorValid
    ? `--flatify__form-element-border-color__valid: ${colorValid};`
    : ''}
${({ colorWarning }: InputProps) =>
  colorWarning
    ? `--flatify__form-element-border-color__warning: ${colorWarning};`
    : ''}
${({ colorInvalid }: InputProps) =>
  colorInvalid
    ? `--flatify__form-element-border-color__invalid: ${colorInvalid};`
    : ''}  
${({ sx }: InputProps) => (sx ? sx : '')}
`;

export const Input = forwardRef(
  (props: InputProps, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    const {
      as,
      children,
      colorValid,
      colorWarning,
      colorInvalid,
      hasFloatingLabel,
      id,
      label,
      name,
      onChange,
      onBlur,
      onFocus,
      size,
      state,
      stateIcon,
      sx,
      togglePassword,
      togglePasswordLabel,
      type,
      value,
      defaultValue,
      wrapperClassName,
      ...rest
    } = props;

    const [InputValue, setInputValue] = useState<
      string | ReadonlyArray<string> | number | undefined
    >(defaultValue ?? '');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(true);

    const inputId: string = id || getUniqueID(String(name) + String(label));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);
      onChange?.(value, event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setIsFocused(false);
      onBlur?.(value, event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setIsFocused(true);
      onFocus?.(value, event);
    };

    let inputType: string = type || 'text';
    if (togglePassword) {
      inputType = isPassword ? 'password' : 'text';
    }

    return (
      <>
        {label && !hasFloatingLabel ? (
          <label
            htmlFor={inputId}
            className={clsx('form-label', ...generalClasses({ size }))}
          >
            {label}
          </label>
        ) : null}
        <InputWrapper
          as={as}
          sx={sx}
          colorValid={colorValid}
          colorWarning={colorWarning}
          colorInvalid={colorInvalid}
          className={clsx(
            'input-wrapper',
            wrapperClassName,
            {
              'floating-label': hasFloatingLabel,
              'toggle-password': togglePassword,
              'visible-password': !isPassword,
              [state + '']: state && stateIcon,
            },
            ...generalClasses({ size })
          )}
        >
          <input
            {...rest}
            ref={ref}
            className={clsx(
              'text-input',
              {
                'is-focused': isFocused,
                [state + '']: state && !stateIcon,
              },
              ...generalClasses(props)
            )}
            id={inputId}
            name={name}
            type={inputType}
            value={value === undefined ? InputValue : value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {label && hasFloatingLabel ? (
            <label htmlFor={inputId} className="form-label">
              {label}
            </label>
          ) : null}
          {togglePassword && (
            <button
              className="show-password-button"
              aria-label={togglePasswordLabel}
              onClick={() => setIsPassword(old => !old)}
              type="button"
            />
          )}
          {children}
        </InputWrapper>
      </>
    );
  }
);
