'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function SignUpForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { email, password, confirmPassword } = form;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('/api/sign-up', { email, password });

            if (res.data.success) {
                localStorage.setItem('token', res.data.data.token);

                router.push('/dashboard');
            } else {
                setError(res.data.message || 'Signup failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    const renderField = (id: string, label: string, type = 'text') => (
        <div className="relative w-full">
            <input
                id={id}
                name={id}
                type={type}
                value={(form as any)[id]}
                onChange={handleChange}
                placeholder=" "
                className={clsx(
                    'peer block w-full appearance-none border border-neutral-300 dark:border-neutral-700',
                    'bg-transparent px-3 pt-5 pb-2 rounded-md text-sm focus:outline-none',
                    'focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500',
                    'dark:text-white dark:bg-neutral-900'
                )}
                required
            />
            <label
                htmlFor={id}
                className={clsx(
                    'absolute left-3 top-1 text-sm text-neutral-500 dark:text-neutral-400',
                    'transition-all duration-200 ease-in-out',
                    'peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400',
                    'peer-focus:-top-3 peer-focus:text-sm peer-focus:text-neutral-500 dark:peer-focus:text-neutral-300'
                )}
            >
                <span className='bg-white dark:bg-black px-1'>{label}</span>
            </label>

        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-black px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <Card className="bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold text-neutral-900 dark:text-white">
                            Create Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {renderField('email', 'Email', 'email')}
                            {renderField('password', 'Password', 'password')}
                            {renderField('confirmPassword', 'Confirm Password', 'password')}

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-sm"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Sign Up'}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
