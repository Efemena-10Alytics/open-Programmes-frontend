import { Suspense } from 'react'
import MasterClass2 from '@/components/pages/MasterClass2'
import Loader from '@/components/utilities/Loader'

export default function MasterClass2Page() {
  return (
    <Suspense fallback={<Loader />}>
      <MasterClass2 />
    </Suspense>
  )
}