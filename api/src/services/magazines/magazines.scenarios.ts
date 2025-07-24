import type { Prisma, Magazine } from '@prisma/client'

import type { ScenarioData } from '@cedarjs/testing/api'

export const standard = defineScenario<Prisma.MagazineCreateArgs>({
  magazine: {
    one: {
      data: {
        title: 'String',
        content: 'String',
        updatedAt: '2025-07-23T23:59:45.886Z',
      },
    },
    two: {
      data: {
        title: 'String',
        content: 'String',
        updatedAt: '2025-07-23T23:59:45.886Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Magazine, 'magazine'>
