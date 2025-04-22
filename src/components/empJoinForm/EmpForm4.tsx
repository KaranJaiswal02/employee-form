"use client";
import { useState } from "react";

// ✅ Define types for each row
type FamilyRow = {
    name: string;
    relationship: string;
    dob: string;
    age: string;
};

type NomineeRow = {
    name: string;
    relationship: string;
    dob: string;
    percentage: string;
};

export default function EmpForm4() {
    const [familyRows, setFamilyRows] = useState<FamilyRow[]>([
        { name: '', relationship: '', dob: '', age: '' },
    ]);

    const [nomineeRows, setNomineeRows] = useState<NomineeRow[]>([
        { name: '', relationship: '', dob: '', percentage: '' },
    ]);

    // ✅ Now 'field' is typed correctly using keyof
    const handleFamilyChange = (
        index: number,
        field: keyof FamilyRow,
        value: string
    ) => {
        const updated = [...familyRows];
        updated[index][field] = value;
        setFamilyRows(updated);
    };

    const handleNomineeChange = (
        index: number,
        field: keyof NomineeRow,
        value: string
    ) => {
        const updated = [...nomineeRows];
        updated[index][field] = value;
        setNomineeRows(updated);
    };

    const addFamilyRow = () => {
        setFamilyRows([...familyRows, { name: '', relationship: '', dob: '', age: '' }]);
    };

    const addNomineeRow = () => {
        setNomineeRows([...nomineeRows, { name: '', relationship: '', dob: '', percentage: '' }]);
    };

    const removeFamilyRow = (index: number) => {
        const updated = familyRows.filter((_, i) => i !== index);
        setFamilyRows(updated);
    };

    const removeNomineeRow = (index: number) => {
        const updated = nomineeRows.filter((_, i) => i !== index);
        setNomineeRows(updated);
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
                    <input type="text" className="border-b border-black flex-grow ml-4" />
                </div>

                <div className="flex justify-between">
                    <label className="w-1/3">Employee Name</label>
                    <input type="text" className="border-b border-black flex-grow ml-4" />
                </div>

                <div className="flex justify-between items-center">
                    <label className="w-1/3">Designation</label>
                    <input type="text" className="border-b border-black w-[35%]" />
                    <label className="ml-6">Date of Joining</label>
                    <input type="date" className="border-b border-black w-[30%]" />
                </div>
            </div>

            {/* Family Member Table */}
            <div className="mt-6 text-sm">
                <table className="w-full border border-black text-center">
                    <thead>
                        <tr className="border border-black">
                            <th className="border border-black px-2">S. No.</th>
                            <th className="border border-black px-2">Name</th>
                            <th className="border border-black px-2">Relationship</th>
                            <th className="border border-black px-2">Date of Birth</th>
                            <th className="border border-black px-2">Age</th>
                            <th className="border border-black px-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {familyRows.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-black">{index + 1}</td>
                                <td className="border border-black">
                                    <input
                                        type="text"
                                        className="w-full outline-none px-2"
                                        value={row.name}
                                        onChange={(e) => handleFamilyChange(index, 'name', e.target.value)}
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        type="text"
                                        className="w-full outline-none px-2"
                                        value={row.relationship}
                                        onChange={(e) => handleFamilyChange(index, 'relationship', e.target.value)}
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        type="date"
                                        className="w-full outline-none px-2"
                                        value={row.dob}
                                        onChange={(e) => handleFamilyChange(index, 'dob', e.target.value)}
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        type="number"
                                        className="w-full outline-none px-2"
                                        value={row.age}
                                        onChange={(e) => handleFamilyChange(index, 'age', e.target.value)}
                                    />
                                </td>
                                <td className="border border-black">
                                {index !== 0 && (<button
                                        onClick={() => removeFamilyRow(index)}
                                        className="text-red-600 font-semibold cursor-pointer"
                                    >
                                        ❌
                                    </button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={addFamilyRow}
                    className="px-3 py-[1px] my-1 cursor-pointer bg-blue-100 text-blue-700 rounded mb-6 hover:bg-blue-200"
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
                <table className="w-full border border-black text-center">
                    <thead>
                        <tr>
                            <th className="border border-black px-2">S. No.</th>
                            <th className="border border-black px-2">Name of the Nominee(s)</th>
                            <th className="border border-black px-2">Relationship</th>
                            <th className="border border-black px-2">Date of Birth</th>
                            <th className="border border-black px-2">%</th>
                            <th className="border border-black px-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nomineeRows.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-black">{index + 1}</td>
                                <td className="border border-black">
                                    <input
                                        type="text"
                                        className="w-full outline-none px-2"
                                        value={row.name}
                                        onChange={(e) => handleNomineeChange(index, 'name', e.target.value)}
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        type="text"
                                        className="w-full outline-none px-2"
                                        value={row.relationship}
                                        onChange={(e) => handleNomineeChange(index, 'relationship', e.target.value)}
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        type="date"
                                        className="w-full outline-none px-2"
                                        value={row.dob}
                                        onChange={(e) => handleNomineeChange(index, 'dob', e.target.value)}
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        type="number"
                                        className="w-full outline-none px-2"
                                        value={row.percentage}
                                        onChange={(e) => handleNomineeChange(index, 'percentage', e.target.value)}
                                    />
                                </td>
                                <td className="border border-black">
                                {index !== 0 && (<button
                                        onClick={() => removeNomineeRow(index)}
                                        className="text-red-600 font-semibold cursor-pointer"
                                    >
                                        ❌
                                    </button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={addNomineeRow}
                    className="px-3 py-[1px] my-1 cursor-pointer bg-blue-100 text-blue-700 rounded mb-6 hover:bg-blue-200"
                >
                    + Add Row
                </button>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-between items-end">
                <div>
                    Date: <input type="date" className="border-b border-black ml-2" />
                </div>
                <div className="text-right">
                    <div className="border-t border-black w-64 mx-auto mt-6"></div>
                    <div className="text-sm text-center">(Signature of the employee)</div>
                </div>
            </div>
        </div>
    );
}
