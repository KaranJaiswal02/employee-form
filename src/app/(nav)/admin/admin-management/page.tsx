"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { usersData } from "@/hooks/Atoms";
import { useAtom } from "jotai";

export default function AdminManagementPage() {
    const [users, setUsers] = useAtom<IFetchedUser[]>(usersData);
    const [filteredUsers, setFilteredUsers] = useState<IFetchedUser[]>([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
    const [changingRole, setChangingRole] = useState(false);
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
                if(data.data.length < 1) {
                    toast.warning("No users found in the system")
                }
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

    const toggleRole = async (userId: string, name: string) => {
        setChangingRole(true);
        const previousUsers = [...users];

        const updatedUsers = users.map((user) =>
            user._id === userId
                ? { ...user, role: user.role === "admin" ? "user" : "admin" } as IFetchedUser
                : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);

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
                setUsers(previousUsers);
                setFilteredUsers(previousUsers);
                toast.error(data.message, {
                    description: data.errors?.[0] || "An error occurred",
                });
            }
        } catch (error) {
            setUsers(previousUsers);
            setFilteredUsers(previousUsers);
            toast.error("Error toggling role");
        }
        setChangingRole(false);
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
            const matchesRole =
                roleFilter === "all" || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
        setFilteredUsers(filtered);
    }, [search, users, roleFilter]);

    return loading ? (
        <Loader />
    ) : (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Admin Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-yellow-500">Important:</span> The role of the currently logged-in user cannot be modified.
                </p>
                {users.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-red-500">Notice:</span> No users found in the system.
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
                        disabled={changingRole}
                    />

                    <div className="flex gap-2">
                        <Button
                            variant={roleFilter === "admin" ? "default" : "secondary"}
                            onClick={() => setRoleFilter("admin")}
                            className="cursor-pointer"
                            disabled={changingRole}
                        >
                            Show Only Admin
                        </Button>
                        <Button
                            variant={roleFilter === "user" ? "default" : "secondary"}
                            onClick={() => setRoleFilter("user")}
                            className="cursor-pointer"
                            disabled={changingRole}
                        >
                            Show Only Users
                        </Button>
                        <Button
                            variant={roleFilter === "all" ? "default" : "secondary"}
                            onClick={() => setRoleFilter("all")}
                            className="cursor-pointer"
                            disabled={changingRole}
                        >
                            Show All
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-neutral-800 rounded-md shadow text-center">
                        <thead>
                            <tr className="border-b dark:border-neutral-700">
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
                            {filteredUsers.map((user) => (
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
                                                toggleRole(user._id, user.name)
                                            }
                                            className="cursor-pointer"
                                            disabled={changingRole}
                                        />
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
