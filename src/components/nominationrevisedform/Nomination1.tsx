"use client";
import { nominationForm2Data } from '@/hooks/Atoms';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

type Nominee = {
    name: string;
    address: string;
    relationship: string;
    dob: string;
    share: string;
    guardianName: string;
    guardianAddress: string;
};

type FamilyMember = {
    name: string;
    address: string;
    age: string;
    relationship: string;
};

type FormData = {
    name: string;
    fathersName: string;
    surname: string;
    dob: string;
    accountNo: string;
    sex: string;
    maritalStatus: string;
    address: string;
    hasNoFamily: boolean;
    hasDependentParents: boolean;
    credit_nominees: Nominee[];
    familyMembers: FamilyMember[];
};

export default function EPFNominationForm() {
    const [formData, setFormData] = useAtom(nominationForm2Data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNomineeChange = (index: number, field: keyof Nominee, value: string) => {
        const updatedcredit_nominees = [...formData.credit_nominees];
        updatedcredit_nominees[index] = {
            ...updatedcredit_nominees[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            credit_nominees: updatedcredit_nominees
        }));
    };

    const handleFamilyMemberChange = (index: number, field: keyof FamilyMember, value: string) => {
        const updatedFamilyMembers = [...formData.familyMembers];
        updatedFamilyMembers[index] = {
            ...updatedFamilyMembers[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            familyMembers: updatedFamilyMembers
        }));
    };

    const addNominee = () => {
        setFormData(prev => ({
            ...prev,
            credit_nominees: [...prev.credit_nominees, { name: '', address: '', relationship: '', dob: '', share: '', guardianName: '', guardianAddress: '' }]
        }));
    };

    const addFamilyMember = () => {
        setFormData(prev => ({
            ...prev,
            familyMembers: [...prev.familyMembers, { name: '', address: '', age: '', relationship: '' }]
        }));
    };

    const removeNominee = (index: number) => {
        if (formData.credit_nominees.length > 1) {
            const updatedcredit_nominees = [...formData.credit_nominees];
            updatedcredit_nominees.splice(index, 1);
            setFormData(prev => ({
                ...prev,
                credit_nominees: updatedcredit_nominees
            }));
        }
    };

    const removeFamilyMember = (index: number) => {
        if (formData.familyMembers.length > 1) {
            const updatedFamilyMembers = [...formData.familyMembers];
            updatedFamilyMembers.splice(index, 1);
            setFormData(prev => ({
                ...prev,
                familyMembers: updatedFamilyMembers
            }));
        }
    };

    return (
        <div>
            <h1 className="text-center font-bold text-lg mb-2">(FORM 2 REVISED)</h1>
            <h2 className="text-center font-bold text-lg mb-6">NOMINATION AND DECLARATION FORM FOR UNEXEMPTED/EXEMPTED ESTABLISHMENTS</h2>

            <p className="mb-6 text-center">
                Declaration and Nomination Form under the Employees Provident Funds and Employees Pension Schemes<br />
                (Paragraph 33 and 61 (1) of the Employees Provident Fund Scheme 1952 and Paragraph 18 of the Employees Pension Scheme 1995)
            </p>

            {/* Personal Information Section */}
            <div className="space-y-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="w-full md:w-72">1. Name (IN BLOCK LETTERS):</label>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border-b border-black outline-none"
                            placeholder="Name"
                            required
                        />
                        <input
                            type="text"
                            name="fathersName"
                            value={formData.fathersName}
                            onChange={handleChange}
                            className="border-b border-black outline-none"
                            placeholder="Father's/Husband's Name"
                            required
                        />
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="border-b border-black outline-none"
                            placeholder="Surname"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <label className="w-full md:w-72">2. Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="flex-1 border-b border-black outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <label className="w-full md:w-72">3. Account No:</label>
                    <input
                        type="text"
                        name="accountNo"
                        value={formData.accountNo}
                        onChange={handleChange}
                        className="flex-1 border-b border-black outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <label className="w-full md:w-72">4. Sex:</label>
                    <div className="flex-1 flex gap-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="sex"
                                value="MALE"
                                checked={formData.sex === 'MALE'}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            MALE
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="sex"
                                value="FEMALE"
                                checked={formData.sex === 'FEMALE'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            FEMALE
                        </label>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <label className="w-full md:w-72">5. Marital Status:</label>
                    <input
                        type="text"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className="flex-1 border-b border-black outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <label className="w-full md:w-72">6. Address (Permanent/Temporary):</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="flex-1 border-b border-black outline-none h-16"
                        required
                    />
                </div>
            </div>

            {/* Part A - EPF Nomination */}
            <div className="mb-8">
                <h3 className="font-bold mb-4">PART – A (EPF)</h3>
                <p className="mb-4">
                    I hereby nominate the person(s)/cancel the nomination made by me previously and nominate the person(s) mentioned below to receive the amount standing to my credit in the Employees Provident Fund, in the event of my death.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full border border-black text-sm mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black p-2">Name of the Nominee(s)</th>
                                <th className="border border-black p-2">Address</th>
                                <th className="border border-black p-2">Nominee's relationship with the member</th>
                                <th className="border border-black p-2">Date of Birth</th>
                                <th className="border border-black p-2">Total amount or share of accumulations in Provident Funds to be paid to each nominee</th>
                                <th className="border border-black p-2">If the nominee is minor, name and address of the guardian who may receive the amount during the minority of the nominee</th>
                                <th className="border border-black p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.credit_nominees.map((nominee, index) => (
                                <tr key={index}>
                                    <td className="border border-black p-1">
                                        <input
                                            type="text"
                                            value={nominee.name}
                                            onChange={(e) => handleNomineeChange(index, 'name', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black p-1">
                                        <input
                                            type="text"
                                            value={nominee.address}
                                            onChange={(e) => handleNomineeChange(index, 'address', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black p-1">
                                        <input
                                            type="text"
                                            value={nominee.relationship}
                                            onChange={(e) => handleNomineeChange(index, 'relationship', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black p-1">
                                        <input
                                            type="date"
                                            value={nominee.dob}
                                            onChange={(e) => handleNomineeChange(index, 'dob', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black p-1">
                                        <input
                                            type="text"
                                            value={nominee.share}
                                            onChange={(e) => handleNomineeChange(index, 'share', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black p-1">
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                value={nominee.guardianName}
                                                onChange={(e) => handleNomineeChange(index, 'guardianName', e.target.value)}
                                                className="w-full outline-none border-b border-gray-300"
                                                placeholder="Guardian Name"
                                            />
                                            <input
                                                type="text"
                                                value={nominee.guardianAddress}
                                                onChange={(e) => handleNomineeChange(index, 'guardianAddress', e.target.value)}
                                                className="w-full outline-none"
                                                placeholder="Guardian Address"
                                            />
                                        </div>
                                    </td>
                                    <td className="border border-black p-1 text-center">
                                        {formData.credit_nominees.length > 1 && (<button
                                            type="button"
                                            onClick={() => removeNominee(index)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            disabled={formData.credit_nominees.length <= 1}
                                        >
                                            ❌
                                        </button>)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    type="button"
                    onClick={addNominee}
                    className="px-4 py-1 cursor-pointer bg-blue-100 text-blue-700 rounded mb-6 hover:bg-blue-200"
                >
                    + Add Nominee
                </button>

                <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            name="hasNoFamily"
                            checked={formData.hasNoFamily}
                            onChange={handleChange}
                            className="mt-1"
                        />
                        <label>
                            Certified that I have no family as defined in para 2 (g) of the Employees Provident Fund Scheme 1952 and should I acquire a family hereafter the above nomination should be deemed as cancelled.
                        </label>
                    </div>

                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            name="hasDependentParents"
                            checked={formData.hasDependentParents}
                            onChange={handleChange}
                            className="mt-1"
                        />
                        <label>
                            Certified that my father/mother is/are dependent upon me.
                        </label>
                    </div>

                    <p className="italic">Strike out whichever is not applicable</p>
                </div>

                <div className="flex justify-end mb-8">
                    <div className="w-64 border-t border-black text-center pt-2">
                        Signature/thumb impression of the subscriber
                    </div>
                </div>
            </div>

            {/* Part B - EPS Family Details */}
            <div className="mb-8">
                <h3 className="text-center font-bold mb-4">PART – (EPS) Para 18</h3>
                <p className="mb-4">
                    I hereby furnish below particulars of the members of my family who would be eligible to receive Widow/Children Pension in the event of my premature death in service.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full border border-black text-sm mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black p-2">Sr. No</th>
                                <th className="border border-black p-2">Name & Address of the Family Member</th>
                                <th className="border border-black p-2">Age</th>
                                <th className="border border-black p-2">Relationship with the member</th>
                                <th className="border border-black p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.familyMembers.map((member, index) => (
                                <tr key={index}>
                                    <td className="border border-black p-1 text-center">{index + 1}</td>
                                    <td className="border border-black p-1">
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                value={member.name}
                                                onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)}
                                                className="w-full outline-none border-b border-gray-300"
                                                placeholder="Name"
                                                required
                                            />
                                            <input
                                                type="text"
                                                value={member.address}
                                                onChange={(e) => handleFamilyMemberChange(index, 'address', e.target.value)}
                                                className="w-full outline-none"
                                                placeholder="Address"
                                                required
                                            />
                                        </div>
                                    </td>
                                    <td className="border border-black p-1">
                                        <input
                                            type="text"
                                            value={member.age}
                                            onChange={(e) => handleFamilyMemberChange(index, 'age', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black p-1">
                                        <input
                                            type="text"
                                            value={member.relationship}
                                            onChange={(e) => handleFamilyMemberChange(index, 'relationship', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black p-1 text-center">
                                        { formData.familyMembers.length > 1 &&(<button
                                            type="button"
                                            onClick={() => removeFamilyMember(index)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            disabled={formData.familyMembers.length <= 1}
                                        >
                                            ❌
                                        </button>)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    type="button"
                    onClick={addFamilyMember}
                    className="px-4 py-1 cursor-pointer bg-blue-100 text-blue-700 rounded mb-6 hover:bg-blue-200"
                >
                    + Add Family Member
                </button>
            </div>
        </div>
    );
}