import { Suspense } from 'react'
import MasterClass from '@/components/pages/MasterClass'
import Loader from '@/components/utilities/Loader'

export default function MasterClassPage() {
  return (
    <Suspense fallback={<Loader />}>
      <MasterClass />
    </Suspense>
  )
}