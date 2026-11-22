import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { Tabs as ReachTabs } from '@reach/tabs';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface TabsProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color' | 'onChange'> {
  /** Adds borders. */
  bordered?: boolean;
  /** Content of the component. */
  children: React.ReactNode;
  /** Index of the tab open on first render, starts from 0. */
  defaultIndex?: number;
  /** Index of the open item, use it with `onChange` to control the component. */
  index?: number;
  /** Called with the index of the selected tab. */
  onChange?: (index: number) => void;
}

const TabsWrapper = styled(ReachTabs)`
  ${({ sx }: TabsProps) => (sx ? sx : '')}
`;

export default function Tabs(props: TabsProps) {
  const { bordered, ...rest } = props;

  return (
    <TabsWrapper
      {...rest}
      className={clsx('tabs-wrapper', ...generalClasses(props), {
        bordered: bordered,
      })}
    />
  );
}
