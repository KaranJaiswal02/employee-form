"use client";
import { bankMandateFormData, empFormData, formStatusus, grauFormData, idCardFormData, nominationForm1Data, nominationForm2Data, staffFamilyFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoCheckmarkDoneCircleOutline, IoMoon, IoSunny } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import Loader from "@/components/Loader";
import { IoIosArrowBack } from "react-icons/io";
import { DefaultBankMandateFormData, DefaultEmpFormData, DefaultGrauFormData, DefaultIdCardFormData, DefaultNominationForm1Data, DefaultNominationForm2Data, DefaultStaffFamilyFormData } from "@/hooks/defaultValue";
import { BankMandateFormData } from "@/models/forms/bank-mandate";
import { IGratuityForm } from "@/models/forms/gratuity-form";
import { IdCardFormData } from "@/models/forms/idcard-form";
import { NominationForm1Model } from "@/models/forms/nomination-form1";
import { NominationForm2Model } from "@/models/forms/nomination-form2";
import { StaffFamilyFormData } from "@/models/forms/staff-family-members";
import { IEmpFormData } from "@/models/forms/staffjoin_form";

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
    const [name, setName] = useState<string>("");
    const [currentUserRole, setCurrentUserRole] = useState("user");

    //all forms
    const [, setbankMandateFormData] = useAtom<BankMandateFormData>(bankMandateFormData);
    const [, setGrauFormData] = useAtom<IGratuityForm>(grauFormData);
    const [, setIdCardFormData] = useAtom<IdCardFormData>(idCardFormData);
    const [, setNominstionForm1Data] = useAtom<NominationForm1Model>(nominationForm1Data);
    const [, setNominstionForm2Data] = useAtom<NominationForm2Model>(nominationForm2Data);
    const [, setStaffFamilyFormData] = useAtom<StaffFamilyFormData>(staffFamilyFormData);
    const [, setEmpFormData] = useAtom<IEmpFormData>(empFormData);

    const setFormsData = (data: Partial<{
        bankMandateFormData: BankMandateFormData;
        grauFormData: IGratuityForm;
        idCardFormData: IdCardFormData;
        nominationForm1Data: NominationForm1Model;
        nominationForm2Data: NominationForm2Model;
        staffFamilyFormData: StaffFamilyFormData;
        empFormData: IEmpFormData;
    }>) => {
        if (data.bankMandateFormData) {
            setbankMandateFormData(data.bankMandateFormData);
            setFormStatus((prev) => ({
                ...prev,
                bank_mandate: { ...prev.bank_mandate, status: 'done' },
            }));
        } else {
            setbankMandateFormData(DefaultBankMandateFormData);
            setFormStatus((prev) => ({
                ...prev,
                bank_mandate: { ...prev.bank_mandate, status: 'pending' },
            }));
        }

        if (data.grauFormData) {
            setGrauFormData(data.grauFormData);
            setFormStatus((prev) => ({
                ...prev,
                gratuity_form: { ...prev.gratuity_form, status: 'done' },
            }));
        } else {
            setGrauFormData(DefaultGrauFormData);
            setFormStatus((prev) => ({
                ...prev,
                gratuity_form: { ...prev.gratuity_form, status: 'pending' },
            }));
        }

        if (data.idCardFormData) {
            setIdCardFormData(data.idCardFormData);
            setFormStatus((prev) => ({
                ...prev,
                id_card: { ...prev.id_card, status: 'done' },
            }));
        } else {
            setIdCardFormData(DefaultIdCardFormData);
            setFormStatus((prev) => ({
                ...prev,
                id_card: { ...prev.id_card, status: 'pending' },
            }));
        }

        if (data.nominationForm1Data) {
            setNominstionForm1Data(data.nominationForm1Data);
            setFormStatus((prev) => ({
                ...prev,
                nomination_declaration_form1: {
                    ...prev.nomination_declaration_form1,
                    status: 'done',
                },
            }));
        } else {
            setNominstionForm1Data(DefaultNominationForm1Data);
            setFormStatus((prev) => ({
                ...prev,
                nomination_declaration_form1: {
                    ...prev.nomination_declaration_form1,
                    status: 'pending',
                },
            }));
        }

        if (data.nominationForm2Data) {
            setNominstionForm2Data(data.nominationForm2Data);
            setFormStatus((prev) => ({
                ...prev,
                nomination_declaration_form2: {
                    ...prev.nomination_declaration_form2,
                    status: 'done',
                },
            }));
        } else {
            setNominstionForm2Data(DefaultNominationForm2Data);
            setFormStatus((prev) => ({
                ...prev,
                nomination_declaration_form2: {
                    ...prev.nomination_declaration_form2,
                    status: 'pending',
                },
            }));
        }

        if (data.staffFamilyFormData) {
            setStaffFamilyFormData(data.staffFamilyFormData);
            setFormStatus((prev) => ({
                ...prev,
                staff_family_members: {
                    ...prev.staff_family_members,
                    status: 'done',
                },
            }));
        } else {
            setStaffFamilyFormData(DefaultStaffFamilyFormData);
            setFormStatus((prev) => ({
                ...prev,
                staff_family_members: {
                    ...prev.staff_family_members,
                    status: 'pending',
                },
            }));
        }

        if (data.empFormData) {
            setEmpFormData(data.empFormData);
            setFormStatus((prev) => ({
                ...prev,
                staff_joining: {
                    ...prev.staff_joining,
                    status: 'done',
                },
            }));
        } else {
            setEmpFormData(DefaultEmpFormData);
            setFormStatus((prev) => ({
                ...prev,
                staff_joining: {
                    ...prev.staff_joining,
                    status: 'pending',
                },
            }));
        }
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
    }, []);

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
                setName(data.data?.name || "");
                console.log(data.data?.currentUserRole)
                setCurrentUserRole(data.data?.currentUserRole || "user");
                setFormsData(data.data.forms);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log("Error fetching form data:", error);
        }
    };

    return (
        <Suspense fallback={<Loader />}>
            <div className="flex">
                {isLoading ? (
                    <aside className="fixed top-0 left-0 w-80 h-screen bg-white dark:bg-card border shadow-md border-r border-gray-200 dark:border-gray-800 py-6 px-3 flex flex-col justify-between overflow-auto">
                        <div className="flex items-center justify-center h-full">
                            <Loader loaderClass="md:w-24 w-10 md:h-24 h-10" />
                        </div>
                    </aside>
                ) : (<aside className="fixed top-0 left-0 w-80 h-screen bg-white dark:bg-card border shadow-md border-r border-gray-200 dark:border-gray-800 py-6 px-3 flex flex-col justify-between overflow-auto">
                    <div>
                        <h2 className="text-2xl flex font-bold text-gray-900 dark:text-white px-2 mb-6 tracking-tight">
                            {currentUserRole === "admin" && (<Link href={paramsData ? "/admin/edit-employee-details" : "/admin/dashboard"} className="text-gray-800 dark:text-white hover:opacity-80">
                                <IoIosArrowBack size={32} className="p-1 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                            </Link>)}
                            <span>📋{name ? name : "Form Progress"}</span>
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
                                                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
                        <div onClick={toggleDarkMode} className="flex items-center justify-center space-x-3 pr-4 cursor-pointer">
                            {/* <button
                                    className="relative inline-flex items-center w-12 h-6 rounded-full bg-neutral-300 dark:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                                >
                                    <span
                                        className={`inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-200 ${isDarkMode ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    ></span>
                                </button> */}
                            <span className="text-gray-800 dark:text-gray-200 font-medium p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:opacity-80 transition duration-200">
                                {isDarkMode ? <IoMoon size={22} /> : <IoSunny size={22} />}
                            </span>
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                                {isDarkMode ? "Dark Mode" : "Light Mode"}
                            </span>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                        >
                            <FiLogOut className="text-xl" />
                            <span className="pr-4">Logout</span>
                        </button>
                    </div>
                </aside>)}

                <main className="flex-1 ml-80 px-4 py-4 min-h-screen space-y-20">
                    {isLoading ? (<Loader />) : (children)}
                </main>
            </div>
        </Suspense>
    );
}
