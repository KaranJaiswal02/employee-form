"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { usersStatusData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LuEraser } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";

export default function AdminManagementPage() {
    const [usersFromAtom, setUsersFromAtom] = useAtom<IFetchedUser[]>(usersStatusData);
    const [users, setUsers] = useState<IFetchedUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IFetchedUser[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"all" | "Completed" | "Pending">("all");
    const [reload, setReload] = useState(false);

    const fetchUsers = async () => {
        if (usersFromAtom.length > 0 && !reload) {
            const filteredUser = usersFromAtom.filter((user: IFetchedUser) => user.role === "user");
            setUsers(filteredUser);
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/get-all", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                    "omit-current-user": "false",
                },
            });

            const data = await res.json();
            if (data.success) {
                setUsersFromAtom(data.data);
                console.log(data.data);
                const filtered = data.data.filter((user: IFetchedUser) => user.role === "user");
                setUsers(filtered);
                if (filtered.length < 1) {
                    toast.warning("No users found in the system")
                }
                setFilteredUsers(filtered);
            } else {
                toast.error(data.message, {
                    description: data.errors?.[0]
                });
            }
        } catch (error: any) {
            toast.error("Error fetching users", {
                description: error.message || "An error occurred",
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [setUsers, reload]);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(lowerSearch) ||
                user.email.toLowerCase().includes(lowerSearch);
            const matchesStatus =
                statusFilter === "all" || user.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
        setFilteredUsers(filtered);
    }, [search, statusFilter, users]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Edit Employee Details
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-yellow-600 dark:text-yellow-500">Important:</span> Only users with the &#34;user&#34; role can be edited. Admin accounts are not editable.
                </p>
                {users.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-red-500">Notice:</span> No users available for editing.
                    </p>
                )}
            </div>

            {users.length > 0 && (<>
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Search Input */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-1/2">
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border rounded-md border-gray-500 dark:border-gray-800"
                        />
                        <Button
                            className="px-4 py-2 border-1 dark:border-2 dark:bg-card border-neutral-500 dark:border-neutral-700 rounded-md text-sm text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 hover:bg-transparent cursor-pointer flex items-center gap-2 bg-transparent"
                            onClick={() => setReload(!reload)}
                        >
                            <TfiReload />
                            {/* Reload */}
                        </Button>
                    </div>

                    {/* Filters and Reset Button */}
                    <div className="flex flex-col items-center justify-center sm:flex-row gap-2 w-full md:w-fit">

                        {/* Status Filter */}
                        <div className="border rounded-md border-gray-500 dark:border-gray-800">
                            <Select
                                value={statusFilter}
                                onValueChange={(val: "all" | "Completed" | "Pending") => setStatusFilter(val)}
                            >
                                <SelectTrigger className="w-full cursor-pointer sm:w-[160px]">
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
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Name
                                </th>
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Email
                                </th>
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Status
                                </th>
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading ? (filteredUsers.map((user) => (
                                <tr key={user._id} className="border-t dark:border-neutral-700">
                                    <td className="p-4 text-gray-800 dark:text-gray-100">
                                        {user.name}
                                    </td>
                                    <td className="p-4 text-gray-800 dark:text-gray-100">
                                        {user.email}
                                    </td>
                                    <td className="p-4 text-gray-800 dark:text-gray-100">
                                        <span className={`${user.status === "Completed" ? "text-green-500 dark:text-green-600" : "text-red-500 dark:text-red-600"}`}>{user.status}</span>
                                    </td>
                                    <td className="p-4 flex justify-center items-center">
                                        <Link
                                            href={`/forms/staff-joining?id=${user._id}`}
                                            className="text-blue-500 cursor-pointer"
                                        >
                                            <FaEdit size={23} className="m-0 p-0" />
                                        </Link>
                                    </td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center">
                                        <Loader loaderClass="md:w-28 w-10 md:h-28 h-10" />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>)}
        </div>
    );
}
