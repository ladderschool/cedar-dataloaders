import type { Meta, StoryObj } from '@storybook/react'

import BooksPage from './BooksPage'

const meta: Meta<typeof BooksPage> = {
  component: BooksPage,
}

export default meta

type Story = StoryObj<typeof BooksPage>

export const Primary: Story = {}
