"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBriefcase, FaClipboardList, FaFileDownload, FaKey, FaMoon, FaSun, FaUserEdit, FaUserShield } from "react-icons/fa";

export default function HomePage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [role, setRole] = useState("");

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
                setRole(data.data.role);
            } else {
                localStorage.removeItem("token");
            }
        } catch {
            localStorage.removeItem("token");
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isDark = document.documentElement.classList.contains("dark");
            setIsDarkMode(isDark);
        }
        const token = localStorage.getItem("token");
        if (token) verifyToken(token as string);
    }, []);

    const toggleDarkMode = () => {
        if (typeof window !== "undefined") {
            document.documentElement.classList.toggle("dark");
            setIsDarkMode((prev) => !prev);
        }
    };

    return (
        <div className="min-h-screen flex flex-col text-gray-800 dark:text-white">
            {/* Header with Toggle */}
            <header className="relative px-6 py-12 text-center bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-700 dark:to-teal-700 text-white">
                <button
                    onClick={toggleDarkMode}
                    className="fixed top-6 right-6 p-3 rounded-full bg-white text-blue-600 dark:bg-gray-800 dark:text-yellow-400 shadow-md hover:scale-105 transition cursor-pointer"
                    aria-label="Toggle Dark Mode"
                >
                    {!isDarkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
                </button>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Work Zone System</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    A centralized platform to manage employee roles, forms, and administrative tools with ease.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-5 text-lg">
                    {role === "admin" && (<Link
                        href="/admin/dashboard"
                        className="inline-block px-6 py-2 rounded-xl font-medium text-white bg-green-600 dark:bg-transparent border-3 border-green-600 dark:border-green-400 hover:bg-green-700 dark:hover:bg-green-600 dark:hover:text-white shadow transition"
                    >
                        View Dashboard
                    </Link>)}

                    {role !== "" && (<Link
                        href="/forms/staff-joining"
                        className="inline-block px-6 py-2 rounded-xl font-medium text-white bg-purple-600 dark:bg-transparent border-3 border-purple-600 dark:border-purple-400 hover:bg-purple-700 dark:hover:bg-purple-600 dark:hover:text-white shadow transition"
                    >
                        Fill Join Form
                    </Link>)}

                    {role === "" && (<Link
                        href="/sign-in"
                        className="inline-block px-6 py-2 rounded-xl font-medium text-white bg-green-600 dark:bg-transparent border-3 border-green-600 dark:border-green-400 hover:bg-green-700 dark:hover:bg-green-600 dark:hover:text-white shadow transition"
                    >
                        Sign In
                    </Link>)}

                    {role === "" && (<Link
                        href="/sign-up"
                        className="inline-block px-6 py-2 rounded-xl font-medium text-white bg-purple-600 dark:bg-transparent border-3 border-purple-600 dark:border-purple-400 hover:bg-purple-700 dark:hover:bg-purple-600 dark:hover:text-white shadow transition"
                    >
                        Sign Up
                    </Link>)}
                </div>

            </header>

            {/* Features Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl w-full mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`rounded-xl shadow-lg p-6 sm:p-8 ${feature.bgColor} hover:scale-[1.02] transition-transform duration-200 ease-in-out text-white`}
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm sm:text-base">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Footer */}
            <footer className="text-center py-6 border-t border-gray-400/70 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} SL India Software Centre. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

const features = [
    {
        title: 'Admin Management',
        icon: <FaUserShield className="text-3xl" />,
        description: 'Manage admin users and set roles and permissions securely.',
        bgColor: 'bg-blue-600 dark:bg-blue-800',
    },
    {
        title: 'Edit Employee Details',
        icon: <FaUserEdit className="text-3xl" />,
        description: 'Update employee profiles, contact information, and other details.',
        bgColor: 'bg-green-600 dark:bg-green-800',
    },
    {
        title: 'Download Forms',
        icon: <FaClipboardList className="text-3xl" />,
        description: 'Access and download all required HR and onboarding forms.',
        bgColor: 'bg-purple-600 dark:bg-purple-800',
    },
    {
        title: 'My Employment Forms',
        icon: <FaBriefcase className="text-3xl" />,
        description: 'Submit personal employment-related forms directly.',
        bgColor: 'bg-teal-500 dark:bg-teal-800',
    },
    {
        title: 'Meal Ticket Generator',
        icon: <FaFileDownload className="text-3xl" />,
        description: 'Generate and download employee meal tickets monthly.',
        bgColor: 'bg-yellow-500 dark:bg-yellow-700',
    },
    {
        title: 'Update Multiple Passwords',
        icon: <FaKey className="text-3xl" />,
        description: 'Reset or update passwords for multiple users at once with ease.',
        bgColor: 'bg-red-600 dark:bg-red-800',
    }
    // {
    //   title: 'Bulk User Upload',
    //   icon: <FaUsersCog className="text-3xl" />,
    //   description: 'Quickly onboard multiple employees by uploading user data in bulk.',
    //   bgColor: 'bg-orange-500 dark:bg-orange-700',
    // },
];