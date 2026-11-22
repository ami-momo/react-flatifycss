import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps, Colors } from '../interfaces';
import { generalClasses } from '../classes';

export interface FigureProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLImageElement>, 'color'> {
  /** Image alternative text, required. */
  alt: string;
  /** Caption under the image. */
  caption?: string;
  /** Centers the figure. */
  centered?: boolean;
  /** Content of the component. */
  children?: React.ReactNode;
  /** Name of the image author. */
  creditName?: string;
  /** Link of the image author. */
  creditLink?: string;
  /** Color of the credit badge. */
  creditTheme?: Colors;
  /** Full width image. */
  fill?: boolean;
  /** Puts the caption over the image. */
  overlayCaption?: boolean;
  /** Image address, required. */
  src: string;
}

const FigureWrapper = styled.figure`
  ${({ sx }: FigureProps) => (sx ? sx : '')}
`;

export function Figure(props: FigureProps) {
  const {
    as,
    sx,
    alt,
    caption,
    centered,
    children,
    creditName,
    creditLink,
    creditTheme,
    fill,
    overlayCaption,
    ...rest
  } = props;

  return (
    <FigureWrapper
      as={as}
      sx={sx}
      className={clsx(
        'figure',
        {
          centered,
          fill,
          'overlay-caption': overlayCaption,
        },
        ...generalClasses(props)
      )}
    >
      <img {...rest} alt={alt || caption} />
      {caption && <figcaption>{caption}</figcaption>}
      {creditLink && creditName ? (
        <a
          href={creditLink}
          className={clsx('source', creditTheme && `style-${creditTheme}`)}
          target="_blank"
          rel="nofollow noreferrer"
        >
          {creditName}
        </a>
      ) : (
        creditName && (
          <span
            className={clsx('source', creditTheme && `style-${creditTheme}`)}
          >
            {creditName}
          </span>
        )
      )}
    </FigureWrapper>
  );
}
