import { Suspense } from 'react'
import AssignmentSubmissions from '@/components/pages/dashboard/AssignmentSubmissions'
import Loader from '@/components/utilities/Loader'

interface PageProps {
  params: Promise<{
    assignmentId: string
  }>
}

export default async function AssignmentSubmissionsPage(props: PageProps) {
  const params = await props.params
  const { assignmentId } = params

  return (
    <Suspense fallback={<Loader />}>
      <AssignmentSubmissions assignmentId={assignmentId} />
    </Suspense>
  )
}