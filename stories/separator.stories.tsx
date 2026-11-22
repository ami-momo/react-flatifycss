import React from 'react';
import type { Meta, StoryFn as Story } from '@storybook/react-vite';
import { Separator } from '../src';

const meta: Meta = {
  title: 'Content/Separator',
  component: Separator,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => <Separator {...args} />;

export const Default = Template.bind({});
export const ShortLine = Template.bind({});
export const Dots = Template.bind({});
export const Theme = Template.bind({});

ShortLine.args = {
  type: 'short',
};

Dots.args = {
  type: 'dots',
};

Theme.args = {
  theme: 'orange-light',
  type: 'dots',
};
