import CourseAdminStudents from '@/pages/dashboard/CourseAdminStudents'

interface PageProps {
  params: Promise<{
    courseId: string
  }>
}

export default async function CourseAdminStudentsPage(props: PageProps) {
  const params = await props.params
  const { courseId } = params
  
  return <CourseAdminStudents />
}