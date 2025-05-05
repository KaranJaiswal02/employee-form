"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/sign-in");
        }
    }, [])
    return (
        <div className="flex flex-1 justify-center pt-16">
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}