import { Suspense } from 'react'
import ForgetPassword from '@/components/pages/auth/ForgetPassword'
import Loader from '@/components/utilities/Loader'

export default function ForgetPasswordPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ForgetPassword />
    </Suspense>
  )
}