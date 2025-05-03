"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, FileDown } from "lucide-react";
import Loader from "@/components/Loader";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: "Completed" | "Pending";
}

interface FormData {
    [key: string]: any;
}

interface UserFormData {
    name: string;
    email: string;
    role: string;
    status: "Completed" | "Pending";
    currentUserRole: string;
    currentUserName: string;
    forms: {
        bankMandateFormData?: FormData;
        grauFormData?: FormData;
        idCardFormData?: FormData;
        nominationForm1Data?: FormData;
        nominationForm2Data?: FormData;
        staffFamilyFormData?: FormData;
        empFormData?: FormData;
    };
}

const formLabelMap: Record<string, string> = {
    bankMandateFormData: "Bank Mandate",
    grauFormData: "Granulity",
    idCardFormData: "ID Card Form",
    nominationForm1Data: "Nomination 1",
    nominationForm2Data: "Nomination 2",
    staffFamilyFormData: "Staff Family",
    empFormData: "Employee",
};

export default function UserFormDownloadPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [userFormData, setUserFormData] = useState<Record<string, UserFormData>>({});
    const [fetchedUserId, setFetchedUserId] = useState<string | null>(null);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/get-all", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                    "omit-current-user": "true",
                    "include-status": "true",
                },
            });
            const data = await res.json();
            console.log(data.data)
            if (data.success) {
                setUsers(data.data);
                setFilteredUsers(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error("Error fetching users", {
                description: error.message || "An error occurred",
            });
        }
        setLoading(false);
    };

    const handleFetchData = async (userId: string) => {
        try {
            setLoadingData(true);
            setLoadingUserId(userId);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/forms/all-forms", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                    "userid": userId,
                    "include-status": "true",
                },
            });

            const data = await res.json();
            if (data.success) {
                setUserFormData({ [userId]: data.data });
                setFetchedUserId(userId);
            } else {
                toast.error(data.message, {
                    description: data.errors?.[0] || "Error fetching form data",
                });
            }
        } catch (error) {
            toast.error("Error fetching form data");
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
        toast.success(`DownloadingData Excel for ${userFormData[userId].name}`);
        // Implement actual Excel download logic here
    };

    useEffect(() => {
        const lower = search.toLowerCase();
        setFilteredUsers(
            users.filter(
                (u) =>
                    u.name.toLowerCase().includes(lower) ||
                    u.email.toLowerCase().includes(lower)
            )
        );
    }, [search, users]);

    return (
        <>
            {loading ? (
                <Loader />
            ) :
                (<div className="p-6 max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        User Form Download
                    </h1>

                    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-1/2 bg-white dark:bg-neutral-800"
                            disabled={loadingData}
                        />

                        <div className="flex gap-2">
                            <Button
                                variant={roleFilter === "admin" ? "default" : "secondary"}
                                onClick={() => setRoleFilter("admin")}
                                className="cursor-pointer"
                                disabled={loadingData}
                            >
                                Show Only Admin
                            </Button>
                            <Button
                                variant={roleFilter === "user" ? "default" : "secondary"}
                                onClick={() => setRoleFilter("user")}
                                className="cursor-pointer"
                                disabled={loadingData}
                            >
                                Show Only Users
                            </Button>
                            <Button
                                variant={roleFilter === "all" ? "default" : "secondary"}
                                onClick={() => setRoleFilter("all")}
                                className="cursor-pointer"
                                disabled={loadingData}
                            >
                                Show All
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-neutral-800 rounded-md shadow">
                            <thead>
                                <tr className="text-left border-b dark:border-neutral-700">
                                    <th className="p-4 w-[200px] font-semibold text-gray-700 dark:text-gray-200">Name</th>
                                    <th className="p-4 w-[250px] font-semibold text-gray-700 dark:text-gray-200">Email</th>
                                    <th className="p-4 w-[250px] font-semibold text-gray-700 dark:text-gray-200">Role</th>
                                    <th className="p-4 w-[150px] font-semibold text-gray-700 dark:text-gray-200">Status</th>
                                    <th className="p-4 w-[300px] font-semibold text-gray-700 dark:text-gray-200">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => {
                                    const data = userFormData[user._id];
                                    const isActive = fetchedUserId === user._id;

                                    return (
                                        <React.Fragment key={user._id}>
                                            <tr className="border-t dark:border-neutral-700">
                                                <td className="p-4 w-[200px]">{user.name}</td>
                                                <td className="p-4 w-[250px]">{user.email}</td>
                                                <td className="p-4 w-[250px]">{user.role}</td>
                                                <td className="p-4 w-[150px]">
                                                    <span className={`${user.status === "Completed" ? "text-green-500 dark:text-green-600" : "text-red-500 dark:text-red-600"}`}>{user.status}</span>
                                                </td>
                                                <td className="p-4 w-[300px]">
                                                    {fetchedUserId !== user._id && (<Button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                                        onClick={() => handleFetchData(user._id)}
                                                        disabled={loadingData}
                                                    >
                                                        {loadingUserId === user._id ? "Loading..." : "Fetch Data"}
                                                    </Button>)}
                                                </td>
                                            </tr>

                                            {isActive && data && (
                                                <tr className="border-t dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900">
                                                    <td colSpan={5} className="p-4">
                                                        <div className="space-y-3">
                                                            {hasAnyForm(user._id) && (
                                                                <Button
                                                                    onClick={() => handleDownloadExcel(user._id)}
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                                                >
                                                                    <Download className="mr-2 h-4 w-5" />
                                                                    Download All as Excel
                                                                </Button>
                                                            )}
                                                            <div className="flex flex-wrap gap-2">
                                                                {Object.entries(data.forms).map(([key, value]) =>
                                                                    value ? (
                                                                        <a
                                                                            key={key}
                                                                            href={`/download/${key}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                                                        >
                                                                            <FileDown className="h-4 w-4" />
                                                                            {formLabelMap[key] || key}
                                                                        </a>
                                                                    ) : null
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>)}
        </>
    );
}
