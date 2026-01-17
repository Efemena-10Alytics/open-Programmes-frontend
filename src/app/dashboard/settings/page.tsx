import { Suspense } from 'react'
import Settings from '@/components/pages/dashboard/Settings'
import Loader from '@/components/utilities/Loader'

export default function SettingsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Settings />
    </Suspense>
  )
}