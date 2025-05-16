'use client'

import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import {
    DefaultBankMandateFormData,
    DefaultEmpFormData,
    DefaultGrauFormData,
    DefaultIdCardFormData,
    DefaultNominationForm1Data,
    DefaultNominationForm2Data,
    DefaultStaffFamilyFormData,
} from '@/hooks/defaultValue'
import IError from '@/types/error'
import { FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { toast } from 'sonner'

const formButtons = [
    { key: 'bankMandateFormData', label: 'Bank Mandate Form', data: DefaultBankMandateFormData, layout: 'portrait' },
    { key: 'grauFormData', label: 'Gratuity Form', data: DefaultGrauFormData, layout: 'portrait' },
    { key: 'idCardFormData', label: 'ID Card Form', data: DefaultIdCardFormData, layout: 'portrait' },
    { key: 'nominationForm1Data', label: 'Nomination Form 1', data: DefaultNominationForm1Data, layout: 'portrait' },
    { key: 'nominationForm2Data', label: 'Nomination Form 2', data: DefaultNominationForm2Data, layout: 'portrait' },
    { key: 'staffFamilyFormData', label: 'Staff Family Form', data: DefaultStaffFamilyFormData, layout: 'landscape' },
    { key: 'empFormData', label: 'Staff Joining Form', data: DefaultEmpFormData, layout: 'portrait' },
]

export default function DownloadBlankFormsPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleOpenAndPrint = (formKey: string, data: object, layout: string) => {
        const payload = {
            formKey,
            formData: data,
            layout,
            timestamp: Date.now(),
        }
        localStorage.setItem('printFormData', JSON.stringify(payload))
        const url = `/print/${formKey}`
        const printWindow = window.open(url, '_blank')
        if (printWindow) printWindow.focus()
    }

    const verifyToken = async (token: string) => {
        try {
            const res = await fetch("/api/user/verify-token", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                if (data.data.role !== "admin") {
                    toast.error("Unauthorized access", {
                        description: "You do not have permission to access this page",
                    });
                    router.push("/home");
                }
                setLoading(false);
            } else if (!data.success) {
                localStorage.removeItem("token");
                toast.error("Token expired", {
                    description: "Please sign in again",
                });
                router.push("/sign-in");
            }
        } catch (err: unknown) {
            const error = err as IError;
            localStorage.removeItem("token");
            toast.error("Error verifying token", {
                description: error.message || "An error occurred",
            });
            router.push("/sign-in");
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isDark = document.documentElement.classList.contains("dark");
            setIsDarkMode(isDark);
        }
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/sign-in");
            return;
        }
        verifyToken(token as string);
    }, []);

    const toggleDarkMode = () => {
        if (typeof window !== "undefined") {
            document.documentElement.classList.toggle("dark");
            setIsDarkMode((prev) => !prev);
        }
    };

    return (
        <div className="h-screen px-6 py-10">
            <div className="max-w-4xl mx-auto text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
                    Download Blank Templates
                </h1>
                <p className="text-muted-foreground text-lg">
                    Quickly generate and print ready-to-fill employee form templates with just a click.
                </p>
            </div>
            <button
                onClick={toggleDarkMode}
                className="fixed top-6 right-6 p-3 rounded-full bg-white text-blue-600 dark:bg-gray-800 dark:text-yellow-400 shadow-md hover:scale-105 transition cursor-pointer"
                aria-label="Toggle Dark Mode"
            >
                {!isDarkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
            </button>

            {loading ?
                (
                    <div className="flex items-center justify-center h-2/3">
                        <Loader />
                    </div>
                ) :
                (<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {formButtons.map(({ key, label, data, layout }) => (
                        <div
                            key={key}
                            className="bg-card/60 border border-border backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-primary/10 rounded-full text-primary">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold">{label}</h3>
                            </div>
                            <Button
                                className="w-full text-sm font-medium cursor-pointer"
                                onClick={() => handleOpenAndPrint(key, data, layout)}
                            >
                                Open & Print
                            </Button>
                        </div>
                    ))}
                </div>)}
        </div>
    )
}
