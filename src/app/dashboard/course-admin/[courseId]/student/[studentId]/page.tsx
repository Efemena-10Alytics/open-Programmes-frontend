import CourseAdminStudentProgress from '@/pages/dashboard/CourseAdminStudentEngagement'

interface PageProps {
  params: Promise<{
    courseId: string
    studentId: string
  }>
}

export default async function CourseAdminStudentProgressPage(props: PageProps) {
  const params = await props.params
  const { courseId, studentId } = params
  
  return <CourseAdminStudentProgress />
}