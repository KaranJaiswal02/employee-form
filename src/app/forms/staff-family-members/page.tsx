"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { empFormData, formStatusus, staffFamilyFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { toast } from "sonner";
import StaffFamilyMembers from "@/components/staffFamilyMembers/StaffFamilyMembers";
import { calculateAge } from "@/lib/calculateAge";
import IError from "@/types/error";

export default function MyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [id, setId] = useState<string | null>(null);
    const [formData, setFormData] = useAtom(staffFamilyFormData);
    const [form1data] = useAtom(empFormData);
    const [, setFormStatus] = useAtom(formStatusus);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        setId(searchParams.get('id'));
        setFormData((prev) => ({
            ...prev,
            name: form1data.name || formData.name,
            dob: form1data.dob || formData.dob,
            department: form1data.department || formData.department,
            age: calculateAge(form1data.dob?.toString().split('T')[0] ?? '') || 0,
        }));
    }, [form1data, setFormData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // console.log(formData);
            const response = await fetch("/api/forms/staff-family-members", {
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
                    staff_family_members: {
                        ...prevStatus.staff_family_members,
                        status: "done",
                    },
                }));
                toast.success(responseData.message);
                const params = id ? `?id=${id}` : '';
                router.push(`/forms/bank-mandate${params}`);
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
            <StaffFamilyMembers />
            {errors.length > 0 && (
                <div className="text-red-600 text-sm px-2 text-left">
                    {errors.map((err, index) => (
                        <div key={index}>{err}</div>
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-2">
                <Button type='submit' disabled={isSubmitting} className="mt-6 w-full cursor-pointer">
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}