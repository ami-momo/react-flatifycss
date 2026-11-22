import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import getUniqueID from '../utils/id-generator';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface SelectOptionProps {
  /** Label text. */
  label?: string;
  /** Selected value, makes it controlled. */
  value?: string;
  /** Options, each one has `label` and `value`, or `options` for a group. */
  options?: SelectSubOptionProps[];
}

export interface SelectSubOptionProps {
  /** Label text. */
  label?: string;
  /** Selected value, makes it controlled. */
  value?: string;
}

export interface SelectProps
  extends FlatifyGeneralProps,
    Omit<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      'color' | 'onChange' | 'value' | 'size' | 'defaultValue'
    > {
  /** Initial value of an uncontrolled select. */
  defaultValue?: string | string[];
  /** Puts the label on the same line. */
  inlineLabel?: boolean;
  /** HTML id. */
  id?: string;
  /** Options, each one has `label` and `value`, or `options` for a group. */
  options: SelectOptionProps[];
  /** Label text. */
  label?: string;
  /** Lets users choose more than one option. */
  multiple?: boolean;
  /** Name of the input, radios in one group share the same name. */
  name?: string;
  /** Called with the value and the event. */
  onChange?: (
    value: string | string[],
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  /** Selected value, makes it controlled. */
  value?: string | string[];
}

const SelectWrapper = styled.select`
  ${({ sx }: SelectProps) => (sx ? sx : '')}
`;

function SelectOption({ value, label }: SelectOptionProps) {
  return <option value={value}>{label || value}</option>;
}

export const Select = forwardRef(
  (props: SelectProps, ref: React.LegacyRef<HTMLSelectElement> | undefined) => {
    const {
      defaultValue,
      id,
      inlineLabel,
      options,
      label,
      multiple,
      onChange,
      size,
      value,
      ...rest
    } = props;

    const [selected, setSelected] = useState<string | string[]>(
      multiple ? [] : ''
    );

    const selectId: string = id || getUniqueID(options.length + String(label));

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { selectedOptions, value } = event.target;

      const options = multiple
        ? Array.from(selectedOptions, option => option.value)
        : value;

      onChange?.(options, event);
      setSelected(options);
    };

    /*
     * set the value with this order priority:
     * #1 controlled select
     * #2 uncontrolled select (if has local value set already)
     * #3 default value
     */
    const selectValue = value || (selected.length && selected) || defaultValue;

    return (
      <>
        {label && (
          <label
            htmlFor={selectId}
            className={clsx(
              'form-label',
              inlineLabel && 'inline',
              ...generalClasses({ size })
            )}
          >
            {label}
          </label>
        )}
        <SelectWrapper
          {...rest}
          ref={ref}
          id={selectId}
          className={clsx(...generalClasses(props))}
          multiple={multiple}
          value={selectValue}
          onChange={handleChange}
        >
          {options.length > 0 &&
            options.map((option: SelectOptionProps, i) => {
              const { label: subLabel, options: subOptions } = option;
              if (subOptions && subOptions.length) {
                return (
                  <optgroup key={i + String(subLabel)} label={subLabel}>
                    {subOptions.map((subOption: SelectSubOptionProps) => (
                      <SelectOption key={subOption.value} {...subOption} />
                    ))}
                  </optgroup>
                );
              } else {
                return <SelectOption key={option.value} {...option} />;
              }
            })}
        </SelectWrapper>
      </>
    );
  }
);
