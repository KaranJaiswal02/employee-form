"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { bankMandateFormData, empFormData, formStatusus } from '@/hooks/Atoms';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import BankMandateForm from '@/components/bankMandateForm/BankMandateForm';
import IError from '@/types/error';

export default function BankMandate() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [id, setId] = useState<string | null>(null);
    const [formData, setFormData] = useAtom(bankMandateFormData);
    const [formData1] = useAtom(empFormData);
    const [, setFormStatus] = useAtom(formStatusus);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        setId(searchParams.get('id'));
        setFormData((prev) => ({
            ...prev,
            name: formData1.name || formData.name,
            address: formData1.perAddress || formData.address,
        }));
    }, [setFormData, formData1, searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // console.log(formData);
            const response = await fetch("/api/forms/bank-mandate", {
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
                    bank_mandate: {
                        ...prevStatus.bank_mandate,
                        status: "done",
                    },
                }));
                toast.success(responseData.message);
                const params = id ? `?id=${id}` : '';
                router.push(`/forms/nomination-declaration-form1${params}`);
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
        <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white dark:bg-card border shadow-md rounded-lg">
            <BankMandateForm />

            <div className="text-right font-bold mt-6 mb-4">SIGNATURE</div>
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