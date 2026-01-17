import { Suspense } from 'react'
import Login from '@/components/pages/auth/Login'
import Loader from '@/components/utilities/Loader'

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Login />
    </Suspense>
  )
}