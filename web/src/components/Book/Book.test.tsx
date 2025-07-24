import { render } from '@cedarjs/testing/web'

import Book from './Book'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Book', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Book />)
    }).not.toThrow()
  })
})
