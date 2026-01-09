import { Suspense } from 'react'
import PaymentFailed from '@/components/pages/PaymentFailed'

// Loading fallback component
function PaymentFailedFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-red-200">
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-white"></div>
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Loading...
        </h1>
      </div>
    </div>
  )
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<PaymentFailedFallback />}>
      <PaymentFailed />
    </Suspense>
  )
}