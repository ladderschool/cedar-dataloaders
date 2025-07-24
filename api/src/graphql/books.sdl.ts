export const schema = gql`
  type Book {
    id: Int!
    title: String!
    author: String!
    year: Int!
    genre: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
    pages: [Page]!
  }

  type Query {
    books: [Book!]! @requireAuth
    book(id: Int!): Book @requireAuth
  }

  input CreateBookInput {
    title: String!
    author: String!
    year: Int!
    genre: String!
    description: String
  }

  input UpdateBookInput {
    title: String
    author: String
    year: Int
    genre: String
    description: String
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book! @requireAuth
    updateBook(id: Int!, input: UpdateBookInput!): Book! @requireAuth
    deleteBook(id: Int!): Book! @requireAuth
  }
`
