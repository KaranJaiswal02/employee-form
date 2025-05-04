"use client";
import NominationDeclarationForm1 from '@/components/nominationDeclarationForm1/NominationDeclarationForm1';
import { DefaultNominationForm1Data } from '@/hooks/defaultValue';
import { NominationForm1Model } from '@/models/forms/nomination-form1';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { nominationForm1Data } from '@/hooks/Atoms';

export default function NominationForm1({ data = DefaultNominationForm1Data }: { data?: NominationForm1Model }) {
  const [, setFormData] = useAtom(nominationForm1Data);

  useEffect(() => {
    setFormData(data);
  }, [data, setFormData]);

  return (
    <>
      <div className='print:hidden h-screen text-5xl flex justify-center items-end bg-white dark:bg-card text-black dark:text-white p-4 font-bold font-mono'>
        Nomination & Declaration Form1
      </div>
      <div className="hidden print:block force-light p-6 max-w-5xl mx-auto bg-white">
        <NominationDeclarationForm1 />
      </div>
    </>
  )
}
