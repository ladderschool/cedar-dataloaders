import type { Prisma, Page } from '@prisma/client'

import type { ScenarioData } from '@cedarjs/testing/api'

export const standard = defineScenario<Prisma.PageCreateArgs>({
  page: {
    one: {
      data: {
        title: 'String',
        content: 'String',
        slug: 'String2905373',
        updatedAt: '2025-07-23T23:32:20.157Z',
        book: {
          create: {
            title: 'String',
            author: 'String',
            year: 9597259,
            genre: 'String',
            updatedAt: '2025-07-23T23:32:20.162Z',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        content: 'String',
        slug: 'String7005544',
        updatedAt: '2025-07-23T23:32:20.162Z',
        book: {
          create: {
            title: 'String',
            author: 'String',
            year: 7172292,
            genre: 'String',
            updatedAt: '2025-07-23T23:32:20.167Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Page, 'page'>
