import { Suspense } from 'react'
import FreeCourses from '@/components/pages/FreeCourses'
import Loader from '@/components/utilities/Loader'

export default function FreeCoursesPage() {
  return (
    <Suspense fallback={<Loader />}>
      <FreeCourses />
    </Suspense>
  )
}