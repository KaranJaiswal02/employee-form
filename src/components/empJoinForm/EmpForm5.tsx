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
        <div>
            <div className="flex justify-between items-start mb-1">
                <img src="/assets/images/logo.png" alt="Company Logo" className="h-8 brightness-100 dark:brightness-150" />
                <span className="font-semibold">Annexure5</span>
            </div>

            <div className="text-sm">
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
                            className="ml-0 border-b border-black dark:border-white outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="code" className="font-semibold">CODE:</label>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={formData.code}
                            onChange={handleEmployeeInfoChange}
                            className="ml-2 border-b border-black dark:border-white outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="grade" className="font-semibold">GRADE:</label>
                        <input
                            type="text"
                            name="grade"
                            id="grade"
                            value={formData.grade}
                            onChange={handleEmployeeInfoChange}
                            className="ml-2 border-b border-black dark:border-white outline-none"
                        />
                    </div>

                    <div className="w-1 flex items-end gap-2 mb-4">
                        <label htmlFor="department" className=" font-semibold whitespace-nowrap">
                            <RequiredLabel>Dept:</RequiredLabel>
                        </label>
                        <input
                            type="text"
                            id="department"
                            value={formData.department}
                            onChange={handleEmployeeInfoChange}
                            className=" flex-1 border-b border-black dark:border-white pb-1 focus:outline-none "
                            required
                        />
                    </div>

                </div>

                <p className="mb-4">
                    I request you to kindly include myself and my family members in the
                    Group Mediclaim Scheme of the Company as per the details given below:
                </p>

                {/* Table */}
                <table className="w-full border border-black dark:border-white text-sm">
                    <thead className="">
                        <tr className="bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100">
                            <th className="border border-black dark:border-white p-1 font-semibold">Sl. No</th>
                            <th className="border border-black dark:border-white p-1 font-semibold">Name</th>
                            <th className="border border-black dark:border-white p-1 font-semibold">Relationship</th>
                            <th className="border border-black dark:border-white p-1 font-semibold">DOB</th>
                            <th className="border border-black dark:border-white p-1 font-semibold">Age</th>
                            <th className="border border-black dark:border-white p-1 font-semibold">Insured Amount (Rs.)</th>
                            <th className="border print:hidden border-black dark:border-white p-1 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.members.map((member, index) => (
                            <tr key={index}>
                                <td className="border border-black dark:border-white p-1 text-center">{index + 1}</td>
                                <td className="border border-black dark:border-white p-1">
                                    <input
                                        type="text"
                                        value={member.name}
                                        className="w-full outline-none"
                                        onChange={(e) =>
                                            handleMemberChange(index, "name", e.target.value)

                                        }
                                        required={index === 0}
                                    />
                                </td>
                                <td className="border border-black dark:border-white p-1">
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
                                <td className="border border-black dark:border-white p-1">
                                    <input
                                        type="date"
                                        value={member.dob?.toString().split('T')[0] ?? ''}
                                        className="w-full outline-none"
                                        onChange={(e) => handleMemberChange(index, "dob", e.target.value)}
                                        required={index === 0}
                                    />
                                </td>
                                <td className="border border-black dark:border-white p-1">
                                    <input
                                        type="number"
                                        value={member.age}
                                        className="w-full outline-none"
                                        onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                                        required={index === 0}
                                    />
                                </td>
                                <td className="border border-black dark:border-white p-1">
                                    <input
                                        type="number"
                                        value={member.amount}
                                        className="w-full outline-none"
                                        onChange={(e) => handleMemberChange(index, "amount", e.target.value)}
                                        required={index === 0}
                                    />
                                </td>
                                <td className="border print:hidden border-black dark:border-white text-center">
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
                    className="print:hidden px-3 py-[2px] my-1 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm mt-2"
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
                            value={formData.date?.toString().split('T')[0] ?? ''}
                            onChange={handleEmployeeInfoChange}
                            disabled={true}
                            className=" border-black dark:border-white outline-none ml-2 font-semibold"
                        />
                    </div>
                    <div className="text-center font-semibold border-t print:mt-6 border-black dark:border-white w-[220px] ">
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
        </div>
    );
}