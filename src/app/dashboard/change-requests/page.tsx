import { Suspense } from 'react'
import ChangeRequests from '@/components/pages/dashboard/ChangeRequests'
import Loader from '@/components/utilities/Loader'

export default function ChangeRequestsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ChangeRequests />
    </Suspense>
  )
}