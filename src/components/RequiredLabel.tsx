import React from 'react'

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="flex">
        {children} <span className="text-red-500">*</span>
    </label>
);
export default RequiredLabel;