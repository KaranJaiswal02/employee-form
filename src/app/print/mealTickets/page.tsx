'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MealTicketPrintPage() {
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('printFormData');
        if (!stored) {
            alert('Unauthorized access.');
            router.replace('/');
            return;
        }

        const parsed = JSON.parse(stored);
        const { formKey, formData, timestamp } = parsed;

        const isRecent = Date.now() - timestamp < 5000;
        if (formKey !== 'mealTickets' || !isRecent) {
            alert('Unauthorized or expired access.');
            router.replace('/');
            return;
        }

        setData(formData);

        setTimeout(() => {
            window.print();
            window.close();
        }, 500);
    }, [router]);

    if (!data) return <div>Loading...</div>;

    const { name, month, year, noOfDays } = data;

    return (
        <div>
            <div className='print:hidden h-screen text-xl md:text-3xl xl:text-5xl flex justify-center items-end bg-white dark:bg-card text-black dark:text-white p-4 font-bold font-mono'>
                Meal Tickets for {name} - {month} {year}
            </div>
            <div className="hidden print:grid grid-cols-4 gap-3 p-4">
                {Array.from({ length: noOfDays }).map((_, index) => (
                    <div
                        key={index}
                        className="w-40 h-27 border border-gray-300 rounded-md bg-white shadow-sm p-2 flex flex-col justify-between relative break-inside-avoid"
                    >
                        <div className="absolute top-1 right-2 text-sm font-semibold">#{index + 1}</div>
                        <div className="flex justify-center h-12">
                            <img
                                src="/assets/images/SL India Software Center copy.png"
                                alt="Logo"
                                className="w-40 object-contain"
                            />
                        </div>
                        <div className="text-center text-xs font-semibold text-gray-800 my-1">{name}</div>
                        <div className="text-center text-xs text-gray-600">{month} {year}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
