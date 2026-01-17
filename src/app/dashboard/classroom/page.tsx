import { Suspense } from 'react'
import Classroom from '@/components/pages/dashboard/ClassroomPage'
import Loader from '@/components/utilities/Loader'

export default function ClassroomPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Classroom />
    </Suspense>
  )
}