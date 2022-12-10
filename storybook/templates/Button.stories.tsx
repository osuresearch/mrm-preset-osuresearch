import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, Props } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {}
} as Meta<typeof Button>;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  text: 'Default'
};

export const Disabled = Template.bind({});
Disabled.args = {
  primary: false,
  disabled: true,
  text: 'Disabled'
};
