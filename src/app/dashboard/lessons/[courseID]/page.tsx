import { Suspense } from 'react'
import LessonDetails from '@/components/pages/dashboard/LessonDetails'
import Loader from '@/components/utilities/Loader'

interface PageProps {
  params: Promise<{
    courseID: string
  }>
}

export default async function LessonDetailsPage(props: PageProps) {
  const params = await props.params
  const { courseID } = params

  return (
    <Suspense fallback={<Loader />}>
      <LessonDetails />
    </Suspense>
  )
}