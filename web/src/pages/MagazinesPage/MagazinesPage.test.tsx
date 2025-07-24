import { render } from '@cedarjs/testing/web'

import MagazinesPage from './MagazinesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MagazinesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MagazinesPage />)
    }).not.toThrow()
  })
})
