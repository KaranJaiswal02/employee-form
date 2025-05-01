"use client";
import { formStatusus } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function FormLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const [formStatus] = useAtom(formStatusus);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isDark = document.body.classList.contains("dark");
            setIsDarkMode(isDark);
        }
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/sign-in');
        }
    }, [router, isDarkMode]);

    const toggleDarkMode = () => {
        if (typeof window !== "undefined") {
            document.body.classList.toggle("dark");
            setIsDarkMode((prev) => !prev);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/sign-in');
    };

    return (
        <div className="flex">
            <aside className="fixed top-0 left-0 w-80 h-screen bg-white dark:bg-gray-950 shadow-md border-r border-gray-200 dark:border-gray-800 py-6 px-3 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">
                        📋 Form Progress
                    </h2>
                    <ul className="flex flex-col space-y-2">
                        {Object.entries(formStatus).map(([key, form]) => {
                            const isActive = pathname === form.url;
                            return (
                                <li key={key}>
                                    <Link
                                        href={form.url}
                                        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 
                    ${isActive
                                                ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                                                : form.status === "done"
                                                    ? "bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
                                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }`}
                                    >
                                        <span className={`text-xl ${form.status === "done"
                                            ? "text-green-500 dark:text-green-400"
                                            : "text-gray-400 dark:text-gray-500"
                                            }`}>
                                            {form.status === "done" ? "✅" : "⭕"}
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
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                            {isDarkMode ? "🌙" : "☀️"}
                        </span>
                        <button
                            onClick={toggleDarkMode}
                            className="relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-200"
                        >
                            <span
                                className={`inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-200 ${isDarkMode ? "translate-x-6" : "translate-x-0"
                                    }`}
                            ></span>
                        </button>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 ml-80 px-4 py-4 min-h-screen space-y-20">
                {children}
            </main>
        </div>
    );
}
