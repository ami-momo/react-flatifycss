import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface BadgeProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Content of the component. */
  children?: React.ReactNode;
  /** Adds a pulse animation to get attention. */
  pulse?: boolean;
  /** Badge text, you can use `children` instead. */
  text?: string;
}

const BadgeWrapper = styled.span`
  ${({ sx }: BadgeProps) => (sx ? sx : '')}
`;

export function Badge(props: BadgeProps) {
  const { children, pulse, text, ...rest } = props;

  return (
    <BadgeWrapper
      {...rest}
      className={clsx(
        'badge',
        {
          pulse: pulse,
        },
        ...generalClasses(props)
      )}
    >
      {children}
      {text}
    </BadgeWrapper>
  );
}
