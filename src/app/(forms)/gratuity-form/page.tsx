import GratuityForm1 from '@/components/gratuityForm/GratuityForm1'
import GratuityForm2 from '@/components/gratuityForm/GratuityForm2'
import React from 'react'

export default function Page() {
    return (
        <div className='w-full px-auto py-5'>
            <div className="bg-white text-black p-8 max-w-4xl mx-auto text-sm border border-gray-400 rounded-md">
                <GratuityForm1 />
                <GratuityForm2 />
            </div>
        </div>
    )
}
