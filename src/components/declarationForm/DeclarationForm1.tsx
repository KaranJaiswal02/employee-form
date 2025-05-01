"use client";

import React, { useState } from "react";
// import EmployerCertification from "./page2";

// export default function Page() {
//   return (
//     <>
//       <NominationForm />
//       <EmployerCertification />
//     </>
//   );
// }

interface Nominee {
    name: string;
    address: string;
    relationship: string;
    dob: string;
    share: string;
    guardian: string;
}

export default function DeclarationForm1() {
    const [nominees, setNominees] = useState<Nominee[]>([
        { name: "", address: "", relationship: "", dob: "", share: "", guardian: "" },
    ]);

    const handleChange = (index: number, field: keyof Nominee, value: string) => {
        const updated = [...nominees];
        updated[index][field] = value;
        setNominees(updated);
    };

    const addRow = () => {
        setNominees([
            ...nominees,
            { name: "", address: "", relationship: "", dob: "", share: "", guardian: "" },
        ]);
    };

    const removeRow = (index: number) => {
        const updated = nominees.filter((_, i) => i !== index);
        setNominees(updated);
    };

    return (
        <div >
            {/* Form Header */}
            <div className="text-center">
                <h2 className="font-bold text-lg">FORM I</h2>
                <p className="text-sm">[See Rule 3]</p>
                <h3 className="font-semibold text-base underline mt-2">
                    Nomination and Declaration Form
                </h3>
            </div>

            {/* Static Inputs */}
            <div className="space-y-4 text-sm">
                <div className="flex items-center gap-4">
                    <label className="w-64 font-medium">1. Name of person making nomination:</label>
                    <input
                        type="text"
                        placeholder="(In Block letters)"
                        className="flex-1 border border-gray-400 px-2 py-1"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-64 font-medium">2. Father’s/Husband’s Name:</label>
                    <input type="text" className="flex-1 border border-gray-400 px-2 py-1" />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-64 font-medium">3. Date of Birth:</label>
                    <input type="date" className="flex-1 border border-gray-400 px-2 py-1" />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-64 font-medium">4. Sex:</label>
                    <select className="flex-1 border border-gray-400 px-2 py-1">
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-64 font-medium">5. Marital Status:</label>
                    <select className="flex-1 border border-gray-400 px-2 py-1">
                        <option value="">Select</option>
                        <option>Single</option>
                        <option>Married</option>
                        <option>Divorced</option>
                        <option>Widowed</option>
                    </select>
                </div>
                <div className="flex items-start gap-4">
                    <label className="w-64 font-medium mt-1">6. Address:</label>
                    <div className="flex-1 space-y-2">
                        <textarea
                            placeholder="Permanent"
                            className="w-full border border-gray-400 px-2 py-1"
                            rows={2}
                        />
                        <textarea
                            placeholder="Temporary"
                            className="w-full border border-gray-400 px-2 py-1"
                            rows={2}
                        />
                    </div>
                </div>
            </div>

            <p className="text-sm mt-6">
                I hereby nominated the person(s)/cancel the nomination made by me previously and nominate the person(s)
                mentioned below to receive any amount due to me from the employer, in the event of my death:
            </p>

            {/* Dynamic Nominee Table */}
            <div className="overflow-x-auto mt-4">
                <table className="w-full border border-black text-sm text-center">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="border border-black px-2 py-1">Name of Nominee</th>
                            <th className="border border-black px-2 py-1">Address</th>
                            <th className="border border-black px-2 py-1">Relationship</th>
                            <th className="border border-black px-2 py-1">Date of Birth</th>
                            <th className="border border-black px-2 py-1">Share Amount</th>
                            <th className="border border-black px-2 py-1">Guardian Info (if minor)</th>
                            <th className="border border-black px-2 py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nominees.map((nominee, index) => (
                            <tr key={index}>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="text"
                                        className="w-full px-1 py-1 border border-gray-300"
                                        value={nominee.name}
                                        onChange={(e) => handleChange(index, "name", e.target.value)}
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="text"
                                        className="w-full px-1 py-1 border border-gray-300"
                                        value={nominee.address}
                                        onChange={(e) => handleChange(index, "address", e.target.value)}
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="text"
                                        className="w-full px-1 py-1 border border-gray-300"
                                        value={nominee.relationship}
                                        onChange={(e) => handleChange(index, "relationship", e.target.value)}
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="date"
                                        className="w-full px-1 py-1 border border-gray-300"
                                        value={nominee.dob}
                                        onChange={(e) => handleChange(index, "dob", e.target.value)}
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="text"
                                        className="w-full px-1 py-1 border border-gray-300"
                                        value={nominee.share}
                                        onChange={(e) => handleChange(index, "share", e.target.value)}
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <textarea
                                        rows={2}
                                        className="w-full px-1 py-1 border border-gray-300"
                                        value={nominee.guardian}
                                        onChange={(e) => handleChange(index, "guardian", e.target.value)}
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    {nominees.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeRow(index)}
                                            className="text-red-600 font-semibold"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right mt-4">
                    <button
                    type="button"
                    onClick={addRow}
                    className="px-4 py-1 bg-blue-100 text-blue-700 rounded mb-6 hover:bg-blue-200"
                >
                    + Add Nominee
                </button>
                </div>
            </div>
        </div>
    );
}

