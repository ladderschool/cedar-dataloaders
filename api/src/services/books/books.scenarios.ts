import type { Prisma, Book } from '@prisma/client'

import type { ScenarioData } from '@cedarjs/testing/api'

export const standard = defineScenario<Prisma.BookCreateArgs>({
  book: {
    one: {
      data: {
        title: 'String',
        author: 'String',
        year: 1973503,
        genre: 'String',
        updatedAt: '2025-07-23T23:32:29.847Z',
      },
    },
    two: {
      data: {
        title: 'String',
        author: 'String',
        year: 6339441,
        genre: 'String',
        updatedAt: '2025-07-23T23:32:29.847Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Book, 'book'>
