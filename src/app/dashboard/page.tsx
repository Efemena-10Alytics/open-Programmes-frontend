import { Suspense } from 'react'
import Dashboard from '@/components/pages/dashboard/Dashboard'
import Loader from '@/components/utilities/Loader'

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Dashboard />
    </Suspense>
  )
}