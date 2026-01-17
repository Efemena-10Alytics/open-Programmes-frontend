import { Suspense } from 'react'
import CourseAdminDashboard from '@/components/pages/dashboard/CourseAdminDashboard'
import Loader from '@/components/utilities/Loader'

export default function CourseAdminDashboardPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CourseAdminDashboard />
    </Suspense>
  )
}