"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { empFormData, formStatusus, idCardFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { toast } from "sonner";
import IdCardForm from "@/components/idCardForm/IdCardForm";
import IError from "@/types/error";

export default function IDCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [formData, setFormData] = useAtom(idCardFormData);
  const [empFormData1] = useAtom(empFormData);
  const [, setFormStatus] = useAtom(formStatusus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setId(searchParams.get('id'));
    setFormData((prev) => ({
      ...prev,
      name: empFormData1.name || "",
      fatherName: empFormData1.fatherName || "",
      designation: empFormData1.designation || "",
      dob: empFormData1.dob || "",
      photo: empFormData1.photo || "",
    }));
  }, [empFormData1, setFormData, searchParams]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(formData);
      const response = await fetch("/api/forms/idcard-form", {
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
          id_card: {
            ...prevStatus.id_card,
            status: "done",
          },
        }));
        toast.success(responseData.message);
        const params = id ? `?id=${id}` : '';
        router.push(`/forms/staff-family-members${params}`);
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
    <form
      onSubmit={submitForm}
      className="p-6 max-w-2xl min-w-lg mx-auto bg-white dark:bg-card border shadow-md rounded-lg"
    >
      <IdCardForm />

      {errors.length > 0 && (
        <div className="text-red-600 text-sm px-2 text-left">
          {errors.map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}