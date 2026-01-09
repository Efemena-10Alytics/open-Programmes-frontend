import { ProtectedRoute } from "@/components/utilities/ProtectedRoute";
import PaymentPage from "@/pages/Payments";

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function PaymentPageWrapper(props: PageProps) {
  const params = await props.params;
  const { courseId } = params;

  return;
  <ProtectedRoute>
    <PaymentPage />
  </ProtectedRoute>;
}
