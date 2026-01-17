import { Suspense } from 'react'
import Courses from '@/components/pages/Courses'
import Loader from '@/components/utilities/Loader'

export default function CoursesPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Courses />
    </Suspense>
  )
}