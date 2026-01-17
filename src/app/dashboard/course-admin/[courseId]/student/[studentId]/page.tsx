import { Suspense } from 'react'
import CourseAdminStudentProgress from '@/components/pages/dashboard/CourseAdminStudentEngagement'
import Loader from '@/components/utilities/Loader'

interface PageProps {
  params: Promise<{
    courseId: string
    studentId: string
  }>
}

export default async function CourseAdminStudentProgressPage(props: PageProps) {
  const params = await props.params
  const { courseId, studentId } = params

  return (
    <Suspense fallback={<Loader />}>
      <CourseAdminStudentProgress />
    </Suspense>
  )
}