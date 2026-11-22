import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';
import { CSSTransition } from 'react-transition-group';

export interface DropdownBodyProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Internal, set by `<Dropdown />`. */
  arrowInnerRef?: React.Ref<HTMLElement>;
  /** Internal, set by `<Dropdown />`. */
  arrowStyles?: React.CSSProperties;
  /** Internal, set by `<Dropdown />`. */
  buttonId?: string;
  /** Content of the component. */
  children?: React.ReactNode;
  /** Internal, set by `<Dropdown />`. */
  innerRef?: React.Ref<HTMLElement>;
  /** Internal, set by `<Dropdown />`. */
  isOpen?: boolean;
  /** Makes it a menu, put `<li className="menu-item">` items inside. */
  isMenu?: boolean;
  /** Internal, set by `<Dropdown />`. */
  onBodyMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Internal, set by `<Dropdown />`. */
  onButtonMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Internal, used to find this component among children. Do not set it. */
  __TYPE?: 'DropdownBody';
}

const DropdownBodyWrapper = styled.div`
  ${({ sx }: DropdownBodyProps) => (sx ? sx : '')}
`;

export default function DropdownBody(props: DropdownBodyProps) {
  const {
    as,
    arrowInnerRef,
    arrowStyles,
    buttonId,
    children,
    innerRef,
    isOpen,
    isMenu,
    onBodyMouseEnter,
    onButtonMouseEnter,
    __TYPE,
    ...rest
  } = props;

  const DropdownArrow: React.ElementType = isMenu ? 'li' : 'div';

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enterDone: 'show',
        exitActive: 'show dropdown-will-be-hidden',
      }}
    >
      <DropdownBodyWrapper
        {...rest}
        as={as || (isMenu ? 'ul' : 'div')}
        ref={innerRef}
        aria-labelledby={buttonId}
        onMouseEnter={onBodyMouseEnter}
        className={clsx(
          'dropdown',
          isMenu && 'menu-items-wrapper',
          ...generalClasses(props)
        )}
      >
        {children}
        <DropdownArrow aria-hidden={false}>
          <span
            ref={arrowInnerRef}
            style={arrowStyles}
            className="pointer-arrow"
          />
        </DropdownArrow>
      </DropdownBodyWrapper>
    </CSSTransition>
  );
}

// <Dropdown /> uses this type name to find the body among its children.
DropdownBody.__TYPE = 'DropdownBody';
