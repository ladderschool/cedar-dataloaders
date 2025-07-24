import { render } from '@cedarjs/testing/web'

import MagazinePage from './MagazinePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MagazinePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MagazinePage />)
    }).not.toThrow()
  })
})
