"use client";
import { bankMandateFormData, empFormData, formStatusus, grauFormData, idCardFormData, nominationForm1Data, nominationForm2Data, staffFamilyFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
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
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { toast } from "sonner";

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
    const [isCollapsed, setIsCollapsed] = useState(false);

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

    // useEffect(() => {
    //     init();
    // }, []);

    const updateTarget = useCallback((e: any) => {
        if (e.matches) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: 720px)`);
        media.addEventListener("change", updateTarget);

        if (media.matches) {
            setIsCollapsed(true);
        }
        init();

        return () => media.removeEventListener("change", updateTarget);
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
                // console.log(data.data?.currentUserRole)
                setCurrentUserRole(data.data?.currentUserRole || "user");
                setFormsData(data.data.forms);
            } else {
                toast.error(data.message, {
                    description: data.errors?.[0] || "Internal server error",
                });
            }
        } catch (error) {
            toast.error("Error fetching form data", {
                description: (error as Error).message || "An error occurred while fetching form data",
            });
        }
    };

    return (
        <div>
            <div className="flex">
                <>
                    {/* Collapse Button - placed outside aside to avoid overlapping icons */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`fixed top-4 ${isCollapsed ? "left-12" : "left-78"
                            } z-50 bg-gray-300 border-4 border-neutral-200 dark:border-neutral-950 dark:bg-gray-700 p-2 rounded-full hover:opacity-80 transition-all duration-300 cursor-pointer`}
                    >
                        {isCollapsed ? <AiOutlineMenuUnfold size={30} /> : <AiOutlineMenuFold size={30} />}
                    </button>

                    <aside
                        className={`fixed top-0 left-0 h-full ${isCollapsed ? "w-16" : "w-82"
                            } bg-white dark:bg-card shadow-md border-r py-6 px-3 flex flex-col justify-between overflow-auto transition-all duration-300`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full overflow-hidden">
                                {!isCollapsed && <Loader loaderClass="md:w-24 w-16 md:h-24 h-16 border-[0.7rem]" />}
                            </div>
                        ) : (
                            <>
                                {/* Top Section */}
                                <div>
                                    {!isCollapsed && (
                                        <h2 className="text-2xl flex font-bold text-gray-900 dark:text-white px-2 mb-6 tracking-tight">
                                            {currentUserRole === "admin" && (
                                                <Link
                                                    href={
                                                        paramsData
                                                            ? "/admin/edit-employee-details"
                                                            : "/admin/dashboard"
                                                    }
                                                    className={`text-gray-800 dark:text-white hover:opacity-80 mr-1 ${isCollapsed ? "fixed top-6 left-4" : ""}`}
                                                >
                                                    <IoIosArrowBack
                                                        size={32}
                                                        className="p-1 bg-gray-300 dark:bg-gray-700 rounded-full"
                                                    />
                                                </Link>
                                            )}
                                            <span className="truncate">📋{name ? name : "Form Progress"}</span>
                                        </h2>
                                    )}

                                    {/* Form List */}
                                    <ul className={`flex flex-col space-y-2 ${isCollapsed ? "mt-12" : ""}`}>
                                        {Object.entries(formStatus).map(([key, form]) => {
                                            const isActive = pathname === `/forms${form.url}`;
                                            return (
                                                <li key={key}>
                                                    <Link
                                                        href={`/forms${form.url}${paramsData}`}
                                                        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${isActive
                                                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                                                            : form.status === "done"
                                                                ? "bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
                                                                : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`text-2xl ${form.status === "done"
                                                                ? "text-green-500 dark:text-green-400"
                                                                : "text-gray-400 dark:text-gray-500"
                                                                }`}
                                                        >
                                                            {form.status === "done" ? (
                                                                <IoCheckmarkDoneCircleOutline />
                                                            ) : (
                                                                <MdOutlinePending color="orange" />
                                                            )}
                                                        </span>
                                                        {!isCollapsed && (
                                                            <span
                                                                className={`truncate ${isActive ? "font-semibold" : "font-medium"
                                                                    }`}
                                                            >
                                                                {form.name}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {/* Bottom Section */}
                                <div className="mt-6 space-y-4 overflow-hidden">
                                    {/* Dark Mode Toggle */}
                                    <div
                                        onClick={toggleDarkMode}
                                        className={`flex items-center justify-center space-x-3 cursor-pointer ${isCollapsed ? "" : "pr-4"}`}
                                    >
                                        <span className="text-gray-800 dark:text-gray-200 font-medium p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition duration-200">
                                            {isDarkMode ? <IoMoon size={22} /> : <IoSunny size={22} />}
                                        </span>
                                        {!isCollapsed && (
                                            <span className="text-gray-800 dark:text-gray-200 font-medium truncate">
                                                {isDarkMode ? "Dark Mode" : "Light Mode"}
                                            </span>
                                        )}
                                    </div>

                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className={`w-full flex over items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer ${isCollapsed ? "justify-center px-1 py-2" : "px-4 py-2"}`}
                                    >
                                        <FiLogOut className="text-xl" />
                                        {!isCollapsed && <span className="pr-4">Logout</span>}
                                    </button>
                                </div>
                            </>
                        )}
                    </aside>
                </>

                <main className={`flex-1 ${isCollapsed ? "ml-16" : "ml-82"} transition-all duration-300 px-4 py-4 min-h-screen space-y-20`}>
                    {isLoading ? (<Loader />) : (children)}
                </main>
            </div>
        </div>
    );
}
