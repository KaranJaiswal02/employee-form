"use client";
import StaffFamilyMembers from "@/components/staffFamilyMembers/StaffFamilyMembers";
import { DefaultStaffFamilyFormData } from "@/hooks/defaultValue";
import { StaffFamilyFormData } from "@/models/forms/staff-family-members";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { staffFamilyFormData } from "@/hooks/Atoms";


export default function StaffFamily({ data = DefaultStaffFamilyFormData }: { data?: StaffFamilyFormData }) {
    const [, setFormData] = useAtom(staffFamilyFormData);
    useEffect(() => {
        setFormData(data);
    }, [data, setFormData]);
    return (
        <>
            <div className='print:hidden h-screen text-xl md:text-5xl flex justify-center items-end bg-white dark:bg-card text-black dark:text-white p-4 font-bold font-mono'>
                Staff Family Members Detail
            </div>
            <div className="hidden print:block force-light p-6 max-w-5xl mx-auto bg-white">
                <StaffFamilyMembers />
            </div>
        </>
    );
}