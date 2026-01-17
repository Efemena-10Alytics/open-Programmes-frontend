import { Suspense } from 'react'
import Lessons from '@/components/pages/dashboard/Lessons'
import Loader from '@/components/utilities/Loader'

export default function LessonsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Lessons />
    </Suspense>
  )
}