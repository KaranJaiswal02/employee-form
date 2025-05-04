"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import Link from "next/link";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { usersData, usersStatusData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";

export default function AdminManagementPage() {
    const [usersFromAtom, setUsersFromAtom] = useAtom<IFetchedUser[]>(usersStatusData);
    const [, setUsers1] = useAtom<IFetchedUser[]>(usersData);
    const [users, setUsers] = useState<IFetchedUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IFetchedUser[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"all" | "Completed" | "Pending">("all");

    const fetchUsers = async () => {
        if (usersFromAtom.length > 0) {
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
                    "include-status": "true",
                },
            });

            const data = await res.json();
            if (data.success) {
                setUsersFromAtom(data.data);
                setUsers1(data.data);
                console.log(data.data);
                const filtered = data.data.filter((user: IFetchedUser) => user.role === "user");
                setUsers(filtered);
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
    }, [setUsers]);

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
                {users.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-red-500">Notice:</span> No users available for editing.
                    </p>
                )}
            </div>

            {users.length > 0 && (<>
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <Input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 bg-white dark:bg-neutral-800"
                    />

                    <div className="flex gap-2">
                        <Button
                            variant={statusFilter === "Completed" ? "default" : "secondary"}
                            onClick={() => setStatusFilter("Completed")}
                            className="cursor-pointer"
                        >
                            Show Only Completed
                        </Button>
                        <Button
                            variant={statusFilter === "Pending" ? "default" : "secondary"}
                            onClick={() => setStatusFilter("Pending")}
                            className="cursor-pointer"
                        >
                            Show Only Pending
                        </Button>
                        <Button
                            variant={statusFilter === "all" ? "default" : "secondary"}
                            onClick={() => setStatusFilter("all")}
                            className="cursor-pointer"
                        >
                            Show All
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-center bg-white dark:bg-neutral-800 rounded-md shadow">
                        <thead>
                            <tr className="border-b dark:border-neutral-700">
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Name
                                </th>
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Email
                                </th>
                                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                    Role
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
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="border-t dark:border-neutral-700">
                                    <td className="p-4 text-gray-800 dark:text-gray-100">
                                        {user.name}
                                    </td>
                                    <td className="p-4 text-gray-800 dark:text-gray-100">
                                        {user.email}
                                    </td>
                                    <td className="p-4 text-gray-800 dark:text-gray-100">
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </>)}
        </div>
    );
}
