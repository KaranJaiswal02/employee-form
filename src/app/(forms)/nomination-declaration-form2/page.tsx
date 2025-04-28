"use client";
import Nomination1 from '@/components/nominationrevisedform/Nomination1';
import Nomination2 from '@/components/nominationrevisedform/Nomination2';
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { nominationForm2Data } from '@/hooks/Atoms';

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useAtom(nominationForm2Data);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log(formData)
            // Dummy DB call simulation
            // Replace this with actual form submission logic
            const dummyDBCall = () => true
            if (dummyDBCall()) {
                router.push('/thank-you')
            } else {
                alert('Form Submission Failed!')
            }
        }

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