import React from 'react'

interface RequiredLabelProps {
    children: React.ReactNode;
    className?: string;
}

const RequiredLabel = ({ children, className = '' }: RequiredLabelProps) => (
    <span className={`flex ${className}`}>
        {children} <span className="text-red-500">*</span>
    </span>
);
export default RequiredLabel;