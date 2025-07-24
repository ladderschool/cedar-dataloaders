export const schema = gql`
  type MagazinePage {
    id: Int!
    title: String!
    content: String!
    published: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    magazine: Magazine!
    magazineId: Int!
  }

  type Query {
    magazinePages: [MagazinePage!]! @requireAuth
    magazinePage(id: Int!): MagazinePage @requireAuth
  }

  input CreateMagazinePageInput {
    title: String!
    content: String!
    published: Boolean!
    magazineId: Int!
  }

  input UpdateMagazinePageInput {
    title: String
    content: String
    published: Boolean
    magazineId: Int
  }

  type Mutation {
    createMagazinePage(input: CreateMagazinePageInput!): MagazinePage!
      @requireAuth
    updateMagazinePage(
      id: Int!
      input: UpdateMagazinePageInput!
    ): MagazinePage! @requireAuth
    deleteMagazinePage(id: Int!): MagazinePage! @requireAuth
  }
`
