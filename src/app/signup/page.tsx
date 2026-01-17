import { Suspense } from 'react'
import Signup from '@/components/pages/auth/Signup'
import Loader from '@/components/utilities/Loader'

export default function SignupPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Signup />
    </Suspense>
  )
}