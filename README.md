# Cedar DataLoaders

Welcome to your new [CedarJS](https://cedarjs.com) project demonstrating the power of DataLoaders!

This application showcases two different approaches to handling related data in GraphQL:

1. **Books**: Traditional approach using Prisma's `include`
2. **Magazines**: Modern approach using DataLoaders (efficient batching)

## Quick Start

Start by installing dependencies:

```bash
yarn install
```

Then start the development server:

```bash
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page.

## Data Loading Patterns Comparison

### Magazines: DataLoader Pattern (Efficient Batching)

**Files:**
- `api/src/services/magazines/magazines.ts`
- `api/src/graphql/magazines.sdl.ts`
- `api/src/dataloaders/magazines.ts`
- `api/src/dataloaders/helpers.ts`
- `api/types/dataloaders.d.ts`
- `api/src/functions/graphql.ts`

**Implementation:**
```typescript
// Query resolver - fetches magazines without related data
export const magazines: QueryResolvers['magazines'] = () => {
  return db.magazine.findMany()
}

// Single magazine resolver - no include, relies on DataLoader
export const magazine: QueryResolvers['magazine'] = ({ id }) => {
  return db.magazine.findUnique({
    where: { id },
  })
}

// Relation resolver - uses DataLoader for efficient batching
export const Magazine: MagazineRelationResolvers = {
  pages: (_obj, { root, context }) => {
    return context.pages.load(root.id)
  },
}
```

**Benefits of this approach:**
- Multiple magazine page requests are batched into a single database query
- Eliminates N+1 query problem
- Significantly better performance with large datasets

## DataLoader Implementation Guide

### 1. Type Definitions (`api/types/dataloaders.d.ts`)

Extend the CedarJS GraphQL context to include your DataLoader:

```typescript
import type { MagazinePage } from '@prisma/client'
import type DataLoader from 'dataloader'

declare module '@cedarjs/graphql-server/dist/types' {
  interface RedwoodGraphQLContext {
    pages: DataLoader<number, MagazinePage[]>
  }
}
```

**Key points:**
- Import the related model type from `@prisma/client`
- Import `DataLoader` type from `dataloader`
- Extend `RedwoodGraphQLContext` interface
- Define the DataLoader with correct key types: `DataLoader<InputType, OutputType>`

### 2. DataLoader Implementation (`api/src/dataloaders/magazines.ts`)

Create the batch function that will be called by the DataLoader:

```typescript
import type { MagazinePage } from '@prisma/client'
import { db } from 'src/lib/db'
import { mapToKeys } from './helpers'

export const batchFnMagazinePages = async (
  magazineIds: readonly number[]
): Promise<(MagazinePage[] | Error)[]> => {
  // 1. You could run permission or role checks here
  // 2. You could create a where Tenancy clause to separate data by tenant
  // 3. Fetch data, you could again use a where clause to filter by tenant
  const results = await db.magazine.findMany({
    where: {
      id: { in: [...magazineIds] },
    },
    select: {
      id: true,
      pages: true,
    },
  })

  // 4. Map results back to keys
  return mapToKeys<MagazinePage, 'pages'>(magazineIds, results, 'pages')
}
```

**Key points:**
- Function name should be descriptive: `batchFn[Entity][Relation]`
- Accept `readonly number[]` of IDs to batch
- Return `Promise<(ResultType[] | Error)[]>`
- Use `select` instead of `include` to get only needed fields
- Use `mapToKeys` helper to maintain order and handle missing results

### 3. Helper Functions (`api/src/dataloaders/helpers.ts`)

Utility functions for mapping database results back to the original key order:

```typescript
// Helper to map results to the order of keys
export const mapToKeys = <T, K extends string>(
  keys: readonly number[],
  results: ({ id: number } & Record<K, T[]>)[],
  relationName: K
): T[][] => {
  const map = new Map<number, T[]>()
  for (const result of results) {
    map.set(result.id, result[relationName])
  }
  return keys.map((key) => map.get(key) || [])
}

export const mapToKey = <T, K extends string>(
  keys: readonly number[],
  results: ({ id: number } & Record<K, T | null>)[],
  relationName: K
): (T | null)[] => {
  const map = new Map<number, T | null>()
  for (const result of results) {
    map.set(result.id, result[relationName])
  }
  return keys.map((key) => map.get(key) ?? null)
}
```

**Key points:**
- `mapToKeys`: For one-to-many relationships (returns arrays)
- `mapToKey`: For one-to-one relationships (returns single items)
- Maintains the order of the original keys
- Handles missing results gracefully

### 4. GraphQL Handler Setup (`api/src/functions/graphql.ts`)

Register the DataLoader with the GraphQL server:

```typescript
import type { Plugin } from '@envelop/core'
import { useDataLoader } from '@envelop/dataloader'
import DataLoader from 'dataloader'
import { createGraphQLHandler } from '@cedarjs/graphql-server'
import * as magazines from 'src/dataloaders/magazines'

const dataloaderPlugin = useDataLoader(
  'pages', // This key becomes the context property name
  () => new DataLoader(magazines.batchFnMagazinePages)
) as Plugin

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  extraPlugins: [dataloaderPlugin], // Register the plugin
  onException: () => {
    db.$disconnect()
  },
})
```

**Key points:**
- Import `useDataLoader` from `@envelop/dataloader`
- The key ('pages') becomes the property name in context
- Pass the batch function to `new DataLoader()`
- Add the plugin to `extraPlugins` array

### 5. Service Implementation (`api/src/services/magazines/magazines.ts`)

Use the DataLoader in your GraphQL resolvers:

```typescript
export const Magazine: MagazineRelationResolvers = {
  pages: (_obj, { root, context }) => {
    return context.pages.load(root.id)
  },
}
```

**Key points:**
- Access the DataLoader via `context.[key].load(id)`
- The `key` must match what you defined in the GraphQL handler
- The `id` parameter must match the input type of your DataLoader

## Performance Comparison

### Without DataLoader (Books):
```
Query: SELECT * FROM Book WHERE id IN (1, 2, 3)
Query: SELECT * FROM Page WHERE bookId = 1
Query: SELECT * FROM Page WHERE bookId = 2
Query: SELECT * FROM Page WHERE bookId = 3
Total: 4 queries
```

### With DataLoader (Magazines):
```
Query: SELECT * FROM Magazine WHERE id IN (1, 2, 3)
Query: SELECT * FROM MagazinePage WHERE magazineId IN (1, 2, 3)
Total: 2 queries
```

## Best Practices

1. **Use DataLoaders for frequently accessed relations** - especially in list queries
2. **Keep batch functions focused** - one batch function per relation type
3. **Handle errors gracefully** - return `Error` objects for failed lookups
4. **Use TypeScript** - leverage type safety for DataLoader inputs/outputs
5. **Test thoroughly** - DataLoaders can be complex to debug
6. **Monitor performance** - measure the impact of your DataLoader implementations

## Troubleshooting

### Common Issues:

1. **"Cannot read properties of undefined"** - Check that the DataLoader key matches between type definition and GraphQL handler
2. **Type errors** - Ensure DataLoader input/output types match your batch function
3. **Missing results** - Verify your `mapToKeys` implementation handles missing data correctly
4. **Performance not improving** - Check that you're not using `include` in the same resolvers

### Debugging Tips:

1. Add logging to your batch functions to see when they're called
2. Check the Network tab in browser dev tools to see actual query count
3. Use GraphQL Playground to test queries with different field selections
4. Monitor database query logs to verify batching is working

This implementation demonstrates the power of DataLoaders in eliminating the N+1 query problem and significantly improving GraphQL API performance.
