"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen min-w-screen flex flex-col items-center justify-center px-4 py-8">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <AlertTriangle className="w-16 h-16 text-yellow-500 dark:text-yellow-400" />
                </div>
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-muted-foreground mb-6">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/" passHref>
                    <Button variant="default" className="cursor-pointer" size="lg">
                        Go to Homepage
                    </Button>
                </Link>
            </div>
        </div>
    );
}
