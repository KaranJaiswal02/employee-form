"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

export default function Page() {
    const router = useRouter();
    useEffect(() => {
        router.push('/admin/dashboard')
    }, [router])
    return (
        <div className='flex text-5xl items-center justify-center h-screen'>
            Loading
        </div>
    )
}
