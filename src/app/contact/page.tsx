import { Suspense } from 'react'
import Contact from '@/components/pages/Contact'
import Loader from '@/components/utilities/Loader'

export const metadata = {
  title: 'Contact Us - 10Alytics Business',
  description: 'Get in touch with us for inquiries on enrollment, available courses and next cohort start date.',
}

export default function ContactPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Contact />
    </Suspense>
  )
}