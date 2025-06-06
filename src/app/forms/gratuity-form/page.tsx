"use client";
import GratuityForm1 from '@/components/gratuityForm/GratuityForm1';
import GratuityForm2 from '@/components/gratuityForm/GratuityForm2';
import { empFormData, formStatusus, grauFormData, nominationForm1Data } from '@/hooks/Atoms';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import IError from '@/types/error';

export default function MyPage() {
  const router = useRouter();
  const [formData, setFormData] = useAtom(grauFormData);
  const [empFormData1] = useAtom(empFormData);
  const [nominationform1] = useAtom(nominationForm1Data);
  const [, setFormStatus] = useAtom(formStatusus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setId(searchParams.get('id'));
    setFormData(prev => ({
      ...prev,
      name: empFormData1.name || "",
      department: empFormData1.department || "",
      marriagestatus: nominationform1.maritalStatus || "",
    }));
  }, [empFormData1, nominationform1, setFormData, searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // console.log(formData);
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
    <form onSubmit={handleSubmit} className='p-6 max-w-4xl mx-auto bg-white dark:bg-card border shadow-md rounded-lg'>
      <GratuityForm1 />
      <GratuityForm2 />
      {errors.length > 0 && (
        <div className="text-red-600 text-sm px-2 text-left">
          {errors.map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <Button type="submit" disabled={isSubmitting} className='w-full'>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}