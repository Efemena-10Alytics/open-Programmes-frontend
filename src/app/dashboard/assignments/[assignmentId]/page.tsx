import AssignmentDetails from '@/pages/dashboard/AssignmentDetails'

interface PageProps {
  params: Promise<{
    assignmentId: string
  }>
}

export default async function AssignmentDetailsPage(props: PageProps) {
  const params = await props.params
  const { assignmentId } = params
  
  return <AssignmentDetails assignmentId={assignmentId} />
}