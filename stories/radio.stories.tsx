import React, { useState } from 'react';
import type { Meta, StoryFn as Story } from '@storybook/react-vite';
import { Radio } from '../src';

const meta: Meta = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {
  const [checked, setChecked] = useState(false);
  const name = React.useId();

  return (
    <>
      <Radio
        {...args}
        name={name}
        checked={checked}
        onChange={() => setChecked(!checked)}
      >
        I Agree to Privacy Policy.
      </Radio>
      <p className="help-text size-xs" style={{ fontFamily: 'monospace' }}>
        Agreement: {checked ? 'YES' : 'NO'}
      </p>
    </>
  );
};

const UncontrolledTemplate: Story = args => (
  <Radio
    {...args}
    name="radio-uncontrolled"
    defaultChecked={false}
    onChange={(e, checked) => alert('Radio value is: ' + checked)}
  >
    I Agree to Privacy Policy.
  </Radio>
);

const TemplateMultiple: Story = args => {
  const [checked, setChecked] = useState<any>('pizza');
  const name = React.useId();

  return (
    <>
      <Radio
        {...args}
        name={name}
        value="pizza"
        checked={checked == 'pizza'}
        onChange={(e, checked, value) => setChecked(value)}
      >
        Pizza
      </Radio>
      <Radio
        {...args}
        name={name}
        value="sushi"
        checked={checked == 'sushi'}
        onChange={(e, checked, value) => setChecked(value)}
      >
        Sushi
      </Radio>
      <p className="help-text size-xs" style={{ fontFamily: 'monospace' }}>
        Your dinner will be: {checked}
      </p>
    </>
  );
};

export const Default = Template.bind({});
export const Uncontrolled = UncontrolledTemplate.bind({});
export const Multiple = TemplateMultiple.bind({});
export const Disabled = Template.bind({});
export const States = Template.bind({});
export const Customized = Template.bind({});

Disabled.args = {
  checked: false,
  disabled: true,
};

States.args = {
  state: 'invalid',
};

Customized.args = {
  state: 'invalid',
  colorValid: '#A0CECB',
  colorWarning: '#EC87C0',
  colorInvalid: '#8067B7',
};
