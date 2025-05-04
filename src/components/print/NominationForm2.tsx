"use client";
import Nomination1 from '@/components/nominationrevisedform/Nomination1';
import Nomination2 from '@/components/nominationrevisedform/Nomination2';
import { DefaultNominationForm2Data } from '@/hooks/defaultValue';
import { NominationForm2Model } from '@/models/forms/nomination-form2';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { nominationForm2Data } from '@/hooks/Atoms';

export default function NominationForm2({ data = DefaultNominationForm2Data }: { data?: NominationForm2Model }) {
    const [, setFormData] = useAtom(nominationForm2Data);

    useEffect(() => {
        setFormData(data);
    }, [data, setFormData]);
    return (
        <>
            <div className='print:hidden h-screen text-xl md:text-5xl flex justify-center items-end bg-white dark:bg-card text-black dark:text-white p-4 font-bold font-mono'>
                Nomination & Declaration Form2
            </div>
            <div className="hidden print:block force-light p-6 max-w-5xl mx-auto bg-white">
                <Nomination1 />
                <Nomination2 />
            </div>
        </>
    );
}