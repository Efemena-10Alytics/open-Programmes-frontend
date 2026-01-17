import { Suspense } from 'react'
import Catalog from '@/components/pages/dashboard/Catalog'
import Loader from '@/components/utilities/Loader'

export default function CatalogPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Catalog />
    </Suspense>
  )
}