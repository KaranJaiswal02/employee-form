"use client";
import { useAtom } from "jotai";
import { empFormData } from "@/hooks/Atoms";
import RequiredLabel from "../RequiredLabel";

type MemberRow = {
    name: string;
    relationship: string;
    dob: string;
    age: string;
    amount: string;
};

export default function EmpForm5() {
    const [formData, setFormData] = useAtom(empFormData);

    const handleEmployeeInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMemberChange = (
        index: number,
        field: keyof MemberRow,
        value: string
    ) => {
        setFormData(prev => {
            const updatedMembers = [...prev.members];
            updatedMembers[index] = { ...updatedMembers[index], [field]: value };
            return {
                ...prev,
                members: updatedMembers
            };
        });
    };

    const addMember = () => {
        setFormData(prev => ({
            ...prev,
            members: [
                ...prev.members,
                { name: "", relationship: "", dob: "", age: "", amount: "" }
            ]
        }));
    };

    const removeMember = (index: number) => {
        if (index === 0) return;
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="text-sm">
            <div className="text-right font-semibold mb-2">Annexure 5</div>
            <h2 className="text-center font-bold underline text-lg mb-6">
                MEDICLAIM PROPOSAL
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                    <label className="font-semibold">NAME:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleEmployeeInfoChange}
                        disabled={true}
                        className="ml-0 border-b border-black outline-none"
                    />
                </div>
                <div>
                    <label className="font-semibold">CODE:</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleEmployeeInfoChange}
                        className="ml-2 border-b border-black outline-none"
                    />
                </div>
                <div>
                    <label className="font-semibold">GRADE:</label>
                    <input
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={handleEmployeeInfoChange}
                        className="ml-2 border-b border-black outline-none"
                    />
                </div>

                <div className="w-1 flex items-end gap-2 mb-4">
                    <label className=" font-semibold whitespace-nowrap">
                        <RequiredLabel>Deptt:</RequiredLabel>
                    </label>
                    <input
                        type="text"
                        id="department"
                        value={formData.department}
                        onChange={handleEmployeeInfoChange}
                        className=" flex-1 border-b border-black pb-1 focus:outline-none "
                        required
                    />
                </div>

            </div>

            <p className="mb-4">
                I request you to kindly include myself and my family members in the
                Group Mediclaim Scheme of the Company as per the details given below:
            </p>

            {/* Table */}
            <table className="w-full border border-black text-sm">
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
                    {formData.members.map((member, index) => (
                        <tr key={index}>
                            <td className="border border-black p-1 text-center">{index + 1}</td>
                            <td className="border border-black p-1">
                                <input
                                    type="text"
                                    value={member.name}
                                    className="w-full outline-none"
                                    onChange={(e) =>
                                        handleMemberChange(index, "name", e.target.value)
                                    }
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="text"
                                    value={member.relationship}
                                    className="w-full outline-none"
                                    onChange={(e) =>
                                        handleMemberChange(index, "relationship", e.target.value)
                                    }
                                    disabled={index === 0}
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="date"
                                    value={member.dob}
                                    className="w-full outline-none"
                                    onChange={(e) => handleMemberChange(index, "dob", e.target.value)}
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="number"
                                    value={member.age}
                                    className="w-full outline-none"
                                    onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                                />
                            </td>
                            <td className="border border-black p-1">
                                <input
                                    type="number"
                                    value={member.amount}
                                    className="w-full outline-none"
                                    onChange={(e) => handleMemberChange(index, "amount", e.target.value)}
                                />
                            </td>
                            <td className="border border-black text-center">
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMember(index)}
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
                onClick={addMember}
                className="px-3 py-[1px] my-1 cursor-pointer bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
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
                        onChange={handleEmployeeInfoChange}
                        disabled={true}
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
                    Please refer to Appointment letter/Revision letter for eligibility
                </p>
            </div>
        </div>
    );
}