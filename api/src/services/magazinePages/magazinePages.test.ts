import type { MagazinePage } from '@prisma/client'

import {
  magazinePages,
  magazinePage,
  createMagazinePage,
  updateMagazinePage,
  deleteMagazinePage,
} from './magazinePages'
import type { StandardScenario } from './magazinePages.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('magazinePages', () => {
  scenario('returns all magazinePages', async (scenario: StandardScenario) => {
    const result = await magazinePages()

    expect(result.length).toEqual(Object.keys(scenario.magazinePage).length)
  })

  scenario(
    'returns a single magazinePage',
    async (scenario: StandardScenario) => {
      const result = await magazinePage({ id: scenario.magazinePage.one.id })

      expect(result).toEqual(scenario.magazinePage.one)
    }
  )

  scenario('creates a magazinePage', async (scenario: StandardScenario) => {
    const result = await createMagazinePage({
      input: {
        title: 'String',
        content: 'String',
        updatedAt: '2025-07-24T00:00:46.126Z',
        magazineId: scenario.magazinePage.two.magazineId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.content).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2025-07-24T00:00:46.126Z'))
    expect(result.magazineId).toEqual(scenario.magazinePage.two.magazineId)
  })

  scenario('updates a magazinePage', async (scenario: StandardScenario) => {
    const original = (await magazinePage({
      id: scenario.magazinePage.one.id,
    })) as MagazinePage
    const result = await updateMagazinePage({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a magazinePage', async (scenario: StandardScenario) => {
    const original = (await deleteMagazinePage({
      id: scenario.magazinePage.one.id,
    })) as MagazinePage
    const result = await magazinePage({ id: original.id })

    expect(result).toEqual(null)
  })
})
