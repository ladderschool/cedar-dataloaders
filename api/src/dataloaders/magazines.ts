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
