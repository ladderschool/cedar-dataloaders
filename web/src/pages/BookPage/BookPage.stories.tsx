import type { Meta, StoryObj } from '@storybook/react'

import BookPage from './BookPage'

const meta: Meta<typeof BookPage> = {
  component: BookPage,
}

export default meta

type Story = StoryObj<typeof BookPage>

export const Primary: Story = {}
