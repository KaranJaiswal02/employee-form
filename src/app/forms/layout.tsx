"use client";
import { bankMandateFormData, empFormData, formStatusus, grauFormData, idCardFormData, nominationForm1Data, nominationForm2Data, staffFamilyFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";

export default function FormLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const [formStatus, setFormStatus] = useAtom(formStatusus);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paramsData, setParamsData] = useState<string>("");

    //all forms
    const [, setbankMandateFormData] = useAtom(bankMandateFormData);
    const [, setGrauFormData] = useAtom(grauFormData);
    const [, setIdCardFormData] = useAtom(idCardFormData);
    const [, setNominstionForm1Data] = useAtom(nominationForm1Data);
    const [, setNominstionForm2Data] = useAtom(nominationForm2Data);
    const [, setStaffFamilyFormData] = useAtom(staffFamilyFormData);
    const [, setEmpFormData] = useAtom(empFormData);

    const setFormsData = (data: any) => {
        const formMappings: { key: string; setter: (data: any) => void; statusKey: keyof typeof formStatus }[] = [
            { key: 'bankMandateFormData', setter: setbankMandateFormData, statusKey: 'bank_mandate' },
            { key: 'grauFormData', setter: setGrauFormData, statusKey: 'gratuity_form' },
            { key: 'idCardFormData', setter: setIdCardFormData, statusKey: 'id_card' },
            { key: 'nominationForm1Data', setter: setNominstionForm1Data, statusKey: 'nomination_declaration_form1' },
            { key: 'nominationForm2Data', setter: setNominstionForm2Data, statusKey: 'nomination_declaration_form2' },
            { key: 'staffFamilyFormData', setter: setStaffFamilyFormData, statusKey: 'staff_family_members' },
            { key: 'empFormData', setter: setEmpFormData, statusKey: 'staff_joining' },
        ];

        formMappings.forEach(({ key, setter, statusKey }) => {
            if (data[key]) {
                setter(data[key]);
                setFormStatus((prev) => ({
                    ...prev,
                    [statusKey]: {
                        ...prev[statusKey],
                        status: 'done',
                    },
                }));
            }
        });
    };

    const init = async () => {
        setIsLoading(true);
        if (typeof window !== "undefined") {
            const isDark = document.documentElement.classList.contains("dark");
            setIsDarkMode(isDark);
        }
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/sign-in');
        }
        await fetchFormData(token as string);
        setIsLoading(false);
    }

    useEffect(() => {
        init();
    }, [router, isDarkMode]);

    const toggleDarkMode = () => {
        if (typeof window !== "undefined") {
            document.documentElement.classList.toggle("dark");
            setIsDarkMode((prev) => !prev);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/sign-in');
    };

    const fetchFormData = async (token: string) => {
        const id = searchParams.get('id')
        setParamsData(id ? `?id=${id}` : '');
        try {
            const response = await fetch('/api/forms/all-forms', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                    'userid': id as string,
                },
            });
            const data = await response.json();
            if (data.success) {
                setFormsData(data.data.forms);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log("Error fetching form data:", error);
        }
    };

    return (
        <>
            {isLoading ?
                (<div className="w-full h-screen flex items-center justify-center">
                    <span className="inline-block md:w-36 w-16 md:h-36 h-16 border-[1rem] border-gray-600 border-b-transparent rounded-full animate-spin dark:border-white dark:border-b-transparent"></span>
                </div>) : (<div className="flex">
                    <aside className="fixed top-0 left-0 w-80 h-screen bg-white dark:bg-gray-950 shadow-md border-r border-gray-200 dark:border-gray-800 py-6 px-3 flex flex-col justify-between overflow-auto">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white px-2 mb-6 tracking-tight">
                                📋 Form Progress
                            </h2>
                            <ul className="flex flex-col space-y-2">
                                {Object.entries(formStatus).map(([key, form]) => {
                                    const isActive = pathname === `/forms${form.url}`;
                                    return (
                                        <li key={key}>
                                            <Link
                                                href={`/forms${form.url}${paramsData}`}
                                                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 
                                            ${isActive
                                                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                                                        : form.status === "done"
                                                            ? "bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
                                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    }`}
                                            >
                                                <span className={`text-2xl ${form.status === "done"
                                                    ? "text-green-500 dark:text-green-400"
                                                    : "text-gray-400 dark:text-gray-500"
                                                    }`}>
                                                    {form.status === "done" ? <IoCheckmarkDoneCircleOutline /> : <MdOutlinePending color="orange" />}
                                                </span>
                                                <span className={`truncate ${isActive ? "font-semibold" : "font-medium"}`}>
                                                    {form.name}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Bottom section */}
                        <div className="mt-6 space-y-4">
                            {/* Dark Mode Toggle */}
                            <div onClick={toggleDarkMode} className="flex items-center justify-center space-x-3 cursor-pointer">
                                <button
                                    className="relative inline-flex items-center w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-200"
                                >
                                    <span
                                        className={`inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-200 ${isDarkMode ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    ></span>
                                </button>
                                <span className="text-gray-800 dark:text-gray-200 font-medium">
                                    {isDarkMode ? <FaRegMoon /> : <FiSun />}
                                </span>
                                <span className="text-gray-800 dark:text-gray-200 font-medium">
                                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                                </span>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </aside>

                    <main className="flex-1 ml-80 px-4 py-4 min-h-screen space-y-20">
                        {children}
                    </main>
                </div>)}
        </>
    );
}
