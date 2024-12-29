import type { Meta, StoryObj } from '@storybook/react'

import UserInfo from './UserInfo'

const meta = {
  component: UserInfo,
} satisfies Meta<typeof UserInfo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'example@gmail.com',
    role: 'admin',
    signOutAction: () => {},
  },
}
