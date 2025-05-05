"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LuEraser } from "react-icons/lu";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { usersStatusData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import PasswordInput from "@/components/ui/PasswordInput";

export default function UserPasswordUpdatePage() {
    const [users, setUsers] = useAtom<IFetchedUser[]>(usersStatusData);
    const [filteredUsers, setFilteredUsers] = useState<IFetchedUser[]>([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
    const [passwordInputs, setPasswordInputs] = useState<{ [userId: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const fetchUsers = async () => {
        if (users.length > 0) return;
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
                setUsers(data.data);
                setFilteredUsers(data.data);
            } else {
                toast.error(data.message,{
                    description: data.errors?.[0]
                });
            }
        } catch (err: any) {
            toast.error("Failed to fetch users",{
                description: err.message || "An error occurred",
            });
        }
        setLoading(false);
    };

    const updatePassword = async (userId: string) => {
        const newPassword = passwordInputs[userId]?.trim();
        if (!newPassword) return toast.warning("Please enter a new password");

        setUpdating(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/update-password", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ userId, newPassword }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Password updated successfully");
                setPasswordInputs((prev) => ({ ...prev, [userId]: "" }));
            } else {
                toast.error(data.message,{
                    description: data.errors?.[0]
                });
            }
        } catch (error : any) {
            toast.error("Password update failed",{
                description: error.message || "An error occurred",
            });
        }
        setUpdating(false);
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
            const matchesRole = roleFilter === "all" || user.role === roleFilter;
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
                    Update User Passwords
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-yellow-600 dark:text-yellow-500">Note:</span> Only available for user accounts. Admins should reset their own password.
                </p>
            </div>

            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 border rounded-md border-gray-500 dark:border-gray-800"
                />

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-fit">
                    <div className="border rounded-md border-gray-500 dark:border-gray-800">
                        <Select
                            value={roleFilter}
                            onValueChange={(val: "all" | "admin" | "user") => setRoleFilter(val)}
                        >
                            <SelectTrigger className="w-full sm:w-[160px]">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={() => {
                            setSearch('');
                            setRoleFilter('all');
                        }}
                        className="px-4 py-2 border dark:border-2 dark:bg-card border-neutral-500 dark:border-neutral-700 rounded-md text-sm text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 flex items-center gap-2 bg-transparent"
                    >
                        <LuEraser size={18} />
                        <span>Reset</span>
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-md border dark:border-neutral-700">
                <table className="min-w-full bg-white dark:bg-neutral-900 rounded-md shadow text-center">
                    <thead>
                        <tr className="border-b dark:border-neutral-700">
                            <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Name</th>
                            <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Email</th>
                            <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Role</th>
                            <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">New Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-t dark:border-neutral-700">
                                <td className="p-4 text-gray-800 dark:text-gray-100">{user.name}</td>
                                <td className="p-4 text-gray-800 dark:text-gray-100">{user.email}</td>
                                <td className="p-4 text-gray-800 dark:text-gray-100">{user.role}</td>
                                <td className="p-4 flex items-center justify-center gap-2">
                                    <PasswordInput
                                        type="password"
                                        value={passwordInputs[user._id] || ""}
                                        onChange={(e) =>
                                            setPasswordInputs((prev) => ({
                                                ...prev,
                                                [user._id]: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter here..."
                                        className="w-48 border border-gray-400 dark:border-gray-700"
                                        disabled={updating}
                                    />
                                    <Button
                                        onClick={() => updatePassword(user._id)}
                                        disabled={updating}
                                        className="text-sm cursor-pointer"
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
