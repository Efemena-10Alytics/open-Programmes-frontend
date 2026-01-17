import { Suspense } from 'react'
import Certifications from '@/components/pages/dashboard/Certifications'
import Loader from '@/components/utilities/Loader'

export default function CertificationsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Certifications />
    </Suspense>
  )
}