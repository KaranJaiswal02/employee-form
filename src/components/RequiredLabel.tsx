import React from 'react'

const RequiredLabel = ({ children }: { children: string }) => (
    <label className="block ">
        {children} <span className="text-red-500">*</span>
    </label>
);
export default RequiredLabel;