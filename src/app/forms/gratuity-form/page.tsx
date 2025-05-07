import GratuityForm from '@/components/forms/GratuityForm';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <GratuityForm />
    </Suspense>
  );
}