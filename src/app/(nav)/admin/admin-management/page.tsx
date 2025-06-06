"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { currentUserData, usersData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LuEraser } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { TfiReload } from "react-icons/tfi";
import IFetchedUser from "@/types/fetchedUser";
import IError from "@/types/error";

export default function AdminManagementPage() {
    const [users, setUsers] = useAtom<IFetchedUser[]>(usersData);
    const [currentUser] = useAtom(currentUserData);
    const [filteredUsers, setFilteredUsers] = useState<IFetchedUser[]>([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
    const [changingRole, setChangingRole] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async (forceReload = false) => {
        setLoading(true);

        if (users.length > 0 && !forceReload) {
            const filtered = users.filter(user => user._id !== currentUser?.id);
            setFilteredUsers(filtered);
            setLoading(false);
            return;
        }

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
                const allUsers: IFetchedUser[] = data.data;
                setUsers(allUsers);

                const filtered = allUsers.filter(user => user._id !== currentUser?.id);
                setFilteredUsers(filtered);

                if (filtered.length === 0) {
                    toast.warning("No users found in the system");
                }
            } else {
                toast.error(data.message, {
                    description: data.errors?.[0]
                });
            }
        } catch (err: unknown) {
            const error = err as IError;
            toast.error("Error fetching users", {
                description: error.message || "An error occurred",
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleRole = async (userId: string) => {
        setChangingRole(true);
        const previousUsers = [...users];

        const updatedUsers = users.map(user =>
            user._id === userId
                ? { ...user, role: user.role === "admin" ? "user" as "user" : "admin" as "admin" }
                : user
        );

        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers.filter(u => u._id !== currentUser?.id));

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/toggle-role", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
            } else {
                throw new Error(data.errors?.[0] || "An error occurred");
            }
        } catch (err: unknown) {
            const error = err as IError;
            setUsers(previousUsers);
            setFilteredUsers(previousUsers.filter(u => u._id !== currentUser?.id));
            toast.error("Error toggling role", {
                description: error.message || "An error occurred",
            });
        } finally {
            setChangingRole(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = users
            .filter(user => user._id !== currentUser?.id)
            .filter(user =>
                (roleFilter === "all" || user.role === roleFilter) &&
                (
                    user.name.toLowerCase().includes(lowerSearch) ||
                    user.email.toLowerCase().includes(lowerSearch)
                )
            );
        setFilteredUsers(filtered);
    }, [search, roleFilter, users, currentUser]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Admin Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-yellow-600 dark:text-yellow-500">Important:</span> The role of the currently logged-in user cannot be modified.
                </p>
                {/* {users.length === 0 && !loading && (
                    <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-red-500">Notice:</span> No users found in the system.
                    </p>
                )} */}
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
                        onClick={() => fetchUsers(true)}
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
                            <SelectTrigger className="w-full cursor-pointer sm:w-[160px]">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reset Button */}
                    <Button
                        onClick={() => {
                            setSearch('');
                            setRoleFilter('all');
                        }}
                        className="px-4 py-2 border-1 dark:border-2 dark:bg-card border-neutral-500 dark:border-neutral-700 rounded-md text-sm text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 hover:bg-transparent cursor-pointer flex items-center gap-2 bg-transparent"
                    >
                        <LuEraser size={18} />
                        <span>Reset</span>
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-md border dark:border-neutral-700">
                <table className="min-w-full bg-gray-100 dark:bg-neutral-900 rounded-md shadow text-center">
                    <thead>
                        <tr className="border-b bg-white dark:bg-neutral-800 dark:border-neutral-700">
                            <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                Name
                            </th>
                            <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                Email
                            </th>
                            <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                                Admin
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
                                <td className="p-4">
                                    <Switch
                                        checked={user.role === "admin"}
                                        onCheckedChange={() =>
                                            toggleRole(user._id)
                                        }
                                        className="cursor-pointer"
                                        disabled={changingRole}
                                    />
                                </td>
                            </tr>
                        ))) : (
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
    );
}
