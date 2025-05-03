"use client";
import BankMandateForm from '@/components/bankMandateForm/BankMandateForm';

export default function BankMandate() {

    return (
        <div className="force-light p-6 max-w-4xl mx-auto bg-white text-black">
            <BankMandateForm />
            <div className="print:hidden flex justify-end mt-4">
            </div>
        </div >
    );
}