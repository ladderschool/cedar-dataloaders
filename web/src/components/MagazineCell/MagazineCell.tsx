import type {
  FindMagazineQuery,
  FindMagazineQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@cedarjs/web'

import Magazine from 'src/components/Magazine/Magazine'

export const QUERY: TypedDocumentNode<
  FindMagazineQuery,
  FindMagazineQueryVariables
> = gql`
  query FindMagazineQuery($id: Int!) {
    magazine: magazine(id: $id) {
      id
      title
      content
      published
      createdAt
      updatedAt
      pages {
        id
        title
        content
        published
        createdAt
        updatedAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMagazineQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  magazine,
}: CellSuccessProps<FindMagazineQuery, FindMagazineQueryVariables>) => {
  return <Magazine magazine={magazine} />
}
