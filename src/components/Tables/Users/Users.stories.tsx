import type { Meta, StoryObj } from '@storybook/react'

import Users from './Users'

const meta = {
  component: Users,
} satisfies Meta<typeof Users>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    users: [
      { email: 'email1', id: '1' },
      { email: 'email2', id: '2' },
      { email: 'email3', id: '3' },
    ],
  },
}
