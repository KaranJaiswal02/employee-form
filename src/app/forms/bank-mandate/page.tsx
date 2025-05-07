import { Suspense } from 'react';
import BankMandate from '@/components/forms/BankMandate';

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BankMandate />
        </Suspense>
    );
}