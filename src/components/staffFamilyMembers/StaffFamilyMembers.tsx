"use client";
import { staffFamilyFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import RequiredLabel from "@/components/RequiredLabel";

type Child = {
    name: string;
    gender: string;
    dob: string;
};

export default function StaffFamilyMembers() {
    const [formData, setFormData] = useAtom(staffFamilyFormData);

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

    return (
        <>
            <h2 className="text-center text-lg font-semibold border-b border-black dark:border-white pb-2 mb-4">
                STAFF FAMILY MEMBERS DETAILS - MEDICAL INSURANCE
            </h2>

            <table className="w-full border border-black dark:border-white text-left text-sm">
                <tbody>
                    <tr className="border border-black dark:border-white">
                        <td className="p-2 border border-black dark:border-white">1</td>
                        <td className="p-2 border border-black dark:border-white">EMP. NO</td>
                        <td className="p-2 border border-black dark:border-white">
                            <input
                                type="text"
                                name="empNo"
                                value={formData.empNo}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Employee Number"
                            />
                        </td>
                        <td className="p-2 border border-black dark:border-white">Emp. Name</td>
                        <td className="p-2 border border-black dark:border-white" colSpan={4}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Employee Name "
                                disabled={true}
                            />
                        </td>
                    </tr>

                    <tr className="border border-black dark:border-white">
                        <td></td>
                        <td className="p-2 border border-black dark:border-white">DEPARTMENT</td>
                        <td className="p-2 border border-black dark:border-white">
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Department"
                                disabled={true}
                            />
                        </td>
                        <td className="p-2 border border-black dark:border-white">DOB</td>
                        <td className="p-2 border border-black dark:border-white">
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob.toString().split('T')[0]}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                disabled={true}
                            />
                        </td>
                        <td className="p-2 border border-black dark:border-white">AGE</td>
                        <td className="p-2 border border-black dark:border-white">
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Age"
                                disabled={true}
                            />
                        </td>
                    </tr>
                    <tr className="border border-black dark:border-white">
                        <td></td>
                        <td className="p-2 border border-black dark:border-white">
                            <RequiredLabel><label htmlFor="maritalStatus">
                                MARITAL STATUS
                            </label>
                            </RequiredLabel>
                        </td>
                        <td className="p-2 border border-black dark:border-white" colSpan={5}>
                            <input
                                type="text"
                                id="maritalStatus"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                placeholder="MARRIED / SINGLE"
                                className="w-full focus:outline-none"
                            />
                        </td>
                    </tr>


                    <tr className="border border-black dark:border-white">
                        <td className="p-2 border border-black dark:border-white">2</td>
                        <td className="p-2 border border-black dark:border-white">SPOUSE NAME</td>
                        <td className="p-2 border border-black dark:border-white" colSpan={2}>
                            <input
                                type="text"
                                name="spouseName"
                                value={formData.spouseName}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Spouse Name"
                            />
                        </td>
                        <td className="p-2 border border-black dark:border-white">DOB</td>
                        <td className="p-2 border border-black dark:border-white" colSpan={2}>
                            <input
                                type="date"
                                name="spouseDob"
                                value={formData.spouseDob.toString().split('T')[0]}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                        </td>
                    </tr>

                    <tr className="border border-black dark:border-white">
                        <td className="p-2 border border-black dark:border-white">3</td>
                        <td className="p-2 border border-black dark:border-white">NO. OF CHILD</td>
                        <td className="p-2 border border-black dark:border-white" colSpan={5}>
                            <input
                                type="number"
                                name="numOfChildren"
                                value={formData.numOfChildren}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Number of Children, if none, enter 0"
                            />
                        </td>
                    </tr>

                    {formData.children.map((child, index) => (
                        <tr key={index} className="border border-black dark:border-white">
                            <td className="p-2 border border-black dark:border-white">{index + 4}</td>
                            <td className="p-2 border border-black dark:border-white">CHILD.{index + 1} NAME</td>
                            <td className="p-2 border border-black dark:border-white">
                                <input
                                    type="text"
                                    value={child.name}
                                    onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                                    className="w-full focus:outline-none"
                                    placeholder={`Child ${index + 1} Name`}
                                />
                            </td>
                            <td className="p-2 border border-black dark:border-white">GENDER</td>
                            <td className="p-2 border border-black dark:border-white">
                                <select
                                    value={child.gender}
                                    onChange={(e) => handleChildChange(index, 'gender', e.target.value)}
                                    className="w-full focus:outline-none"
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </td>
                            <td className="p-2 border border-black dark:border-white">DOB</td>
                            <td className="p-2 border border-black dark:border-white">
                                <input
                                    type="date"
                                    value={child.dob.toString().split('T')[0]}
                                    onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
                                    className="w-full focus:outline-none"
                                />
                            </td>
                        </tr>
                    ))}

                    <tr className="border border-black dark:border-white">
                        <td className="p-2 border border-black dark:border-white">6</td>

                        <td className="p-2 border border-black dark:border-white">
                            <RequiredLabel><label htmlFor="fatherName">
                                FATHER NAME / FATHER-IN-LAW
                            </label></RequiredLabel>
                        </td>

                        <td className="p-2 border border-black dark:border-white" colSpan={3}>
                            <input
                                type="text"
                                id="fatherName"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Father or Father-in-law Name"
                                required
                            />
                        </td>

                        <td className="p-2 border border-black dark:border-white focus:outline-none">
                            <RequiredLabel><label htmlFor="fatherDob">
                                DOB
                            </label></RequiredLabel>
                        </td>

                        <td className="p-2 border border-black dark:border-white ">
                            <input
                                type="date"
                                id="fatherDob"
                                name="fatherDob"
                                value={formData.fatherDob.toString().split('T')[0]}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                required
                            />
                        </td>
                    </tr>

                    <tr className="border border-black dark:border-white">
                        <td className="p-2 border border-black dark:border-white">7</td>

                        <td className="p-2 border border-black dark:border-white">
                            <RequiredLabel><label htmlFor="motherName">
                                MOTHER NAME / MOTHER-IN-LAW
                            </label></RequiredLabel>
                        </td>

                        <td className="p-2 border border-black dark:border-white" colSpan={3}>
                            <input
                                type="text"
                                id="motherName"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Mother or Mother-in-law Name"
                                required
                            />
                        </td>

                        <td className="p-2 border border-black dark:border-white">
                            <RequiredLabel> <label htmlFor="motherDob">
                                DOB
                            </label></RequiredLabel>
                        </td>

                        <td className="p-2 border border-black dark:border-white">
                            <input
                                type="date"
                                id="motherDob"
                                name="motherDob"
                                value={formData.motherDob.toString().split('T')[0]}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                        </td>
                    </tr>

                    <tr className="border border-black dark:border-white">
                        <td className="p-2 border border-black dark:border-white">8</td>

                        <td className="p-2 border border-black dark:border-white">
                        <RequiredLabel><label htmlFor="mobileNumber">
                                MOBILE NUMBER
                            </label></RequiredLabel>
                        </td>

                        <td className="p-2 border border-black dark:border-white" colSpan={5}>
                            <input
                                type="tel"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                placeholder="Mobile Number"
                            />
                        </td>
                    </tr>

                    <tr className="border border-black dark:border-white">
                        <td className="p-2 border border-black dark:border-white">9</td>

                        <td className="p-2 border border-black dark:border-white">
                            <label htmlFor="address">
                                <RequiredLabel>ADDRESS</RequiredLabel>
                            </label>
                        </td>

                        <td className="p-2 border border-black dark:border-white" colSpan={5}>
                            <textarea
                                id="familyAddress"
                                name="familyAddress"
                                value={formData.familyAddress}
                                onChange={handleChange}
                                className="w-full h-16 focus:outline-none"
                                placeholder="Full Address"
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
                        value={formData.date.toString().split('T')[0]}
                        onChange={handleChange}
                        className="ml-2 p-1 focus:outline-none"
                        disabled={true}
                    />
                </div>
                <div className="text-right mt-6 ">
                    <p className="font-semibold">EMPLOYEE SIGNATURE</p>
                </div>
            </div>

            <p className="text-xs mt-4 italic text-red-700 print:hidden">
                Note: Combination of Father & Father in-law / Mother & Mother in law is not allowed
            </p>
        </>
    );
}