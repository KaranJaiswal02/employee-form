"use client";
import GratuityForm1 from '@/components/gratuityForm/GratuityForm1'
import GratuityForm2 from '@/components/gratuityForm/GratuityForm2'
import { empFormData, grauFormData } from '@/hooks/Atoms';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Page() {
    const [formData, setFormData] = useAtom(grauFormData);
    const [empFormData1] = useAtom(empFormData);
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            name: empFormData1.name
        }))
    },[])
    return (
        <div className='w-full px-auto py-5'>
            <div className="bg-white text-black p-8 max-w-4xl mx-auto text-sm border border-gray-400 rounded-md">
                <GratuityForm1 />
                <GratuityForm2 />
            </div>
        </div>
    )
}
