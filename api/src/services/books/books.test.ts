import type { Book } from '@prisma/client'

import { books, book, createBook, updateBook, deleteBook } from './books'
import type { StandardScenario } from './books.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('books', () => {
  scenario('returns all books', async (scenario: StandardScenario) => {
    const result = await books()

    expect(result.length).toEqual(Object.keys(scenario.book).length)
  })

  scenario('returns a single book', async (scenario: StandardScenario) => {
    const result = await book({ id: scenario.book.one.id })

    expect(result).toEqual(scenario.book.one)
  })

  scenario('creates a book', async () => {
    const result = await createBook({
      input: {
        title: 'String',
        author: 'String',
        year: 2770522,
        genre: 'String',
        updatedAt: '2025-07-23T23:32:29.803Z',
      },
    })

    expect(result.title).toEqual('String')
    expect(result.author).toEqual('String')
    expect(result.year).toEqual(2770522)
    expect(result.genre).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2025-07-23T23:32:29.803Z'))
  })

  scenario('updates a book', async (scenario: StandardScenario) => {
    const original = (await book({ id: scenario.book.one.id })) as Book
    const result = await updateBook({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a book', async (scenario: StandardScenario) => {
    const original = (await deleteBook({ id: scenario.book.one.id })) as Book
    const result = await book({ id: original.id })

    expect(result).toEqual(null)
  })
})
