"use client";
import GratuityForm1 from '@/components/gratuityForm/GratuityForm1'
import GratuityForm2 from '@/components/gratuityForm/GratuityForm2'
import { DefaultGrauFormData } from '@/hooks/defaultValue'
import { IGratuityForm } from '@/models/forms/gratuity-form'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { grauFormData } from '@/hooks/Atoms'

export default function GratuityForm({ data = DefaultGrauFormData }: { data?: IGratuityForm }) {
  const [, setFormData] = useAtom(grauFormData)

  useEffect(() => {
    setFormData(data);
  }, [data, setFormData]);

  return (
    <>
      <div className='print:hidden h-screen text-xl md:text-5xl flex justify-center items-end bg-white dark:bg-card text-black dark:text-white p-4 font-bold font-mono'>
        Gratuity Form
      </div>

      <div className="hidden print:block force-light p-6 max-w-4xl mx-auto bg-white">
        <GratuityForm1 />
        <GratuityForm2 />
      </div>
    </>
  )
}
