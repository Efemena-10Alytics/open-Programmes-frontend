import { Suspense } from 'react'
import PaymentFailed from '@/components/pages/PaymentFailed'
import Loader from '@/components/utilities/Loader'

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentFailed />
    </Suspense>
  )
}