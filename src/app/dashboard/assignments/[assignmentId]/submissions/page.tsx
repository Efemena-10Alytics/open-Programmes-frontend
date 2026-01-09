import AssignmentSubmissions from '@/pages/dashboard/AssignmentSubmissions'

interface PageProps {
  params: Promise<{
    assignmentId: string
  }>
}

export default async function AssignmentSubmissionsPage(props: PageProps) {
  const params = await props.params
  const { assignmentId } = params
  
  return <AssignmentSubmissions assignmentId={assignmentId} />
}