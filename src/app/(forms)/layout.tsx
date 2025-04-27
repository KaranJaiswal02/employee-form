"use client";

import { formStatusus } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import Link from "next/link";

export default function FormLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [formStatus] = useAtom(formStatusus);

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-950 shadow-md border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">
                    📋 Form Progress
                </h2>

                <ul className="flex flex-col space-y-2">
                    {Object.entries(formStatus).map(([formName, status]) => (
                        <li key={formName}>
                            <Link
                                href={`#${formName}`}
                                className={`flex items-center space-x-3 p-1 rounded-lg transition-colors duration-200 
                ${status === "done"
                                        ? "bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <span
                                    className={`text-xl ${status === "done"
                                            ? "text-green-500 dark:text-green-400"
                                            : "text-gray-400 dark:text-gray-500"
                                        }`}
                                >
                                    {status === "done" ? "✅" : "⭕"}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300 font-medium capitalize truncate">
                                    {formName.replace(/([a-z])([A-Z])/g, "$1 $2")}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-10 min-h-screen space-y-20 bg-gray-50 dark:bg-gray-900">
                {children}
            </main>
        </div>
    );
}
