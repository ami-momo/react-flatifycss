import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface FireworksProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Delay before starting, in milliseconds. */
  delay?: number;
  /** Duration of one round, in milliseconds. */
  duration?: number;
  /** How many rounds to play, by default it never stops. */
  repeatCount?: number;
  /** A simpler version with fewer sparks. */
  simple?: boolean;
}

const FireworksWrapper = styled.div`
  ${({ delay }: FireworksProps) =>
    delay ? `--flatify__firework-animation-delay: ${delay}ms;` : ''}
  ${({ duration }: FireworksProps) =>
    duration ? `--flatify__firework-animation-duration: ${duration}ms;` : ''} 
  ${({ repeatCount }: FireworksProps) =>
    repeatCount
      ? `--flatify__firework-animation-iteration-count: ${repeatCount};`
      : ''}
  ${({ sx }: FireworksProps) => (sx ? sx : '')}
`;

export function Fireworks(props: FireworksProps) {
  const { simple, ...rest } = props;

  return (
    <FireworksWrapper
      {...rest}
      aria-hidden="true"
      className={clsx('fireworks', generalClasses(props), simple && 'simple')}
    >
      {[...new Array(5)].map((_, i) => (
        <span key={i} className="spark" />
      ))}
    </FireworksWrapper>
  );
}
