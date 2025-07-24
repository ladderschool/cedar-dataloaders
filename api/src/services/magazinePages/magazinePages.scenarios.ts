import type { Prisma, MagazinePage } from '@prisma/client'

import type { ScenarioData } from '@cedarjs/testing/api'

export const standard = defineScenario<Prisma.MagazinePageCreateArgs>({
  magazinePage: {
    one: {
      data: {
        title: 'String',
        content: 'String',
        updatedAt: '2025-07-24T00:00:46.194Z',
        magazine: {
          create: {
            title: 'String',
            content: 'String',
            updatedAt: '2025-07-24T00:00:46.200Z',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        content: 'String',
        updatedAt: '2025-07-24T00:00:46.200Z',
        magazine: {
          create: {
            title: 'String',
            content: 'String',
            updatedAt: '2025-07-24T00:00:46.205Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<MagazinePage, 'magazinePage'>
