import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface AlertIconProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** The icon, usually an SVG. */
  children: React.ReactNode;
  /** Internal, used to find this component among children. Do not set it. */
  __TYPE?: 'AlertIcon';
}

const AlertIconWrapper = styled.div`
  ${({ sx }: AlertIconProps) => (sx ? sx : '')}
`;

export default function AlertIcon(props: AlertIconProps) {
  const { children, __TYPE, ...rest } = props;

  return (
    <AlertIconWrapper
      {...rest}
      className={clsx('alert-svg', ...generalClasses(props))}
    >
      {children}
    </AlertIconWrapper>
  );
}

// <Alert /> uses this type name to detect if it has an icon to add the specific className.
AlertIcon.__TYPE = 'AlertIcon';
