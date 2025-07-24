import type {
  QueryResolvers,
  MutationResolvers,
  BookRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const books: QueryResolvers['books'] = () => {
  return db.book.findMany()
}

export const book: QueryResolvers['book'] = ({ id }) => {
  return db.book.findUnique({
    where: { id },
    include: {
      pages: true,
    },
  })
}

export const createBook: MutationResolvers['createBook'] = ({ input }) => {
  return db.book.create({
    data: input,
  })
}

export const updateBook: MutationResolvers['updateBook'] = ({ id, input }) => {
  return db.book.update({
    data: input,
    where: { id },
  })
}

export const deleteBook: MutationResolvers['deleteBook'] = ({ id }) => {
  return db.book.delete({
    where: { id },
  })
}

export const Book: BookRelationResolvers = {
  pages: (_obj, { root }) => {
    return db.book.findUnique({ where: { id: root?.id } }).pages()
  },
}
