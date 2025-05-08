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
import { useEffect } from 'react'
import { toast } from "sonner"
import { useState } from 'react';
import IError from '@/types/error';

export default function MyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [formData] = useAtom(empFormData);
  const [, setFormStatus] = useAtom(formStatusus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setId(searchParams.get('id'));
  }, [searchParams]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
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
        toast.success(responseData.message);
        const params = id ? `?id=${id}` : '';
        router.push(`/forms/idcard-form${params}`);
      }
      else {
        toast.error(responseData.message);
        setErrors(responseData.errors);
      }
    } catch (err: unknown) {
      const error = err as IError;
      toast.error("Error submitting form", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitForm} className="p-6 max-w-4xl mx-auto bg-white dark:bg-card border shadow-md rounded-lg">
      <EmpForm1 />
      <div className="h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
      <EmpForm2 />
      <div className="h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
      <EmpForm3 />
      <div className="h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
      <EmpForm4 />
      <div className="h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
      <EmpForm5 />
      {errors.length > 0 && (
        <div className="text-red-600 text-sm px-2 text-left">
          {errors.map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </div>
      )}
      <Button type='submit' disabled={isSubmitting} className="mt-6 w-full cursor-pointer">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}
