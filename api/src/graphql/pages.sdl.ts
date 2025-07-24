export const schema = gql`
  type Page {
    id: Int!
    title: String!
    content: String!
    slug: String!
    published: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    book: Book!
    bookId: Int!
  }

  type Query {
    pages: [Page!]! @requireAuth
    page(id: Int!): Page @requireAuth
  }

  input CreatePageInput {
    title: String!
    content: String!
    slug: String!
    published: Boolean!
    bookId: Int!
  }

  input UpdatePageInput {
    title: String
    content: String
    slug: String
    published: Boolean
    bookId: Int
  }

  type Mutation {
    createPage(input: CreatePageInput!): Page! @requireAuth
    updatePage(id: Int!, input: UpdatePageInput!): Page! @requireAuth
    deletePage(id: Int!): Page! @requireAuth
  }
`
