import { Suspense } from 'react'
import { ProtectedRoute } from "@/components/utilities/ProtectedRoute";
import PaymentPage from "@/components/pages/Payments";
import Loader from '@/components/utilities/Loader';

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function PaymentPageWrapper(props: PageProps) {
  const params = await props.params;
  const { courseId } = params;

  return (
    <Suspense fallback={<Loader />}>
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    </Suspense>
  );
}
