"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { usersData } from "@/hooks/Atoms";
import { useAtom } from "jotai";

export default function AdminManagementPage() {
    const [users, setUsers] = useAtom<IFetchedUser[]>(usersData);
    const [filteredUsers, setFilteredUsers] = useState<IFetchedUser[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        if(users.length > 0) {
            return
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/get-all", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                    "omit-current-user": "true",
                    "include-status": "false",
                },
            });

            const data = await res.json();
            if (data.success) {
                setUsers(data.data);
                const filtered = data.data.filter((user : IFetchedUser) => user.role === "user");
                if (filtered.length < 1) {
                    toast.warning("No users found in the system")
                }
                setFilteredUsers(filtered);
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

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(lowerSearch) ||
                user.email.toLowerCase().includes(lowerSearch);
            return matchesSearch && user.role === "user";
        });
        setFilteredUsers(filtered);
    }, [search]);

    return loading ? (
        <Loader />
    ) : (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Edit Employee Details
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-yellow-500">Important:</span> Only users with the "user" role can be edited. Admin accounts are not editable.
                </p>
                {filteredUsers.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-red-500">Notice:</span> No users available for editing.
                    </p>
                )}
            </div>

            {filteredUsers.length > 0 && (<>
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <Input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 bg-white dark:bg-neutral-800"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-neutral-800 rounded-md shadow">
                        <thead>
                            <tr className="text-left border-b dark:border-neutral-700">
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Name
                                </th>
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Email
                                </th>
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="border-t dark:border-neutral-700">
                                    <td className="p-4 text-gray-800 dark:text-gray-100">
                                        {user.name}
                                    </td>
                                    <td className="p-4 text-gray-800 dark:text-gray-100">
                                        {user.email}
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            href={`/forms/staff-joining?id=${user._id}`}
                                            className="text-blue-500 hover:underline cursor-pointer"
                                        >
                                            <FaRegEdit size={20} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>)}
        </div>
    );
}
