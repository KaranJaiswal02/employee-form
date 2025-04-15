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
  const [empFormData1, setEmpFormData1] = useAtom(empFormData);
  const router = useRouter();

  const dummyDBCall = () => true;

  const submitEmpDataForm = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dummyDBCall()) {
      router.push("/gratuity-form")
    }
    else {
      alert("Form Submission Failed!");
    }
  }
  return (
    <form onSubmit={submitEmpDataForm} className="p-6 max-w-4xl mx-auto my-10 bg-white shadow-md rounded-lg">
        <EmpForm1 />
        <EmpForm2 />
        <EmpForm3 />
        <EmpForm4 />
        <EmpForm5 />
        <Button type='submit' className="mt-6 w-full">Submit</Button>
    </form>
  )
}
