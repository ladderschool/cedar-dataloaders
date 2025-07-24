import { Metadata } from '@cedarjs/web'

import BooksCell from 'src/components/BooksCell'

const BooksPage = () => {
  return (
    <>
      <Metadata title="Books" description="Browse our collection of books" />

      <BooksCell />
    </>
  )
}

export default BooksPage
