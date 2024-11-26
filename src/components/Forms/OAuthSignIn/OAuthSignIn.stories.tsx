import type { Meta, StoryObj } from '@storybook/react';

import OauthSignIn from './OAuthSignIn';

const meta = {
  component: OauthSignIn,
} satisfies Meta<typeof OauthSignIn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};