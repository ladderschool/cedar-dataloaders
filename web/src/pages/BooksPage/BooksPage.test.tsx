import { render } from '@cedarjs/testing/web'

import BooksPage from './BooksPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BooksPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BooksPage />)
    }).not.toThrow()
  })
})
