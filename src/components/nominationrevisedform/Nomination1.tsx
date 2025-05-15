"use client";
import { nominationForm2Data } from '@/hooks/Atoms';
import { useAtom } from 'jotai';


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
            <h1 className="text-center font-bold text-lg mb-1">(FORM 2 REVISED)</h1>
            <h2 className="text-center font-bold text-lg ">NOMINATION AND DECLARATION FORM FOR UNEXEMPTED/EXEMPTED ESTABLISHMENTS</h2>

            <p className="mb-6 text-center">
                Declaration and Nomination Form under the Employees Provident Funds and Employees Pension Schemes<br />
                (Paragraph 33 and 61 (1) of the Employees Provident Fund Scheme 1952 and Paragraph 18 of the Employees Pension Scheme 1995)
            </p>

            {/* Personal Information Section */}
            <div className="space-y-1.5 mb-6">
                <div className="flex flex-row gap-4" >
                    <label className="md:w-56 uppercase mt-1 font-semibold">1. Name (IN BLOCK LETTERS):</label>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white outline-none"
                            placeholder="First Name"
                            required
                            disabled={true}
                        />
                        <input
                            type="text"
                            name="MiddleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white outline-none"
                            placeholder="Middle Name"
                            required
                            disabled={true}
                        />
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white outline-none"
                            placeholder="Surname"
                            required
                            disabled={true}
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    {/* Father's/Husband's Name */}
                    <div className="flex flex-row gap-4 md:w-120">
                        <label className="md:w-56 mt-1 font-semibold">2. Father&rsquo;s/Husband&rsquo;s Name:</label>
                        <input
                            type="text"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white outline-none flex-1 max-w-60"
                            placeholder="Father's/Husband's Name"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-row gap-4 md:w-1/3">
                        <label className="md:w-32 font-semibold">3. Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob?.toString().split('T')[0] ?? ''}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white outline-none flex-1"
                            required
                            disabled={true}
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-4 mt-1">
                    {/* Account Number */}
                    <div className="flex flex-row gap-2 md:w-80">
                        <label className="text-sm md:w-35 mt-1 font-semibold">4. Account No:</label>
                        <input
                            type="text"
                            name="accountNo"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className="flex-1 border-b border-black dark:border-white outline-none"
                            required
                            disabled={true}
                        />
                    </div>

                    {/* Sex */}
                    <div className="flex flex-row gap-2 md:w-50">
                        <label htmlFor="sex" className="text-sm md:w-16 mt-1 font-semibold">5. Sex:</label>
                        <input
                            type="text"
                            name="sex"
                            id="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="flex-1 border-b border-black dark:border-white outline-none max w-20"
                            disabled={true}
                        />
                    </div>

                    {/* Marital Status */}
                    <div className="flex flex-row gap-2 md:w-80">
                        <label className="text-sm md:w-36 mt-1 font-semibold">6. Marital Status:</label>
                        <input
                            type="text"
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleChange}
                            className="flex-1 border-b border-black dark:border-white outline-none w-30"
                            required
                            disabled={true}
                        />
                    </div>
                </div>


                <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                    <label className="w-full md:w-72 mt-1 font-semibold">7. Address (Permanent/Temporary):</label>
                    <textarea
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className="flex-1 border-b border-black dark:border-white outline-none"
                        required
                    />
                </div>
            </div>

            {/* Part A - EPF Nomination */}
            <div className="mb-6">
                <h3 className="font-bold mb-0.5">PART – A (EPF)</h3>
                <p className="mb-3">
                    I hereby nominate the person(s)/cancel the nomination made by me previously and nominate the person(s) mentioned below to receive the amount standing to my credit in the Employees Provident Fund, in the event of my death.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full border border-black dark:border-white text-sm mb-4">
                        <thead>
                            <tr className="bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100">
                                <th className="border border-black dark:border-white p-2">Name of the Nominee(s)</th>
                                <th className="border border-black dark:border-white p-2">Address</th>
                                <th className="border border-black dark:border-white p-2">Nominee&rsquo;s relationship with the member</th>
                                <th className="border border-black dark:border-white p-2">Date of Birth</th>
                                <th className="border border-black dark:border-white p-2">Total amount or share of accumulations in Provident Funds to be paid to each nominee</th>
                                <th className="border border-black dark:border-white p-2">If the nominee is minor, name and address of the guardian who may receive the amount during the minority of the nominee</th>
                                <th className="border print:hidden border-black dark:border-white p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.credit_nominees.map((nominee, index) => (
                                <tr key={index}>
                                    <td className="border border-black dark:border-white p-1">
                                        <input
                                            type="text"
                                            value={nominee.name}
                                            onChange={(e) => handleNomineeChange(index, 'name', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black dark:border-white p-1">
                                        <input
                                            type="text"
                                            value={nominee.address}
                                            onChange={(e) => handleNomineeChange(index, 'address', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black dark:border-white p-1">
                                        <input
                                            type="text"
                                            value={nominee.relationship}
                                            onChange={(e) => handleNomineeChange(index, 'relationship', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black dark:border-white p-1">
                                        <input
                                            type="date"
                                            value={nominee.dob?.toString().split('T')[0] ?? ''}
                                            onChange={(e) => handleNomineeChange(index, 'dob', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black dark:border-white p-1">
                                        <input
                                            type="text"
                                            value={nominee.share}
                                            onChange={(e) => handleNomineeChange(index, 'share', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black dark:border-white p-1">
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                value={nominee.guardianName}
                                                onChange={(e) => handleNomineeChange(index, 'guardianName', e.target.value)}
                                                className="w-full outline-none border-b border-gray-300"
                                                placeholder="Guardian Name, else NA"
                                            />
                                            <input
                                                type="text"
                                                value={nominee.guardianAddress}
                                                onChange={(e) => handleNomineeChange(index, 'guardianAddress', e.target.value)}
                                                className="w-full outline-none"
                                                placeholder="Guardian Address, else NA"
                                            />
                                        </div>
                                    </td>
                                    <td className="border print:hidden border-black dark:border-white p-1 text-center">
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
                    className="print:hidden px-3 py-[2px] mb-5 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm"
                >
                    + Add Nominee
                </button>

                <div className="space-y-1 mb-6">
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
                    <div className="w-64 border-t border-black dark:border-white text-center pt-2">
                        Signature/thumb impression of the subscriber
                    </div>
                </div>
            </div>

            <div className="print:hidden page-break h-[2px] w-3/4 bg-neutral-600 mx-auto my-8">
            </div>
            <div className="page-break"></div>

            {/* Part B - EPS Family Details */}
            <div className="mb-8">
                <h3 className="text-center font-bold mb-4">PART – (EPS) Para 18</h3>
                <p className="mb-4">
                    I hereby furnish below particulars of the members of my family who would be eligible to receive Widow/Children Pension in the event of my premature death in service.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full border border-black dark:border-white text-sm mb-4">
                        <thead>
                            <tr className="bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100">
                                <th className="border border-black dark:border-white p-2">Sr. No</th>
                                <th className="border border-black dark:border-white p-2">Name & Address of the Family Member</th>
                                <th className="border border-black dark:border-white p-2">Age</th>
                                <th className="border border-black dark:border-white p-2">Relationship with the member</th>
                                <th className="border print:hidden border-black dark:border-white p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.familyMembers.map((member, index) => (
                                <tr key={index}>
                                    <td className="border border-black dark:border-white p-1 text-center">{index + 1}</td>
                                    <td className="border border-black dark:border-white p-1">
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
                                    <td className="border border-black dark:border-white p-1">
                                        <input
                                            type="text"
                                            value={member.age}
                                            onChange={(e) => handleFamilyMemberChange(index, 'age', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border border-black dark:border-white p-1">
                                        <input
                                            type="text"
                                            value={member.relationship}
                                            onChange={(e) => handleFamilyMemberChange(index, 'relationship', e.target.value)}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </td>
                                    <td className="border print:hidden border-black dark:border-white p-1 text-center">
                                        {formData.familyMembers.length > 1 && (<button
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
                    className="print:hidden px-3 py-[2px] mb-1 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm"
                >
                    + Add Family Member
                </button>
            </div>
        </div>
    );
}