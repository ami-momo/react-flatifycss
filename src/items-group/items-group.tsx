import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';
import Item from './item';

export interface itemProps {
  /** Class names added when the item is active. */
  activeClassName?: string;
  /** Extra class names. */
  className?: string;
  /** Second line of the item. */
  subtitle?: string;
  /** Icon of the item. */
  svg?: React.ReactNode;
  /** Title of the item. */
  title: string;
  /** Value of the selected item. */
  value: string | number;
}

export interface ItemsGroupProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color' | 'onChange'> {
  /** Content of the component. */
  children?: React.ReactNode;
  /** Items as an array, you can use `<Item />` children instead. */
  items?: itemProps[];
  /** Called with the value of the selected item. */
  onChange?: (value: any) => void;
  /** Value of the selected item. */
  value: string | number;
}

const ItemsGroupWrapper = styled.div`
  ${({ sx }: ItemsGroupProps) => (sx ? sx : '')}
`;

export default function ItemsGroup(props: ItemsGroupProps) {
  const { children, items, onChange, value, ...rest } = props;

  return (
    <ItemsGroupWrapper
      {...rest}
      className={clsx('items-group', ...generalClasses(props))}
    >
      {items &&
        items.map((item, index) => {
          const { value: itemValue } = item;
          const isActive = itemValue === value;

          return (
            <Item
              key={`${itemValue}_${index}`}
              {...item}
              active={isActive}
              onClick={onChange}
            />
          );
        })}

      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          active: child.props?.value === value,
          onClick: onChange,
        });
      })}
    </ItemsGroupWrapper>
  );
}
