// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  magazine: {
    __typename: 'Magazine' as const,
    id: 42,
  },
})
