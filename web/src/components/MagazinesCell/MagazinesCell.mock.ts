// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  magazines: [
    {
      __typename: 'Magazine' as const,
      id: 42,
    },
    {
      __typename: 'Magazine' as const,
      id: 43,
    },
    {
      __typename: 'Magazine' as const,
      id: 44,
    },
  ],
})
