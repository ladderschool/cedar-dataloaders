export const schema = gql`
  type Magazine {
    id: Int!
    title: String!
    content: String!
    published: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    pages: [MagazinePage!]!
  }

  type Query {
    magazines: [Magazine!]! @requireAuth
    magazine(id: Int!): Magazine @requireAuth
  }

  input CreateMagazineInput {
    title: String!
    content: String!
    published: Boolean!
  }

  input UpdateMagazineInput {
    title: String
    content: String
    published: Boolean
  }

  type Mutation {
    createMagazine(input: CreateMagazineInput!): Magazine! @requireAuth
    updateMagazine(id: Int!, input: UpdateMagazineInput!): Magazine!
      @requireAuth
    deleteMagazine(id: Int!): Magazine! @requireAuth
  }
`
