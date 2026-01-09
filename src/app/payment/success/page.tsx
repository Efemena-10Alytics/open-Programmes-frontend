import { Suspense } from 'react'
import PaymentSuccess from '@/components/pages/PaymentSuccess'

function PaymentSuccessFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-green-200">
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-white"></div>
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Loading...</h1>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccess />
    </Suspense>
  )
}