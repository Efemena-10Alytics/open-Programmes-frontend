import { Suspense } from 'react'
import CourseDetails from '@/components/pages/CourseDetails'
import Loader from '@/components/utilities/Loader'

export default function CourseDetailsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CourseDetails />
    </Suspense>
  )
}