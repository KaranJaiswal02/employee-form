'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { IoMoon, IoSunny } from "react-icons/io5";
import IError from "@/types/error";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const verifyToken = async (token: string) => {
        try {
            const res = await fetch("/api/user/verify-token", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                if (data.data.role === "admin" && !pathname.startsWith("/admin")) {
                    router.push("/admin/dashboard");
                } else if (data.data.role === "user") {
                    router.push("/forms/staff-joining");
                }
            } else if (!data.success) {
                localStorage.removeItem("token");
                router.push("/sign-in");
            }
        } catch (err: unknown) {
            const error = err as IError;
            localStorage.removeItem("token");
            toast.error("Error verifying token", {
                description: error.message || "An error occurred",
            });
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isDark = document.documentElement.classList.contains("dark");
            setIsDarkMode(isDark);
        }
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            router.push("/sign-in");
            return;
        }
        verifyToken(token as string);
        setLoggedIn(true);
        const handleLogin = () => {
            const token = localStorage.getItem("token");
            if (token) {
                setLoggedIn(true);
            }
        };
        window.addEventListener("login", handleLogin);
        return () => {
            window.removeEventListener("login", handleLogin);
        };
    }, []);

    const toggleDarkMode = () => {
        if (typeof window !== "undefined") {
            document.documentElement.classList.toggle("dark");
            setIsDarkMode((prev) => !prev);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        router.push('/sign-in');
    };

    return (
        <div className="min-h-svh w-full flex flex-col">
            {/* Navbar */}
            <nav className="w-full bg-white dark:bg-card shadow px-4 md:px-6 py-3 fixed z-10 top-0 left-0">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        {/* Reserve space for back icon */}
                        <div className="w-6">
                            {pathname.startsWith("/admin") && pathname !== "/admin/dashboard" && (
                                <Link href="/admin/dashboard" className="text-gray-800 dark:text-white hover:opacity-80">
                                    <IoIosArrowBack size={32} className="p-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                                </Link>
                            )}
                        </div>
                        <Link href="/home" className="hidden md:inline text-xl my-2 font-semibold text-gray-800 dark:text-white">
                            Employee Management
                        </Link>
                        <span className="md:hidden inline text-xl my-2 font-semibold text-gray-800 dark:text-white">
                            Emp Mag...
                        </span>
                    </div>


                    <div className="flex items-center space-x-4">
                        <div onClick={toggleDarkMode} className="flex items-center justify-center space-x-3 cursor-pointer">
                            {/* <button
                                className="relative inline-flex items-center w-12 h-6 rounded-full bg-neutral-300 dark:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                            >
                                <span
                                    className={`inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-200 ${isDarkMode ? "translate-x-6" : "translate-x-0"
                                        }`}
                                ></span>
                            </button> */}
                            <span className="text-gray-800 dark:text-gray-200 font-medium p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition duration-200">
                                {isDarkMode ? <IoMoon size={22} /> : <IoSunny size={22} />}
                            </span>
                            <span className="hidden md:inline text-gray-800 dark:text-gray-200 font-medium">
                                {isDarkMode ? "Dark Mode" : "Light Mode"}
                            </span>
                        </div>

                        {loggedIn && (
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                            >
                                <FiLogOut className="text-md md:text-xl" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Page content */}
            {children}
        </div>
    );
}
