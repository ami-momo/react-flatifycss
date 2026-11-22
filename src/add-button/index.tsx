import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface AddButtonProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Shows a minus instead of a plus. */
  active?: boolean;
  /** Accessible label, read by screen readers. */
  label: string;
}

const AddButtonWrapper = styled.div`
  ${({ sx }: AddButtonProps) => (sx ? sx : '')}
`;

export const AddButton = forwardRef(
  (
    props: AddButtonProps,
    ref: React.LegacyRef<HTMLButtonElement> | undefined
  ) => {
    const { active, label, ...rest } = props;

    return (
      <AddButtonWrapper
        {...rest}
        ref={ref}
        aria-label={label}
        className={clsx(
          'add-button',
          active && 'active',
          ...generalClasses(props)
        )}
      />
    );
  }
);
