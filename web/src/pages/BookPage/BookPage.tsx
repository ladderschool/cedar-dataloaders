import { Metadata } from '@cedarjs/web'

import BookCell from 'src/components/BookCell'

const BookPage = ({ id }: { id: number }) => {
  return (
    <>
      <Metadata title="Book" description="Book page" />
      <BookCell id={id} />
    </>
  )
}

export default BookPage
