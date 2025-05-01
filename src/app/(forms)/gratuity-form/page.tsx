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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        const response = await fetch("/api/gratuity-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if(response.status === 201) {
          setFormStatus((prevStatus) => ({
            ...prevStatus,
            form5: {
                ...prevStatus.form5,
                status: "done",
            },
        }));
          router.push("/nomination-declaration-form2");
        }
        else {
          const responseData = await response.json();
          alert(responseData.message);
        }
      };

    
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
