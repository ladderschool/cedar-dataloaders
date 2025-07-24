import type { Plugin } from '@envelop/core'
import { useDataLoader } from '@envelop/dataloader'
import DataLoader from 'dataloader'

import { createGraphQLHandler } from '@cedarjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import * as magazines from 'src/dataloaders/magazines'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const dataloaderPlugin = useDataLoader(
  'pages',
  () => new DataLoader(magazines.batchFnMagazinePages)
) as Plugin

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  extraPlugins: [dataloaderPlugin],
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
