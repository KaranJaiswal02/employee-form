"use client";
import { useState } from "react";

type MemberRow = {
    name: string;
    relationship: string;
    dob: string;
    age: string;
    amount: string;
};

export default function EmpForm5() {
    const [rows, setRows] = useState<MemberRow[]>([
        {
            name: " ",
            relationship: "SELF",
            dob: "",
            age: "",
            amount: "",
        },
    ]);

    const handleChange = (
        index: number,
        field: keyof MemberRow,
        value: string
    ) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const addRow = () => {
        setRows([
            ...rows,
            { name: "", relationship: "", dob: "", age: "", amount: "" },
        ]);
    };

    const removeRow = (index: number) => {
        if (index === 0) return; // prevent removal of SELF row
        const updated = rows.filter((_, i) => i !== index);
        setRows(updated);
    };

    return (
        <div>
            <div className="text-right font-semibold">Annexure 5</div>
            <h1 className="text-center font-bold text-lg underline my-2">
                MEDICLAIM PROPOSAL
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-4 font-bold">
                <div>
                    NAME:
                    <input
                        type="text"
                        className="ml-2 border-b border-black outline-none font-thin"
                    />
                </div>
                <div>
                    CODE:
                    <input
                        type="text"
                        className="ml-2 border-b border-black outline-none font-thin"
                    />
                </div>
                <div>
                    GRADE:
                    <input
                        type="text"
                        className="ml-2 border-b border-black outline-none font-thin"
                    />
                </div>
                <div>
                    DEPT:
                    <input
                        type="text"
                        className="ml-2 border-b border-black outline-none font-thin"
                    />
                </div>
            </div>

            <p className="mb-2">
                I request you to kindly include myself and my family members in the
                Group Mediclaim Scheme of the Company as per the details given below:
            </p>

            {/* Table */}
            <table className="w-full border border-black text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-black p-1">Sl. No</th>
                        <th className="border border-black p-1">Name</th>
                        <th className="border border-black p-1">Relationship</th>
                        <th className="border border-black p-1">DOB</th>
                        <th className="border border-black p-1">Age</th>
                        <th className="border border-black p-1">Insured Amount (Rs.)</th>
                        <th className="border border-black p-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-black p-1 text-center">{index + 1}</td>
                            <td className="border border-black p-1">
                                <input
                                    type="text"
                                    value={row.name}
                                    className="w-full outline-none"
                                    onChange={(e) =>
                                        handleChange(index, "name", e.target.value)
                                    }
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="text"
                                    value={row.relationship}
                                    className="w-full outline-none"
                                    onChange={(e) =>
                                        handleChange(index, "relationship", e.target.value)
                                    }
                                    disabled={index === 0}
                                />
                            </td>

                            <td className="border border-black p-1">
                                <input
                                    type="date"
                                    value={row.dob}
                                    className="w-full outline-none"
                                    onChange={(e) => handleChange(index, "dob", e.target.value)}
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="number"
                                    value={row.age}
                                    className="w-full outline-none"
                                    onChange={(e) => handleChange(index, "age", e.target.value)}
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="number"
                                    value={row.amount}
                                    className="w-full outline-none"
                                    onChange={(e) => handleChange(index, "amount", e.target.value)}
                                />
                            </td>
                            <td className="border border-black text-center">
                                {index !== 0 && (
                                    <button
                                        onClick={() => removeRow(index)}
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
                onClick={addRow}
                className="px-3 py-[1px] my-1 cursor-pointer bg-blue-100 text-blue-700 rounded mb-6 hover:bg-blue-200"
            >
                + Add Row
            </button>

            {/* Footer */}
            <div className="flex justify-between mt-8">
                <div>
                    Date:{" "}
                    <input
                        type="text"
                        className="border-b border-black outline-none ml-2"
                    />
                </div>
                <div className="text-right">
                    Signature of Employee
                </div>
            </div>

            {/* Note */}
            <div className="mt-6 text-xs">
                <p className="font-bold">Note:</p>
                <p className="mt-1">
                    1) Please refer to Appointment letter/Revision letter for eligibility
                </p>
            </div>
        </div>
    );
}
