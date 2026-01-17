import { Suspense } from 'react'
import AssignmentDetails from '@/components/pages/dashboard/AssignmentDetails'
import Loader from '@/components/utilities/Loader'

interface PageProps {
  params: Promise<{
    assignmentId: string
  }>
}

export default async function AssignmentDetailsPage(props: PageProps) {
  const params = await props.params
  const { assignmentId } = params

  return (
    <Suspense fallback={<Loader />}>
      <AssignmentDetails assignmentId={assignmentId} />
    </Suspense>
  )
}