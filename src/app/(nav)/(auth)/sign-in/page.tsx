'use client'

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
        setErrors([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);

        const { email, password } = formData;

        try {
            const res = await axios.post('/api/sign-in', { email, password });

            if (res.data.success) {
                localStorage.setItem('token', res.data.data.token);
                console.log(res.data.data)
                toast.success(res.data.message);
                window.dispatchEvent(new Event("login"));
                if(res.data.data.role === 'admin') {
                    router.push('/admin/dashboard');
                }else{
                    router.push('/forms/staff-joining');
                }
            } else {
                toast.error(res.data.message);
                setErrors(res.data.errors || ['Login failed']);
            }
        } catch (err: any) {
            setErrors(err.response?.data?.errors || ['Something went wrong']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.length > 0 && (
                                <div className="text-red-600 text-sm px-2 text-left">
                                    {errors.map((err, index) => (
                                        <div key={index}>{err}</div>
                                    ))}
                                </div>
                            )}
                            <Button disabled={loading} type="submit" className="w-full cursor-pointer">
                                {loading ? "Loading..." : "Login"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/sign-up" className="underline underline-offset-4 cursor-pointer">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
