"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { empFormData } from "@/hooks/Atoms";
import RequiredLabel from "../RequiredLabel";

type FormData = {
    companyName: string;
    name: string;
    designation: string;
    dateOfJoining: string;
    familyMembers: {
        name: string;
        relationship: string;
        dob: string;
        age: string;
    }[];
    nominees: {
        name: string;
        relationship: string;
        dob: string;
        percentage: string;
    }[];
    date: string;
};

export default function EmpForm4() {
    const [formData, setFormData] = useAtom(empFormData);

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFamilyChange = (
        index: number,
        field: keyof FormData['familyMembers'][0],
        value: string
    ) => {
        setFormData(prev => {
            const updatedFamily = [...prev.familyMembers];
            updatedFamily[index][field] = value;
            return { ...prev, familyMembers: updatedFamily };
        });
    };

    const handleNomineeChange = (
        index: number,
        field: keyof FormData['nominees'][0],
        value: string
    ) => {
        setFormData(prev => {
            const updatedNominees = [...prev.nominees];
            updatedNominees[index][field] = value;
            return { ...prev, nominees: updatedNominees };
        });
    };

    const addFamilyRow = () => {
        setFormData(prev => ({
            ...prev,
            familyMembers: [...prev.familyMembers, { name: "", relationship: "", dob: "", age: "" }]
        }));
    };

    const addNomineeRow = () => {
        setFormData(prev => ({
            ...prev,
            nominees: [...prev.nominees, { name: "", relationship: "", dob: "", percentage: "" }]
        }));
    };

    const removeFamilyRow = (index: number) => {
        setFormData(prev => ({
            ...prev,
            familyMembers: prev.familyMembers.filter((_, i) => i !== index)
        }));
    };

    const removeNomineeRow = (index: number) => {
        setFormData(prev => ({
            ...prev,
            nominees: prev.nominees.filter((_, i) => i !== index)
        }));
    };

    return (
        <div>
            <div className="text-right text-sm font-semibold mb-2">Annexure 3</div>
            <h2 className="text-center font-bold underline text-lg mb-6">
                FAMILY DECLARATION FORM
            </h2>

            <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <label className="w-1/3">Name of the Company</label>
                    <input
                        type="text"
                        className="border-b border-black dark:border-white flex-grow ml-4"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        disabled={true}
                    />
                </div>

                <div className="flex justify-between">
                    <label className="w-1/3">Employee Name</label>
                    <input
                        type="text"
                        className="border-b border-black dark:border-white flex-grow ml-4"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={true}
                    />
                </div>

                <div className="flex justify-between items-center">
                <label htmlFor="designation" className="w-1/5">Designation</label>
                    <input
                        type="text"
                        className="border-b border-black dark:border-white w-[30%] ml-4 focus:outline-none"
                        value={formData.designation}
                        id="designation"
                        onChange={(e) => handleChange('designation', e.target.value)}
                        required
                        disabled={true}
                    />
                   <RequiredLabel> <label htmlFor="dateOfJoining" className="ml-4">Date of Joining</label></RequiredLabel>
                    <input
                        type="date"
                        className="border-b border-black dark:border-white w-[25%] focus:outline-none"
                        value={formData.dateOfJoining}
                        id="dateOfJoining"
                        onChange={(e) => handleChange('dateOfJoining', e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Family Member Table */}
            <div className="mt-6 text-sm">
                <table className="w-full border border-black dark:border-white text-center">
                    <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800">
                            <th className="border border-black dark:border-white px-2">S. No.</th>
                            <th className="border border-black dark:border-white px-2">Name</th>
                            <th className="border border-black dark:border-white px-2">Relationship</th>
                            <th className="border border-black dark:border-white px-2">Date of Birth</th>
                            <th className="border border-black dark:border-white px-2">Age</th>
                            <th className="border border-black dark:border-white px-2">Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {formData.familyMembers.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-black dark:border-white">{index + 1}</td>
                                <td className="border border-black dark:border-white">
                                    <input
                                        type="text"
                                        className="w-full outline-none px-2"
                                        value={row.name}
                                        onChange={(e) => handleFamilyChange(index, 'name', e.target.value)}
                                        required={index===0}
                                        
                                    />
                                </td>
                                <td className="border border-black dark:border-white">
                                    <input
                                        type="text"
                                        className="w-full outline-none px-2"
                                        value={row.relationship}
                                        onChange={(e) => handleFamilyChange(index, 'relationship', e.target.value)}
                                        required={index===0}
                                    />
                                </td>
                                <td className="border border-black dark:border-white">
                                    <input
                                        type="date"
                                        className="w-full outline-none px-2"
                                        value={row.dob}
                                        onChange={(e) => handleFamilyChange(index, 'dob', e.target.value)}
                                        required={index===0}
                                    />
                                </td>
                                <td className="border border-black dark:border-white">
                                    <input
                                        type="number"
                                        className="w-full outline-none px-2"
                                        value={row.age}
                                        onChange={(e) => handleFamilyChange(index, 'age', e.target.value)}
                                        required={index===0}
                                    min={0} // Ensure age is a positive number
                                    />
                                </td>
                                <td className="border border-black dark:border-white">
                                    {index !== 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFamilyRow(index)}
                                            className="text-red-600 font-semibold cursor-pointer"
                                        >
                                            ❌
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={addFamilyRow}
                    className="px-3 py-[2px] my-1 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm mt-2"
                >
                    + Add Row
                </button>
            </div>

            {/* Nominee Declaration */}
            <p className="mt-6 text-sm">
                I hereby nominate the following person(s) to receive any amount payable to me by the company in case
                of my death:
            </p>

            <div className="mt-4 text-sm">
                <table className="w-full border border-black dark:border-white text-center">
                    <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800">
                            <th className="border border-black dark:border-white px-2">S. No.</th>
                            <th className="border border-black dark:border-white px-2">Name of the Nominee(s)</th>
                            <th className="border border-black dark:border-white px-2">Relationship</th>
                            <th className="border border-black dark:border-white px-2">Date of Birth</th>
                            <th className="border border-black dark:border-white px-2">%</th>
                            <th className="border border-black dark:border-white px-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.nominees.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-black dark:border-white">{index + 1}</td>
                                <td className="border border-black dark:border-white">
                                    <input
                                        type="text"
                                        className="w-full outline-none px-2"
                                        value={row.name}
                                        onChange={(e) => handleNomineeChange(index, 'name', e.target.value)}
                                        required={index===0}
                                    />
                                </td>
                                <td className="border border-black dark:border-white">
                                    <input
                                        type="text"
                                        className="w-full outline-none px-2"
                                        value={row.relationship}
                                        onChange={(e) => handleNomineeChange(index, 'relationship', e.target.value)}
                                        required={index===0}
                                    />
                                </td>
                                <td className="border border-black dark:border-white">
                                    <input
                                        type="date"
                                        className="w-full outline-none px-2"
                                        value={row.dob}
                                        onChange={(e) => handleNomineeChange(index, 'dob', e.target.value)}
                                        required={index===0}
                                    min={new Date().toISOString().split("T")[0]} // Ensure date is not in the future
                                    />
                                </td>
                                <td className="border border-black dark:border-white">
                                    <input
                                        type="number"
                                        className="w-full outline-none px-2"
                                        value={row.percentage}
                                        onChange={(e) => handleNomineeChange(index, 'percentage', e.target.value)}
                                        required={index===0}
                                    />
                                </td>
                                <td className="border border-black dark:border-white">
                                    {index !== 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeNomineeRow(index)}
                                            className="text-red-600 font-semibold cursor-pointer"
                                        >
                                            ❌
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={addNomineeRow}
                    className="px-3 py-[2px] my-1 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm mt-2"
                >
                    + Add Row
                </button>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-between items-end">
                <div>
                    Date: <input
                        type="date"
                        className="border-b border-black dark:border-white ml-2"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        disabled={true}
                    />
                </div>
                <div className="text-right">
                    <div className="border-t border-black dark:border-white w-64 mx-auto mt-6"></div>
                    <div className="text-sm text-center">(Signature of the employee)</div>
                </div>
            </div>
        </div>
    );
}