"use client";
import EmpForm1 from '@/components/empJoinForm/EmpForm1'
import EmpForm2 from '@/components/empJoinForm/EmpForm2'
import EmpForm3 from '@/components/empJoinForm/EmpForm3'
import EmpForm4 from '@/components/empJoinForm/EmpForm4'
import EmpForm5 from '@/components/empJoinForm/EmpForm5'
import { DefaultEmpFormData } from '@/hooks/defaultValue'
import { IEmpFormData } from '@/models/forms/staffjoin_form'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { empFormData } from '@/hooks/Atoms'

export default function StaffJoining({ data = DefaultEmpFormData }: { data?: IEmpFormData }) {
  const [, setFormData] = useAtom(empFormData)

  useEffect(() => {
    setFormData(data);
  }, [data, setFormData]);

  return (
    <>
      <div className='print:hidden h-screen text-xl md:text-5xl flex justify-center items-end bg-white dark:bg-card text-black dark:text-white p-4 font-bold font-mono'>
        Staff Joining Form
      </div>
      <div className="hidden print:block force-light p-6 max-w-4xl mx-auto bg-white text-black">
        <EmpForm1 />
        <div className="print:hidden page-break h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
        <div className="page-break"></div>
        <EmpForm2 />
        <div className="print:hidden page-break h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
        <div className="page-break"></div>
        <EmpForm3 />
        <div className="print:hidden page-break h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
        <div className="page-break"></div>
        <EmpForm4 />
        <div className="print:hidden page-break h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
        <div className="page-break"></div>
        <EmpForm5 />
        <div className="print:hidden flex justify-end mt-4"></div>
      </div>
    </>
  )
}
