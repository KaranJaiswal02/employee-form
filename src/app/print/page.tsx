"use client"
import BankMandate from '@/components/print/BankMandate'
import GratuityForm from '@/components/print/GratuityForm'
import IdcardForm from '@/components/print/IdcardForm'
import NominationForm1 from '@/components/print/NominationForm1'
import NominationForm2 from '@/components/print/NominationForm2'
import StaffFamily from '@/components/print/StaffFamily'
import StaffJoining from '@/components/print/StaffJoining'
import React from 'react'

export default function page() {

    const handlePrint = () => {
        window.print();
    }

    return (
        <div>
            <BankMandate />
            {/* <GratuityForm />
            <IdcardForm />
            <NominationForm1 />
            <NominationForm2 />
            <StaffFamily />
            <StaffJoining /> */}
            <div className="print:hidden flex justify-center mt-4">
                <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded">Print</button>
            </div>
        </div>
    )
}
