"use client";
import Nomination1 from '@/components/nominationrevisedform/Nomination1';
import Nomination2 from '@/components/nominationrevisedform/Nomination2';
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { empFormData, formStatusus, nominationForm2Data } from '@/hooks/Atoms';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useAtom(nominationForm2Data);
    const [formData1] = useAtom(empFormData);
    const [, setFormStatus] = useAtom(formStatusus);
    const searchParams = useSearchParams()
    const [isSubmitting, setIsSubmitting] = useState(false);
        const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        console.log(formData.date)
        setFormData((prev) => ({
            ...prev,
            address: formData1.perAddress || "",
            accountNumber: formData1.accountNumber || "",
            fathersName: formData1.fatherName || "",
            dob: formData1.dob || "",
            firstName: formData1.name || "",
            surname: formData1.surname || "",
            middleName: formData1.middleName || "",
            maritalStatus: formData1.maritalStatus || "",
            sex: formData1.sex || "",
        }));
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const id = searchParams.get('id')
        console.log(formData);
        const response = await fetch("/api/forms/nomination-declaration-form2", {
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
                nomination_declaration_form2: {
                    ...prevStatus.nomination_declaration_form2,
                    status: "done",
                },
            }));
            toast.success(responseData.message);
            const params = id ? `?id=${id}` : '';
            router.push(`/forms/thank-you${params}`);
        }
        else {
            toast.error(responseData.message);
            setErrors(responseData.errors);
        }
        setIsSubmitting(false);
    };

    return (

        <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white dark:bg-card border shadow-md rounded-lg">
            <Nomination1 />
            <Nomination2 />
            {errors.length > 0 && (
                <div className="text-red-600 text-sm px-2 text-left">
                    {errors.map((err, index) => (
                        <div key={index}>{err}</div>
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-6">
                <Button type="submit" disabled={isSubmitting} className='w-full cursor-pointer'>
                {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}