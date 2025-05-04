"use client";
import BankMandateForm from '@/components/bankMandateForm/BankMandateForm';
import { bankMandateFormData } from '@/hooks/Atoms';
import { DefaultBankMandateFormData } from '@/hooks/defaultValue';
import { BankMandateFormData } from '@/models/forms/bank-mandate';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export default function BankMandate({ data = DefaultBankMandateFormData }: { data?: BankMandateFormData }) {
    const [, setFormData] = useAtom(bankMandateFormData);

    useEffect(() => {
        setFormData(data);
    }, [data, setFormData]);

    return (
        <>
            <div className='print:hidden h-screen text-xl md:text-5xl flex justify-center items-end bg-white dark:bg-card text-black dark:text-white p-4 font-bold font-mono'>
                Bank Mandate Form
            </div>
            <div className="hidden print:block force-light p-6 max-w-4xl mx-auto bg-white text-black">
                <BankMandateForm />
                <div className="print:hidden flex justify-end mt-4">
                </div>
            </div >
        </>
    );
}