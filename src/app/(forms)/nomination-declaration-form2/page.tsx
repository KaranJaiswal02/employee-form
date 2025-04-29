"use client";
import Nomination1 from '@/components/nominationrevisedform/Nomination1';
import Nomination2 from '@/components/nominationrevisedform/Nomination2';
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { empFormData, formStatusus, nominationForm2Data } from '@/hooks/Atoms';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useAtom(nominationForm2Data);
    const [formData1] = useAtom(empFormData);
    const [formStatus, setFormStatus] = useAtom(formStatusus);

    useEffect(() => {
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
        console.log(formData);
        const response = await fetch("/api/nomination-declaration-form2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.status === 201) {
            setFormStatus((prevStatus) => ({
                ...prevStatus,
                form7: {
                    ...prevStatus.form7,
                    status: "done",
                },
            }));
            router.push("/thank-you");
        }
        else {
            const responseData = await response.json();
            alert(responseData.message);
        }
    };

    return (

        <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg">
            <Nomination1 />
            <Nomination2 />
            <div className="flex justify-center mt-6">
                <Button type="submit" className='w-full cursor-pointer'>Submit</Button>
            </div>
        </form>
    );
}