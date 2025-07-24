import type { MagazinePage } from '@prisma/client'
import type DataLoader from 'dataloader'

declare module '@cedarjs/graphql-server/dist/types' {
  interface RedwoodGraphQLContext {
    pages: DataLoader<number, MagazinePage[]>
  }
}
