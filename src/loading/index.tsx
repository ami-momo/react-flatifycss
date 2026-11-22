import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface LoadingProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Width of each dot, like `0.5em`. */
  dotWidth?: string;
  /** Height of each dot. */
  dotHeight?: string;
  /** Scale the dots start from. */
  dotStartScale?: number;
  /** Duration of one round, in milliseconds. */
  duration?: number;
  /** Shows a spinner instead of dots. */
  spinner?: boolean;
  /** Pauses the animation. */
  stopped?: boolean;
}

const LoadingWrapper = styled.span`
  ${({ dotWidth }: LoadingProps) =>
    dotWidth ? `--flatify__loading-dot-width: ${dotWidth};` : ''}
  ${({ dotHeight }: LoadingProps) =>
    dotHeight ? `--flatify__loading-dot-height: ${dotHeight};` : ''} 
  ${({ dotStartScale }: LoadingProps) =>
    dotStartScale
      ? `--flatify__loading-dot-animation-start-scale: ${dotStartScale};`
      : ''}
  ${({ duration }: LoadingProps) =>
    duration
      ? `--flatify__loading-dot-animation-duration: ${duration}ms; --flatify__loading-spinner-animation-duration: ${duration}ms;`
      : ''}
  ${({ sx }: LoadingProps) => (sx ? sx : '')}
`;

export function Loading(props: LoadingProps) {
  const { spinner, stopped, ...rest } = props;

  return (
    <LoadingWrapper
      {...rest}
      aria-hidden
      className={clsx(...generalClasses(props), {
        loading: !spinner,
        spinner: spinner,
        'stop-animation': stopped,
      })}
    />
  );
}
