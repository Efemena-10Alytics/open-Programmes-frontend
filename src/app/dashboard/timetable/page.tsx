import { Suspense } from 'react'
import Timetable from '@/components/pages/dashboard/Timetable'
import Loader from '@/components/utilities/Loader'

export default function TimetablePage() {
  return (
    <Suspense fallback={<Loader />}>
      <Timetable />
    </Suspense>
  )
}