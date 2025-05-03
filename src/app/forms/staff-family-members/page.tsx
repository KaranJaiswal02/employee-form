"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { empFormData, formStatusus, staffFamilyFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { toast } from "sonner";
import StaffFamilyMembers from "@/components/staffFamilyMembers/StaffFamilyMembers";
import { calculateAge } from "@/lib/calculateAge";

type Child = {
    name: string;
    gender: string;
    dob: string;
};

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useAtom(staffFamilyFormData);
    const [form1data] = useAtom(empFormData);
    const [, setFormStatus] = useAtom(formStatusus);
    const searchParams = useSearchParams()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            name: form1data.name || "",
            dob: form1data.dob || "",
            department: form1data.department || "",
            age: calculateAge(form1data.dob) || 0,
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const id = searchParams.get('id')
        console.log(formData);
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
        setIsSubmitting(false);
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
                <Button type='submit' disabled={isSubmitting} className="mt-6 w-full cursor-pointer">Submit
                {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}