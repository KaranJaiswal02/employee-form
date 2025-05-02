"use client";
import GratuityForm1 from '@/components/gratuityForm/GratuityForm1'
import GratuityForm2 from '@/components/gratuityForm/GratuityForm2'
import { empFormData, formStatusus, grauFormData, nominationForm1Data } from '@/hooks/Atoms';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


export default function Page() {
  const router = useRouter()
  const [formData, setFormData] = useAtom(grauFormData);
  const [empFormData1] = useAtom(empFormData);
  const [nominationform1] = useAtom(nominationForm1Data);
  const [, setFormStatus] = useAtom(formStatusus);
  const searchParams = useSearchParams()

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: empFormData1.name || "",
      department: empFormData1.department || "",
      marriagestatus: nominationform1.maritalStatus || "",
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = searchParams.get('id')
    console.log(formData);
    const response = await fetch("/api/forms/gratuity-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
        "userId": id as string,
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    if (responseData.success) {
      setFormStatus((prevStatus) => ({
        ...prevStatus,
        gratuity_form: {
          ...prevStatus.gratuity_form,
          status: "done",
        },
      }));
      toast.success(responseData.message);
      const params = id ? `?id=${id}` : '';
      router.push(`/forms/nomination-declaration-form2${params}`);
    }
    else {
      toast.error(responseData.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-6 max-w-4xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg'>
      <GratuityForm1 />
      <GratuityForm2 />
      <div className="flex justify-center mt-6">
        <Button type="submit" className='w-full'>Submit</Button>
      </div>
    </form>
  )
}
