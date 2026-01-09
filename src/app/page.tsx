// app/page.tsx
import { MainLayout } from '@/components/Layouts';
import Home from '@/pages/Home';

export default function HomePage() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}