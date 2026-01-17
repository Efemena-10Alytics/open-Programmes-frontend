import { Suspense } from 'react'
import Events from '@/components/pages/Events'
import Loader from '@/components/utilities/Loader'

export default function EventsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Events />
    </Suspense>
  )
}