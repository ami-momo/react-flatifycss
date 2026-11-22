import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { generalClasses } from '../classes';
import { Button, ButtonProps } from '../button';

export interface DropdownButtonProps extends ButtonProps {
  /** Class names of the arrow. */
  arrowClassName?: string;
  /** `false` removes the button styles. */
  buttonStyle?: boolean;
  /** Content of the component. */
  children?: React.ReactNode;
  /** Shows an arrow next to the text. */
  hasArrow?: boolean;
  /** Internal, set by `<Dropdown />`. */
  innerRef?: React.Ref<HTMLButtonElement>;
  /** Internal, set by `<Dropdown />`. */
  isOpen?: boolean;
  /** Internal, set by `<Dropdown />`. */
  onBodyMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Internal, set by `<Dropdown />`. */
  onButtonMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Internal, used to find this component among children. Do not set it. */
  __TYPE?: 'DropdownButton';
}

const DropdownButtonWrapper = styled(Button)`
  ${({ sx }: DropdownButtonProps) => (sx ? sx : '')}
`;

export default function DropdownButton(props: DropdownButtonProps) {
  const {
    arrowClassName,
    buttonStyle,
    children,
    hasArrow,
    innerRef,
    isOpen,
    onBodyMouseEnter,
    onButtonMouseEnter,
    __TYPE,
    ...rest
  } = props;

  return (
    <DropdownButtonWrapper
      {...rest}
      ref={innerRef}
      aria-expanded={isOpen}
      onMouseEnter={onButtonMouseEnter}
      className={clsx(
        'dropdown-toggle',
        ...generalClasses(props),
        arrowClassName,
        {
          active: isOpen,
          'no-style': buttonStyle === false,
          'arrow-button ': hasArrow,
          'arrow-flip': isOpen && hasArrow,
        }
      )}
    >
      {children}
    </DropdownButtonWrapper>
  );
}

// <Dropdown /> uses this type name to find the button among its children.
DropdownButton.__TYPE = 'DropdownButton';
