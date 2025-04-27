"use client";
import Nomination1 from '@/components/nominationrevisedform/Nomination1';
import Nomination2 from '@/components/nominationrevisedform/Nomination2';
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { bankMandateFormData, nominationForm1Data, nominationForm2Data } from "@/hooks/Atoms";
import { empFormData, grauFormData } from '@/hooks/Atoms';

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useAtom(grauFormData);
    const [empFormData1] = useAtom(empFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nominationForm1] = useAtom(nominationForm1Data);
    const [bankMandateForm] = useAtom(bankMandateFormData);


    // Initialize form data with employee name
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            //name: empFormData1.name || '',
            dob: empFormData1.dob || '',
            marriagestatus: nominationForm1.maritalStatus || '',
            accountNo: bankMandateForm.accountNumber || '',
            
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null); // Reset error state
        console.log(formData);
        // dummy db call simulation
        const dummyDBCall = () => {
            // Simulate a successful submission
            return true;
        }
        try {
            if (dummyDBCall()) {
                router.push('/thank-you');
            } else {
                throw new Error("Form Submission Failed!");
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 md:p-8 border border-black bg-white text-sm">
            <Nomination1 />
            <Nomination2 />
            <div className="flex justify-center mt-6">
                <Button type="submit" className='w-full cursor-pointer'>Submit</Button>
            </div>
        </form>
    );
}