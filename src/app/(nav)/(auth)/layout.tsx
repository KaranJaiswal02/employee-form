'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/forms/staff-joining');
        }
    }, []);
    return (
        <div className="flex flex-1 items-center justify-center pt-16">
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    );
}