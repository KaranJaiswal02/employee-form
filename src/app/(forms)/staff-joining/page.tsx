"use client";
import EmpForm1 from '@/components/empJoinForm/EmpForm1'
import EmpForm2 from '@/components/empJoinForm/EmpForm2'
import EmpForm3 from '@/components/empJoinForm/EmpForm3'
import EmpForm4 from '@/components/empJoinForm/EmpForm4'
import EmpForm5 from '@/components/empJoinForm/EmpForm5'
import { Button } from '@/components/ui/button';
import { empFormData, formStatusus } from '@/hooks/Atoms'
import { useAtom } from 'jotai'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

export default function page() {
  const [formData] = useAtom(empFormData);
  const [, setFormStatus] = useAtom(formStatusus);
  const router = useRouter();
  const searchParams = useSearchParams()

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = searchParams.get('id')
    console.log(formData);
    const response = await fetch("/api/forms/staff-joining", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
        "userid": id as string,
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    if (responseData.success) {
      setFormStatus((prevStatus) => ({
        ...prevStatus,
        staff_joining: {
          ...prevStatus.staff_joining,
          status: "done",
        },
      }));
      const params = id ? `?id=${id}` : '';
      router.push(`/idcard-form${params}`);
    }
    else {
      
      alert(responseData.message);
    }
  };

  return (
    <form onSubmit={submitForm} className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg">
      <EmpForm1 />
      <div className="h-[2px] w-3/4 bg-gray-600 mx-auto my-8"></div>
      <EmpForm2 />
      <div className="h-[2px] w-3/4 bg-gray-600 mx-auto my-8"></div>
      <EmpForm3 />
      <div className="h-[2px] w-3/4 bg-gray-600 mx-auto my-8"></div>
      <EmpForm4 />
      <div className="h-[2px] w-3/4 bg-gray-600 mx-auto my-8"></div>
      <EmpForm5 />
      <Button type='submit' className="mt-6 w-full cursor-pointer">Submit</Button>
    </form>
  )
}
