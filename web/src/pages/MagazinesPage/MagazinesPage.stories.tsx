import type { Meta, StoryObj } from '@storybook/react'

import MagazinesPage from './MagazinesPage'

const meta: Meta<typeof MagazinesPage> = {
  component: MagazinesPage,
}

export default meta

type Story = StoryObj<typeof MagazinesPage>

export const Primary: Story = {}
