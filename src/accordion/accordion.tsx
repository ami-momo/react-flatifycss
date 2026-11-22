import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { Accordion as ReachAccordion } from '@reach/accordion';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface AccordionProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color' | 'onChange'> {
  /** `default`, `fade` or your own CSS animation like `0.5s ease flatify-slide-down-in`. */
  animation?: 'fade' | 'default' | string;
  /** Adds borders. */
  bordered?: boolean;
  /** Content of the component. */
  children: React.ReactNode;
  /** Lets the open item be closed again. */
  collapsible?: boolean;
  /** Index of the item open on first render, starts from 0. */
  defaultIndex?: number;
  /** Index of the open item, use it with `onChange` to control the component. */
  index?: number;
  onChange?(index?: number): void;
  /** Items do not open or close on click. */
  readOnly?: boolean;
  /** More than one item can be open, use it with `collapsible`. */
  multiple?: boolean;
}

const AccordionWrapper = styled(ReachAccordion)`
  ${({ sx }: AccordionProps) => (sx ? sx : '')}
  ${({ animation }: AccordionProps) =>
    animation ? `--flatify__accordion-animation-show: ${animation};` : ''}
`;

export default function Accordion(props: AccordionProps) {
  const { animation, bordered, children, ...rest } = props;
  return (
    <AccordionWrapper
      {...rest}
      animation={animation}
      className={clsx('accordion', ...generalClasses(props), {
        'fade-animation': animation === 'fade',
        bordered: bordered,
      })}
    >
      {children}
    </AccordionWrapper>
  );
}
