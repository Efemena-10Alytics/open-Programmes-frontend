import { Suspense } from 'react'
import CourseAdminStudents from '@/components/pages/dashboard/CourseAdminStudents'
import Loader from '@/components/utilities/Loader'

interface PageProps {
  params: Promise<{
    courseId: string
  }>
}

export default async function CourseAdminStudentsPage(props: PageProps) {
  const params = await props.params
  const { courseId } = params

  return (
    <Suspense fallback={<Loader />}>
      <CourseAdminStudents />
    </Suspense>
  )
}