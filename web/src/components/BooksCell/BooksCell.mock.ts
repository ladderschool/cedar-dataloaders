// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  books: [
    {
      __typename: 'Books' as const,
      id: 42,
    },
    {
      __typename: 'Books' as const,
      id: 43,
    },
    {
      __typename: 'Books' as const,
      id: 44,
    },
  ],
})
