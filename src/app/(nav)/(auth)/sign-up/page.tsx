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
import PasswordInput from "@/components/ui/password-input";
import IError from "@/types/error";
import { useAtom } from "jotai";
import { currentUserData } from "@/hooks/Atoms";

export default function SignUpForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [, setCurrentUser] = useAtom(currentUserData);
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

        const { name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setErrors(["Passwords do not match"]);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('/api/sign-up', { name, email, password });

            if (res.data.success) {
                localStorage.setItem('token', res.data.data.token);
                setCurrentUser({
                    id: res.data.data.user.id,
                    name: res.data.data.user.name,
                    email: res.data.data.user.email,
                    role: res.data.data.role,
                });
                toast.success(res.data.message);
                window.dispatchEvent(new Event("login"));
                router.push('/forms/staff-joining');
            } else {
                toast.error(res.data.message, {
                    description: res.data.errors?.[0]
                });
                setErrors(res.data.errors || ['Sign-Up failed']);
            }
        } catch (err: unknown) {
            const error = err as IError;
            toast.error("Error signing up", {
                description: error.message || "An error occurred",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Create an account by entering your email and password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
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
                                <PasswordInput
                                    id="password"
                                    placeholder="********"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <PasswordInput
                                    id="confirmPassword"
                                    placeholder="********"
                                    required
                                    value={formData.confirmPassword}
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
                                {loading ? "Loading..." : "Sign Up"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="underline underline-offset-4 cursor-pointer">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
