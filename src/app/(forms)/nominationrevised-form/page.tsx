"use client";
import Nomination1 from '@/components/nominationrevisedform/Nomination1'
import Nomination2 from '@/components/nominationrevisedform/Nomination2'

import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React , {useEffect} from "react";
import { nominationFormData } from "@/hooks/Atoms";
import { empFormData, grauFormData } from '@/hooks/Atoms';

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
                <Nomination1 />
                <Nomination2 />
            </div>
        </div>
    )
}
