"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import { empFormData } from "@/hooks/Atoms";
import { useEffect } from "react";

type MemberRow = {
    name: string;
    relationship: string;
    dob: string;
    age: string;
    amount: string;
};

export default function EmpForm5() {
    const [empData] = useAtom(empFormData);
    const [formData, setFormData] = useState({
        name: empData.name || "",
        code: "",
        grade: "",
        dept: "",
        date: "",
    });
    const [rows, setRows] = useState<MemberRow[]>([
        {
            name: empData.name || "",
            relationship: "SELF",
            dob: "",
            age: "",
            amount: "",
        },
    ]);

    useEffect(() => {
        // Update the name in the first row when empData.name changes
        setRows(prevRows => {
            const updated = [...prevRows];
            if (updated.length > 0) {
                updated[0] = { ...updated[0], name: empData.name || "" };
            }
            return updated;
        });
    }, [empData.name]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRowChange = (
        index: number,
        field: keyof MemberRow,
        value: string
    ) => {
        setRows(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const addRow = () => {
        setRows(prev => [
            ...prev,
            { name: "", relationship: "", dob: "", age: "", amount: "" },
        ]);
    };

    const removeRow = (index: number) => {
        if (index === 0) return; // prevent removal of SELF row
        setRows(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="text-sm">
            <div className="text-right font-semibold mb-2">Annexure 5</div>
            <h2 className="text-center font-bold underline text-lg mb-6">
                MEDICLAIM PROPOSAL
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="font-semibold">NAME:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="ml-2 border-b border-black outline-none"
                    />
                </div>
                <div>
                    <label className="font-semibold">CODE:</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleFormChange}
                        className="ml-2 border-b border-black outline-none"
                    />
                </div>
                <div>
                    <label className="font-semibold">GRADE:</label>
                    <input
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={handleFormChange}
                        className="ml-2 border-b border-black outline-none"
                    />
                </div>
                <div>
                    <label className="font-semibold">DEPT:</label>
                    <input
                        type="text"
                        name="dept"
                        value={formData.dept}
                        onChange={handleFormChange}
                        className="ml-2 border-b border-black outline-none"
                    />
                </div>
            </div>

            <p className="mb-4">
                I request you to kindly include myself and my family members in the
                Group Mediclaim Scheme of the Company as per the details given below:
            </p>

            {/* Table */}
            <table className="w-full border border-black text-sm mb-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-black p-1 font-semibold">Sl. No</th>
                        <th className="border border-black p-1 font-semibold">Name</th>
                        <th className="border border-black p-1 font-semibold">Relationship</th>
                        <th className="border border-black p-1 font-semibold">DOB</th>
                        <th className="border border-black p-1 font-semibold">Age</th>
                        <th className="border border-black p-1 font-semibold">Insured Amount (Rs.)</th>
                        <th className="border border-black p-1 font-semibold">Actions</th>
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
                                        handleRowChange(index, "name", e.target.value)
                                    }
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="text"
                                    value={row.relationship}
                                    className="w-full outline-none"
                                    onChange={(e) =>
                                        handleRowChange(index, "relationship", e.target.value)
                                    }
                                    disabled={index === 0}
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="date"
                                    value={row.dob}
                                    className="w-full outline-none"
                                    onChange={(e) => handleRowChange(index, "dob", e.target.value)}
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="number"
                                    value={row.age}
                                    className="w-full outline-none"
                                    onChange={(e) => handleRowChange(index, "age", e.target.value)}
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="number"
                                    value={row.amount}
                                    className="w-full outline-none"
                                    onChange={(e) => handleRowChange(index, "amount", e.target.value)}
                                />
                            </td>
                            <td className="border border-black text-center">
                                {index !== 0 && (
                                    <button
                                        onClick={() => removeRow(index)}
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
                onClick={addRow}
                className="px-3 py-[1px] my-1 cursor-pointer bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-semibold"
            >
                + Add Row
            </button>

            {/* Footer */}
            <div className="flex justify-between mt-8">
                <div className="flex items-center">
                    <span className="font-semibold">Date:</span>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        className="border-b border-black outline-none ml-2"
                    />
                </div>
                <div className="text-right font-semibold">
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