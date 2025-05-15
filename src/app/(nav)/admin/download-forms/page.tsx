"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, FileDown } from "lucide-react";
import Loader from "@/components/Loader";
import { usersStatusData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { convertToExcel } from "@/lib/excelGenerator";
import { FaFileExcel } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LuEraser } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";
import IFetchedUser from "@/types/fetchedUser";
import IError from "@/types/error";
import { BankMandateFormData } from "@/models/forms/bank-mandate";
import { IGratuityForm } from "@/models/forms/gratuity-form";
import { IdCardFormData } from "@/models/forms/idcard-form";
import { NominationForm1Model } from "@/models/forms/nomination-form1";
import { NominationForm2Model } from "@/models/forms/nomination-form2";
import { StaffFamilyFormData } from "@/models/forms/staff-family-members";
import { IEmpFormData } from "@/models/forms/staffjoin_form";

interface UserFormData {
    name: string;
    email: string;
    role: string;
    status: "Completed" | "Pending";
    currentUserRole: string;
    currentUserName: string;
    forms: {
        bankMandateFormData?: BankMandateFormData;
        grauFormData?: IGratuityForm;
        idCardFormData?: IdCardFormData;
        nominationForm1Data?: NominationForm1Model;
        nominationForm2Data?: NominationForm2Model;
        staffFamilyFormData?: StaffFamilyFormData;
        empFormData?: IEmpFormData;
    };
}

const formLabelMap: Record<string, string> = {
    bankMandateFormData: "Bank Mandate Form",
    grauFormData: "Gratuity Form",
    idCardFormData: "ID Card Form",
    nominationForm1Data: "Nomination Form 1",
    nominationForm2Data: "Nomination Form 2",
    staffFamilyFormData: "Staff Family Form",
    empFormData: "Staff Joining Form",
};

export default function UserFormDownloadPage() {
    const [users, setUsers] = useAtom<IFetchedUser[]>(usersStatusData);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<IFetchedUser[]>([]);
    const [userFormData, setUserFormData] = useState<Record<string, UserFormData>>({});
    const [fetchedUserId, setFetchedUserId] = useState<string>("");
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
    const [statusFilter, setStatusFilter] = useState<"all" | "Completed" | "Pending">("all");
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    const layouts = {
        bankMandateFormData: 'portrait',
        grauFormData: 'portrait',
        idCardFormData: 'portrait',
        nominationForm1Data: 'portrait',
        nominationForm2Data: 'portrait',
        staffFamilyFormData: 'landscape',
        empFormData: 'portrait',
    }

    const handleOpenAndPrint = (formKey: string, data: object) => {
        const payload = {
            formKey,
            formData: data,
            layout: layouts[formKey as keyof typeof layouts],
            timestamp: Date.now(),
        };
        localStorage.setItem('printFormData', JSON.stringify(payload));
        const url = `/print/${formKey}`
        const printWindow = window.open(url, '_blank')
        if (printWindow) printWindow.focus()
    }

    useEffect(() => {
        fetchUsers();
    }, [setUsers, reload]);

    const fetchUsers = async () => {
        if (users.length > 0 && !reload) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setUserFormData({});
        setFetchedUserId("");
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/get-all", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                    "omit-current-user": "false",
                },
            });
            const data = await res.json();
            console.log(data.data)
            if (data.success) {
                setUsers(data.data);
                setFilteredUsers(data.data);
            } else {
                toast.error(data.message, {
                    description: data.errors?.[0] || "Error fetching users",
                });
            }
        } catch (err: unknown) {
            const error = err as IError;
            toast.error("Error fetching users", {
                description: error.message || "An error occurred",
            });
        }
        setLoading(false);
        setReload(false);
    };

    const handleFetchData = async (userId: string) => {
        if (userFormData[userId]) {
            setFetchedUserId(userId);
            return;
        }

        try {
            setLoadingData(true);
            setLoadingUserId(userId);

            const token = localStorage.getItem("token");
            const res = await fetch("/api/forms/all-forms", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                    "userid": userId,
                },
            });

            const data = await res.json();
            if (data.success) {
                setUserFormData((prev) => ({ ...prev, [userId]: data.data ? data.data : {} }));
                setFetchedUserId(userId);
            } else {
                toast.error(data.message, {
                    description: data.errors?.[0] || "Error fetching form data",
                });
            }
        } catch (err: unknown) {
            const error = err as IError;
            toast.error("Error fetching form data", {
                description: error.message || "An error occurred",
            });
        } finally {
            setLoadingData(false);
            setLoadingUserId(null);
        }
    };

    const hasAnyForm = (userId: string) => {
        const forms = userFormData[userId]?.forms;
        return forms && Object.values(forms).some((form) => form);
    };

    const handleDownloadExcel = (userId: string) => {
        const userData = userFormData[userId];
        if (!userData || !userData.forms) {
            toast.error("No form data available to download");
            return;
        }
        const data = {
            bankMandateFormData: userData.forms.bankMandateFormData || {},
            grauFormData: userData.forms.grauFormData || {},
            idCardFormData: userData.forms.idCardFormData || {},
            nominationForm1Data: userData.forms.nominationForm1Data || {},
            nominationForm2Data: userData.forms.nominationForm2Data || {},
            staffFamilyFormData: userData.forms.staffFamilyFormData || {},
            empFormData: userData.forms.empFormData || {},
        }

        const excelData = {
            ...data.bankMandateFormData,
            ...data.grauFormData,
            ...data.idCardFormData,
            ...data.nominationForm1Data,
            ...data.nominationForm2Data,
            ...data.staffFamilyFormData,
            ...data.empFormData,
        }
        convertToExcel(excelData, `${userData.name.replace(/\s+/g, "_")}_forms.xlsx`);
        toast.success(`Downloaded Excel for ${userData.name}`);
    };

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(lowerSearch) ||
                user.email.toLowerCase().includes(lowerSearch);
            const matchesRole =
                roleFilter === "all" || user.role === roleFilter;
            const matchesStatus =
                statusFilter === "all" || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
        setFilteredUsers(filtered);
    }, [search, users, roleFilter, statusFilter]);

    return (
        <>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Download Employee Forms
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-yellow-600 dark:text-yellow-500">Note:</span> Only users with submitted forms will have download options.
                    </p>
                    {users.length === 0 && !loading && (
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-red-500">Notice:</span> No users found for form download.
                        </p>
                    )}
                </div>


                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Search Input */}
                    <div className="flex flex-row items-center gap-2 w-full md:w-1/2">
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border rounded-md border-gray-500 dark:border-gray-800"
                        />
                        <Button
                            className="px-4 py-2 border-1 dark:border-2 dark:bg-card border-neutral-500 dark:border-neutral-700 rounded-md text-sm text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 hover:bg-transparent cursor-pointer flex items-center gap-2 bg-transparent"
                            onClick={() => setReload(true)}
                        >
                            <TfiReload />
                            {/* Reload */}
                        </Button>
                    </div>


                    {/* Filters and Reset Button */}
                    <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-2 w-full md:w-fit">
                        {/* Role Filter */}
                        <div className="border rounded-md border-gray-500 dark:border-gray-800">
                            <Select
                                value={roleFilter}
                                onValueChange={(val: "all" | "admin" | "user") => setRoleFilter(val)}
                            >
                                <SelectTrigger className="w-full cursor-pointer md:w-[160px]">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status Filter */}
                        <div className="border rounded-md border-gray-500 dark:border-gray-800">
                            <Select
                                value={statusFilter}
                                onValueChange={(val: "all" | "Completed" | "Pending") => setStatusFilter(val)}
                            >
                                <SelectTrigger className="w-full cursor-pointer md:w-[160px]">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Reset Button */}
                        <Button
                            onClick={() => {
                                setSearch('');
                                setRoleFilter('all');
                                setStatusFilter('all');
                            }}
                            className="px-4 py-2 border-1 dark:border-2 dark:bg-card border-neutral-500 dark:border-neutral-700 rounded-md text-sm text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 hover:bg-transparent cursor-pointer flex items-center gap-2 bg-transparent"
                        >
                            <LuEraser size={18} />
                            <span>Reset</span>
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-md border dark:border-neutral-700">
                    <table className="min-w-full text-center bg-gray-100 dark:bg-neutral-900 rounded-md shadow">
                        <thead>
                            <tr className="border-b bg-white dark:bg-neutral-800 dark:border-neutral-700">
                                <th className="p-4 w-[200px] font-semibold text-gray-700 dark:text-gray-200">Name</th>
                                <th className="p-4 w-[250px] font-semibold text-gray-700 dark:text-gray-200">Email</th>
                                <th className="p-4 w-[250px] font-semibold text-gray-700 dark:text-gray-200">Role</th>
                                <th className="p-4 w-[150px] font-semibold text-gray-700 dark:text-gray-200">Status</th>
                                <th className="p-4 w-[300px] font-semibold text-gray-700 dark:text-gray-200">Download</th>
                            </tr>
                        </thead>
                        <tbody className="relative">
                            {!loading ? (filteredUsers.map((user) => {
                                const data = userFormData[user._id];
                                const isActive = fetchedUserId === user._id;

                                return (
                                    <React.Fragment key={user._id}>
                                        <tr className="border-t dark:border-neutral-700">
                                            <td className="p-4 w-[200px]">{user.name}</td>
                                            <td className="p-4 w-[250px]">{user.email}</td>
                                            <td className="p-4 w-[250px]">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                                            <td className="p-4 w-[150px]">
                                                <span className={`${user.status === "Completed" ? "text-green-500 dark:text-green-600" : "text-red-500 dark:text-red-600"}`}>{user.status}</span>
                                            </td>
                                            <td className="p-4 w-[300px]">
                                                {fetchedUserId !== user._id && (
                                                    <Button
                                                        className={`${userFormData[user._id]
                                                            ? "bg-purple-600 hover:bg-purple-700"
                                                            : "bg-blue-600 hover:bg-blue-700"
                                                            } text-white cursor-pointer`}
                                                        onClick={() => handleFetchData(user._id)}
                                                        disabled={loadingData}
                                                    >
                                                        {loadingUserId === user._id
                                                            ? "Loading..."
                                                            : userFormData[user._id]
                                                                ? "Show Data"
                                                                : "Fetch Data"}
                                                    </Button>
                                                )}

                                                {fetchedUserId === user._id && isActive && data && hasAnyForm(user._id) && (
                                                    <Button
                                                        onClick={() => handleDownloadExcel(user._id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                                                    >
                                                        <Download className="mr-1 h-4 w-5" />
                                                        Download as Excel
                                                        <FaFileExcel className="ml-1 h-4 w-5" />
                                                    </Button>
                                                )}
                                                {/* {fetchedUserId === user._id && isActive && data && !hasAnyForm(user._id) && (
                                                        <p className="text-red-500 dark:text-red-600 px-5 my-1">
                                                            No forms data available.
                                                        </p>
                                                    )} */}
                                            </td>
                                        </tr>

                                        {isActive && data && hasAnyForm(user._id) && (
                                            <tr className="border-t dark:border-neutral-700 bg-gray-200 dark:bg-neutral-950">
                                                <td colSpan={5} className="p-4">
                                                    <div className="space-y-3">
                                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                                            {Object.entries(data.forms).map(([key, value]) =>
                                                                value ? (
                                                                    <button
                                                                        key={key}
                                                                        onClick={() => handleOpenAndPrint(key, value)}
                                                                        className="flex items-center gap-2 px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm cursor-pointer"
                                                                    >
                                                                        <FileDown className="h-4 w-4" />
                                                                        {formLabelMap[key] || key}
                                                                    </button>
                                                                ) : null
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {isActive && data && !hasAnyForm(user._id) && (
                                            <tr className="border-t dark:border-neutral-700 bg-gray-200 dark:bg-neutral-950">
                                                <td colSpan={5} className="px-4 py-[26px] text-lg text-red-500 dark:text-red-600 text-center">
                                                    No forms data available.
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })) : (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center">
                                        <Loader loaderClass="md:w-28 w-10 md:h-28 h-10 border-[0.5rem] md:border-[1rem]" />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
