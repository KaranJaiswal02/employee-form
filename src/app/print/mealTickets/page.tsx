'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MealTicketData {
    names: string[];
    month: string;
    year: string;
    fromDay: number;
    toDay: number;
}

const LOCAL_STORAGE_KEY = 'printFormData';

export default function MealTicketPrintPage() {
    const [data, setData] = useState<MealTicketData | null>(null);
    const router = useRouter();

    useEffect(() => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (!stored) throw new Error('Missing data');

            const { formKey, formData, timestamp } = JSON.parse(stored);

            const isRecent = Date.now() - timestamp < 5000;
            if (formKey !== 'mealTickets' || !isRecent) throw new Error('Invalid or expired data');

            setData(formData);

            const printTimeout = setTimeout(() => {
                window.print();
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                window.close();
            }, 1000);

            return () => clearTimeout(printTimeout);
        } catch (err) {
            alert('Unauthorized or expired access.');
            router.replace('/not-found');
        }
    }, [router]);

    if (!data) return <div>Loading...</div>;

    const { names, month, year, fromDay, toDay } = data;

    return (
        <div className="w-full dark">
            <div className="print:hidden h-screen text-xl md:text-3xl xl:text-5xl flex justify-center items-end bg-card text-white p-4 font-bold font-mono">
                Meal Tickets for {names.length < 2 ? names[0] : `${names.length} People`} - {month} {year}
            </div>
            {names.map((name, index) => (
                <div key={index}>
                    <div className="hidden print:grid grid-cols-4 gap-3 p-4 mx-auto">
                        {Array.from({ length: toDay - fromDay + 1 }, (_, i) => {
                            const ticketNo = fromDay + i;
                            return (
                                <div
                                    key={ticketNo}
                                    className="w-40 h-27 border border-gray-300 rounded-md bg-white shadow-sm p-2 flex flex-col justify-between relative break-inside-avoid"
                                >
                                    <div className="absolute top-1 right-2 text-sm font-semibold">#{ticketNo}</div>
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
                            )
                        })}
                    </div>
                    {index + 1 < names.length && <div className="page-break"></div>}
                </div>
            ))}
        </div>
    );
}
