import type { Magazine } from '@prisma/client'

import {
  magazines,
  magazine,
  createMagazine,
  updateMagazine,
  deleteMagazine,
} from './magazines'
import type { StandardScenario } from './magazines.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('magazines', () => {
  scenario('returns all magazines', async (scenario: StandardScenario) => {
    const result = await magazines()

    expect(result.length).toEqual(Object.keys(scenario.magazine).length)
  })

  scenario('returns a single magazine', async (scenario: StandardScenario) => {
    const result = await magazine({ id: scenario.magazine.one.id })

    expect(result).toEqual(scenario.magazine.one)
  })

  scenario('creates a magazine', async () => {
    const result = await createMagazine({
      input: {
        title: 'String',
        content: 'String',
        updatedAt: '2025-07-23T23:59:45.846Z',
      },
    })

    expect(result.title).toEqual('String')
    expect(result.content).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2025-07-23T23:59:45.846Z'))
  })

  scenario('updates a magazine', async (scenario: StandardScenario) => {
    const original = (await magazine({
      id: scenario.magazine.one.id,
    })) as Magazine
    const result = await updateMagazine({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a magazine', async (scenario: StandardScenario) => {
    const original = (await deleteMagazine({
      id: scenario.magazine.one.id,
    })) as Magazine
    const result = await magazine({ id: original.id })

    expect(result).toEqual(null)
  })
})
