// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  book: {
    __typename: 'Book' as const,
    id: 42,
  },
})
