import type { FindBookQuery, FindBookQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@cedarjs/web'

import Book from 'src/components/Book'

export const QUERY: TypedDocumentNode<FindBookQuery, FindBookQueryVariables> =
  gql`
    query FindBookQuery($id: Int!) {
      book: book(id: $id) {
        id
        title
        author
        year
        genre
        description
        createdAt
        updatedAt
        pages {
          id
          title
          content
          published
          createdAt
          updatedAt
          slug
        }
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBookQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  book,
}: CellSuccessProps<FindBookQuery, FindBookQueryVariables>) => {
  return <Book book={book} />
}
