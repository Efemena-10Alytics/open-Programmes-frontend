import LessonDetails from '@/components/pages/dashboard/LessonDetails'

interface PageProps {
  params: Promise<{
    courseID: string
  }>
}

export default async function LessonDetailsPage(props: PageProps) {
  const params = await props.params
  const { courseID } = params
  
  return <LessonDetails />
}