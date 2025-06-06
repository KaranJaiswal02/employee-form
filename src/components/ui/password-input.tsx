import React, { useState, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { HiEye, HiEyeOff } from "react-icons/hi";
import clsx from "clsx";

export default function PasswordInput({
    className,
    placeholder = "********",
    required = false,
    value,
    onChange,
    ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                required={required}
                minLength={8} // Enforce minimum password length
                className={clsx("pr-10", className)}    
                value={value}
                onChange={onChange}
                {...rest}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
                tabIndex={-1}
            >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
        </div>
    );
}
