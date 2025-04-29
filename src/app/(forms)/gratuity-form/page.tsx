"use client";
import GratuityForm1 from '@/components/gratuityForm/GratuityForm1'
import GratuityForm2 from '@/components/gratuityForm/GratuityForm2'
import { empFormData, formStatusus, grauFormData, nominationForm1Data } from '@/hooks/Atoms';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


export default function Page() {
    const router = useRouter()
    const [formData, setFormData] = useAtom(grauFormData);
    const [empFormData1] = useAtom(empFormData);
    const [nominationform1] = useAtom(nominationForm1Data);
    const [_, setFormStatus] = useAtom(formStatusus);
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            name: empFormData1.name || "",
            department: empFormData1.department || "",
            marriagestatus: nominationform1.maritalStatus || "",
            
        }))
    }, [])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        // Dummy DB call simulation
        // Replace this with actual form submission logic
        const dummyDBCall = () => true
        if (dummyDBCall()) {
            router.push('/gratuity-form2')
        } else {
            alert('Form Submission Failed!')
        }
    }
    return (
        <form onSubmit={handleSubmit} className='p-6 max-w-4xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg'>
            <GratuityForm1 />
            <GratuityForm2 />
            <div className="flex justify-center mt-6">
                <Button type="submit" className='w-full'>Submit</Button>
            </div>
        </form>
    )
}
