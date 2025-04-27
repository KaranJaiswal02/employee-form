"use client";
import EmpForm1 from '@/components/empJoinForm/EmpForm1'
import EmpForm2 from '@/components/empJoinForm/EmpForm2'
import EmpForm3 from '@/components/empJoinForm/EmpForm3'
import EmpForm4 from '@/components/empJoinForm/EmpForm4'
import EmpForm5 from '@/components/empJoinForm/EmpForm5'
import { Button } from '@/components/ui/button';
import { empFormData } from '@/hooks/Atoms'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function page() {
  const [fromData] = useAtom(empFormData);
  const router = useRouter();

  const dummyDBCall = () => true;

  const submitEmpDataForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(fromData);
    if (dummyDBCall()) {
      router.push("/idcard-form")
    }

    else {
      alert("Form Submission Failed!");
    }
  }
  return (
    <form onSubmit={submitEmpDataForm} className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg">
      <EmpForm1 />
      <div className="h-[2px] w-3/4 bg-gray-600 mx-auto my-8"></div>
      <EmpForm2 />
      <div className="h-[2px] w-3/4 bg-gray-600 mx-auto my-8"></div>
      <EmpForm3 />
      <div className="h-[2px] w-3/4 bg-gray-600 mx-auto my-8"></div>
      <EmpForm4 />
      <div className="h-[2px] w-3/4 bg-gray-600 mx-auto my-8"></div>
      <EmpForm5 />
      <Button type='submit' className="mt-6 w-full">Submit</Button>
    </form>
  )
}
