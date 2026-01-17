import { Suspense } from 'react'
import PaymentSuccess from '@/components/pages/PaymentSuccess'
import Loader from '@/components/utilities/Loader'

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentSuccess />
    </Suspense>
  )
}