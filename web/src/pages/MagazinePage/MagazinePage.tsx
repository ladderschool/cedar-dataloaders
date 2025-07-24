import { Metadata } from '@cedarjs/web'

import MagazineCell from 'src/components/MagazineCell'

const MagazinePage = ({ id }: { id: number }) => {
  return (
    <>
      <Metadata title="Magazine" description="Magazine page" />
      <MagazineCell id={id} />
    </>
  )
}

export default MagazinePage
