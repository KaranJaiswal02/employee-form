'use client'
import { use } from 'react'
import BankMandate from '@/components/print/BankMandate'
import GratuityForm from '@/components/print/GratuityForm'
import IdcardForm from '@/components/print/IdcardForm'
import NominationForm1 from '@/components/print/NominationForm1'
import NominationForm2 from '@/components/print/NominationForm2'
import StaffFamily from '@/components/print/StaffFamily'
import StaffJoining from '@/components/print/StaffJoining'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const formComponents: Record<string, any> = {
    bankMandateFormData: BankMandate,
    grauFormData: GratuityForm,
    idCardFormData: IdcardForm,
    nominationForm1Data: NominationForm1,
    nominationForm2Data: NominationForm2,
    staffFamilyFormData: StaffFamily,
    empFormData: StaffJoining,
}

export default function PrintFormPage({ params }: { params: Promise<{ form: string }> }) {
    const { form: formKey } = use(params)
    const [formData, setFormData] = useState<any>(null)
    const [layout, setLayout] = useState<'portrait' | 'landscape'>('portrait')
    const router = useRouter()

    const FormComponent = formComponents[formKey]

    useEffect(() => {
        const stored = localStorage.getItem('printFormData');
        if (!stored) {
            alert('Unauthorized access.');
            router.replace('/not-found');
            return;
        }

        const parsed = JSON.parse(stored);
        const { formKey: storedKey, formData, layout, timestamp } = parsed;

        const isRecent = Date.now() - timestamp < 5000;
        if (storedKey !== formKey || !isRecent) {
            alert('Unauthorized or expired access.');
            router.replace('/not-found');
            return;
        }

        setFormData(formData);
        setLayout(layout || 'portrait');

        setTimeout(() => {
            window.print();
            localStorage.removeItem('printFormData');
            window.close();
        }, 500);
    }, [formKey, router]);

    if (!FormComponent || !formData) return <div>Loading form...</div>

    return (
        <div>
            <style>{`
    @media print {
      @page {
        size: A4 ${layout}; /* layout can be 'portrait' or 'landscape' */
        margin: 5mm;
      }
    }
  `}</style>
            <FormComponent data={formData} />
        </div>
    )
}
