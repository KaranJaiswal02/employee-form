"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
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
            // console.log(data)
            if (data.success && data.data.role !== "admin") {
                router.push("/forms/staff-joining");
            } else if (!data.success) {
                localStorage.removeItem("token");
                router.push("/sign-in");
            }
        } catch (error) {
            toast.error("Error verifying token");
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/sign-in");
        }
        verifyToken(token as string);
    }, [])
    return (
        <div className="flex flex-1 justify-center pt-16">
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}