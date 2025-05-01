'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/staff-joining');
        }
    }, [router]);

    const toggleDarkMode = () => {
        if (typeof window !== "undefined") {
            document.documentElement.classList.toggle("dark");
            setIsDarkMode((prev) => !prev);
        }
    };

    return (
        <div className="min-h-svh w-full flex flex-col">
            {/* Navbar */}
            <nav className="w-full bg-white dark:bg-gray-900 shadow px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-xl font-semibold text-gray-800 dark:text-white">
                        Employee Forms
                    </Link>
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
                </div>
            </nav>

            {/* Page content */}
            <div className="flex flex-1 items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}
