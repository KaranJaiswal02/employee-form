"use client";
import { Button } from "@/components/ui/button";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { empFormData, formStatusus, staffFamilyFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { set } from "mongoose";

type Child = {
    name: string;
    gender: string;
    dob: string;
};

type FormData = {
    empNo: string;
    name: string;
    department: string;
    dob: string;
    age: number;
    maritalStatus: string;
    spouseName: string;
    spouseDob: string;
    numOfChildren: string;
    children: Child[];
    fatherName: string;
    fatherDob: string;
    motherName: string;
    motherDob: string;
    mobileNumber: string;
    address: string;
    date: string;
};

export default function MedicalInsuranceForm() {
    const router = useRouter();
    const [formData, setFormData] = useAtom<FormData>(staffFamilyFormData);
    const [form1data] = useAtom(empFormData);
    const [formStatus, setFormStatus] = useAtom(formStatusus);

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        // Adjust if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    }

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            name: form1data.name || "",
            dob: form1data.dob || "",
            department: form1data.department || "",
            currAddress: form1data.currAddress || "",
            age: calculateAge(form1data.dob) || 0,
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleChildChange = (index: number, field: keyof Child, value: string) => {
        setFormData(prev => {
            const updatedChildren = [...prev.children];
            updatedChildren[index] = { ...updatedChildren[index], [field]: value };
            return { ...prev, children: updatedChildren };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        const response = await fetch("/api/staff-family-members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.status === 201) {
            setFormStatus((prevStatus) => ({
                ...prevStatus,
                form3: {
                    ...prevStatus.form3,
                    status: "done",
                },
            }));
            router.push("/bank-mandate");
        }
        else {
            const responseData = await response.json();
            alert(responseData.errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg">
            <h2 className="text-center text-lg font-semibold border-b border-black pb-2 mb-4">
                STAFF FAMILY MEMBERS DETAILS - MEDICAL INSURANCE
            </h2>

            <table className="w-full border border-black text-left text-sm">
                <tbody>
                    <tr className="border border-black">
                        <td className="p-2 border border-black">1</td>
                        <td className="p-2 border border-black">EMP. NO</td>
                        <td className="p-2 border border-black">
                            <input
                                type="text"
                                name="empNo"
                                value={formData.empNo}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Employee Number"
                            />
                        </td>
                        <td className="p-2 border border-black">Emp. Name</td>
                        <td className="p-2 border border-black" colSpan={4}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Employee Name"
                                disabled={true}
                            />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td></td>
                        <td className="p-2 border border-black">DEPARTMENT</td>
                        <td className="p-2 border border-black">
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Department"
                                disabled={true}
                            />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black">
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full"
                                disabled={true}
                            />
                        </td>
                        <td className="p-2 border border-black">AGE</td>
                        <td className="p-2 border border-black">
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Age"
                                disabled={true}
                            />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td></td>
                        <td className="p-2 border border-black">MARITAL STATUS</td>
                        <td className="p-2 border border-black" colSpan={5}>
                            <input
                                type="text"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                placeholder="MARRIED / SINGLE"
                                className="w-full"
                            />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">2</td>
                        <td className="p-2 border border-black">SPOUSE NAME</td>
                        <td className="p-2 border border-black" colSpan={2}>
                            <input
                                type="text"
                                name="spouseName"
                                value={formData.spouseName}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Spouse Name"
                            />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black" colSpan={2}>
                            <input
                                type="date"
                                name="spouseDob"
                                value={formData.spouseDob}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">3</td>
                        <td className="p-2 border border-black">NO. OF CHILD</td>
                        <td className="p-2 border border-black" colSpan={5}>
                            <input
                                type="number"
                                name="numOfChildren"
                                value={formData.numOfChildren}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Number of Children"
                            />
                        </td>
                    </tr>

                    {formData.children.map((child, index) => (
                        <tr key={index} className="border border-black">
                            <td className="p-2 border border-black">{index + 4}</td>
                            <td className="p-2 border border-black">CHILD.{index + 1} NAME</td>
                            <td className="p-2 border border-black">
                                <input
                                    type="text"
                                    value={child.name}
                                    onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                                    className="w-full"
                                    placeholder={`Child ${index + 1} Name`}
                                />
                            </td>
                            <td className="p-2 border border-black">GENDER</td>
                            <td className="p-2 border border-black">
                                <select
                                    value={child.gender}
                                    onChange={(e) => handleChildChange(index, 'gender', e.target.value)}
                                    className="w-full"
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </td>
                            <td className="p-2 border border-black">DOB</td>
                            <td className="p-2 border border-black">
                                <input
                                    type="date"
                                    value={child.dob}
                                    onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                        </tr>
                    ))}

                    <tr className="border border-black">
                        <td className="p-2 border border-black">6</td>
                        <td className="p-2 border border-black">FATHER NAME / FATHER-IN-LAW</td>
                        <td className="p-2 border border-black" colSpan={3}>
                            <input
                                type="text"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Father or Father-in-law Name"
                            />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black">
                            <input
                                type="date"
                                name="fatherDob"
                                value={formData.fatherDob}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">7</td>
                        <td className="p-2 border border-black">MOTHER NAME / MOTHER-IN-LAW</td>
                        <td className="p-2 border border-black" colSpan={3}>
                            <input
                                type="text"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Mother or Mother-in-law Name"
                            />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black">
                            <input
                                type="date"
                                name="motherDob"
                                value={formData.motherDob}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">8</td>
                        <td className="p-2 border border-black">MOBILE NUMBER</td>
                        <td className="p-2 border border-black" colSpan={5}>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Mobile Number"
                            />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">9</td>
                        <td className="p-2 border border-black">ADDRESS</td>
                        <td className="p-2 border border-black" colSpan={5}>
                            <textarea
                                name="address"
                                value={form1data.currAddress}
                                onChange={handleChange}
                                className="w-full h-16"
                                placeholder="Full Address"
                                disabled={true}
                            ></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-between mt-7 text-sm">
                <div>
                    <span className="font-semibold">DATE:</span>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="ml-2 border p-1"
                    />
                </div>
                <div className="text-right mt-6 "> 
                    <p className="font-semibold">EMPLOYEE SIGNATURE</p>
                </div>
            </div>

            <p className="text-xs mt-4 italic text-red-700">
                Note: Combination of Father & Father in-law / Mother & Mother in law is not allowed
            </p>
            <div className="flex justify-center mt-2">
                <Button type='submit' className="mt-6 w-full">Submit</Button>
            </div>
        </form>
    );
}