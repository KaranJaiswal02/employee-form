"use client";
import NominationDeclarationForm1 from '@/components/nominationDeclarationForm1/NominationDeclarationForm1';
import { Button } from '@/components/ui/button'
import { empFormData, formStatusus, nominationForm1Data } from '@/hooks/Atoms';
import IError from '@/types/error';
import { useAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from "react";
import { toast } from 'sonner';

// interface Nominee {
//   name: string;
//   address: string;
//   relationship: string;
//   dob: string;
//   share: string;
//   guardian: string;
// }

function MyPage() {
  const router = useRouter()
  const [empFormData1] = useAtom(empFormData);
  const [, setFormStatus] = useAtom(formStatusus);
  const [formData, setFormData] = useAtom(nominationForm1Data);
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setId(searchParams.get('id'));
    setFormData((prev) => ({
      ...prev,
      name: empFormData1.name || "",
      fatherName: empFormData1.fatherName || "",
      dob: empFormData1.dob || "",
      currAddress: empFormData1.currAddress || "",
      perAddress: empFormData1.perAddress || "",
      maritalStatus: empFormData1.maritalStatus || "",
    }));
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(formData);
      const response = await fetch("/api/forms/nomination-declaration-form1", {
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
          nomination_declaration_form1: {
            ...prevStatus.nomination_declaration_form1,
            status: "done",
          },
        }));
        toast.success(responseData.message);
        const params = id ? `?id=${id}` : '';
        router.push(`/forms/gratuity-form${params}`);
      }
      else {
        toast.error(responseData.message);
        setErrors(responseData.errors);
      }
    } catch (err: unknown) {
      const error = err as IError;
      toast.error("Error submitting form", {
        description: error.message || "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto bg-white dark:bg-card border shadow-md rounded-lg">
      <NominationDeclarationForm1 />
      {errors.length > 0 && (
        <div className="text-red-600 text-sm px-2 text-left">
          {errors.map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </div>
      )}
      <Button type="submit" disabled={isSubmitting} className='w-full cursor-pointer'>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MyPage />
    </Suspense>
  );
}