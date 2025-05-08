"use client"
import { empFormData } from '@/hooks/Atoms'
import { useAtom } from 'jotai'
import RequiredLabel from '../RequiredLabel';

export default function EmpForm2() {
    const [formData, setFormData] = useAtom(empFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        if (name === "maritalStatus") {
            maritialStatusChange(value)
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log(formData)
    };

    const maritialStatusChange = (value: string) => {
        setFormData(prev => ({ ...prev, maritalStatus: value }));
        setFormData(prev => ({
            ...prev,
            spouseName: "",
            spouseDob: "",
            spouseBloodGroup: "",
            spouseEducation: "",
            spouseWorking: ""
        }));
    };

    return (
        <div className="">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Annexure 2</h1>
                    <h2 className="text-xl font-bold">SL AP PVT LTD</h2>
                </div>
                <div className="text-right">
                    <h3 className="text-lg font-bold">Employee Information Form</h3>
                    <p className="text-sm">(To be filled by the employee on the date of joining)</p>
                </div>
            </div>

            {/* HR Section */}
            <h4 className="text-lg font-bold mb-0  border-black dark:border-white pb-0">TO BE FILLED BY HR</h4>
            <div className="border border-black dark:border-white mb-4">
                <div className="flex bg-neutral-100 dark:bg-neutral-800">
                    <div className="w-[20%] border-r border-black dark:border-white p-1 text-center font-semibold">E. CODE</div>
                    <div className="w-[20%] border-r border-black dark:border-white p-1 text-center font-semibold">P.F. NO.</div>
                    <div className="w-[20%] border-r border-black dark:border-white p-1 text-center font-semibold">DEPARTMENT</div>
                    <div className="w-[20%] border-r border-black dark:border-white p-1 text-center font-semibold">FUNCTION</div>
                    <div className="w-[20%] p-1 text-center font-semibold">LEVEL</div>
                </div>
                <div className="flex border-t border-black dark:border-white">
                    {(['eCode', 'pfNo', 'department', 'function', 'level'] as Array<keyof typeof formData>).map((field: keyof typeof formData) => (
                        <div key={field} className="w-[20%] border-r border-black dark:border-white last:border-r-0">
                            <input
                                type="text"
                                name={field}
                                value={typeof formData[field] === 'string' || typeof formData[field] === 'number' ? formData[field] : ''}
                                onChange={handleChange}
                                className="w-full h-8 px-1 border-none focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Employee Section */}
            <h4 className="text-lg font-bold  border-black dark:border-white pb-0">TO BE FILLED BY EMPLOYEE</h4>

            <div className="max-w-4xl mx-auto p-2 md:p-4 rounded-md border border-black dark:border-white text-sm mt-0">
                {/* Name Section */}
                <div className="mb-4 flex items-center gap-4">
                    <RequiredLabel>
                        <label htmlFor="firstName" className="font-semibold whitespace-nowrap">
                            Name
                        </label>
                    </RequiredLabel>
                    <div className="flex flex-1 gap-2">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-1/3 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
                            placeholder="First"
                            required
                        />
                        <input
                            type="text"
                            id="middleName"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="w-1/3 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
                            placeholder="Middle"
                        />
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-1/3 border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                            placeholder="Surname"
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-8 items-center">
                    <div className="flex items-center gap-4 w-1/3">
                        <RequiredLabel>
                            <label htmlFor="designation" className="font-semibold whitespace-nowrap">
                                DESIGNATION
                            </label>
                        </RequiredLabel>
                        <input
                            type="text"
                            id="designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                            required
                            disabled={true}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-2/3">
                        <RequiredLabel>
                            <label htmlFor="familyMemberName" className="font-semibold whitespace-nowrap">
                                FATHER/MOTHER&rsquo;S NAME & OCCUPATION
                            </label>
                        </RequiredLabel>
                        <input
                            type="text"
                            id="familyMemberName"
                            name="familyMemberName"
                            value={formData.familyMemberName}
                            onChange={handleChange}
                            className="w-3/4 border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Personal Details Grid */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                        <div className="font-semibold mb-1"><RequiredLabel>DATE OF BIRTH</RequiredLabel> </div>
                        <input
                            type="date"
                            name="dob"
                            id='dob'
                            value={formData.dob?.toString().split('T')[0] ?? ''}
                            disabled={true}
                            onChange={handleChange}
                            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <RequiredLabel><label htmlFor="sex" className="font-semibold mb-1 block">
                            SEX
                        </label></RequiredLabel>
                        <select
                            name="sex"
                            id="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none bg-transparent"
                            required
                        >
                            <option className="bg-white dark:bg-neutral-800" value="">Select</option>
                            <option className="bg-white dark:bg-neutral-800" value="Male">Male</option>
                            <option className="bg-white dark:bg-neutral-800" value="Female">Female</option>
                            <option className="bg-white dark:bg-neutral-800" value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <RequiredLabel> <label htmlFor='bloodGroup'> <div className="font-semibold mb-1">BLOOD GROUP </div></label>
                        </RequiredLabel><input
                            type="text"
                            name="bloodGroup"
                            id='bloodGroup'
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            placeholder='A+ / B+ / O+ / AB+/ etc'
                            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <RequiredLabel><label htmlFor='nationality'><div className="font-semibold mb-1">NATIONALITY</div></label></RequiredLabel>
                        <input
                            type="text"
                            name="nationality"
                            id='nationality'
                            value={formData.nationality}
                            onChange={handleChange}
                            placeholder='Indian / Other'
                            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-between gap-x-12 mb-6">
                    {/* Current Address */}
                    <div className="w-1/2">
                        <RequiredLabel>
                            <label htmlFor='currAddress'>
                                <div className="font-semibold mb-1">CURRENT ADDRESS:</div>
                            </label>
                        </RequiredLabel>
                        <textarea
                            name="currAddress"
                            value={formData.currAddress}
                            disabled={true}
                            onChange={handleChange}
                            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none h-8"
                            required
                        />
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            <div>
                                <span className="text-sm font-semibold"><RequiredLabel>Dist.</RequiredLabel></span>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    disabled={true}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none ml-1"
                                    required
                                />
                            </div>
                            <div>
                                <span className="text-sm font-semibold"><RequiredLabel>State</RequiredLabel></span>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    disabled={true}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none ml-1"
                                    required
                                />
                            </div>
                            <div>
                                <span className="text-sm font-semibold"><RequiredLabel>PIN</RequiredLabel></span>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    disabled={true}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none ml-1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex mt-2 items-center">
                            <label htmlFor='currstdcode'>
                                <div className="text-sm font-semibold">Tel: STD code</div>
                            </label>
                            <input
                                type="text"
                                name="currstdcode"
                                value={formData.currstdcode}
                                disabled={true}
                                onChange={handleChange}
                                className="w-16 border-b border-black dark:border-white focus:outline-none mx-1"
                            />
                            <RequiredLabel>
                                <label htmlFor='currcontactNumber'>
                                    <div className="text-sm ml-4 font-semibold">Number</div>
                                </label>
                            </RequiredLabel>
                            <input
                                type="text"
                                name="currcontactNumber"
                                value={formData.currcontactNumber}
                                disabled={true}
                                onChange={handleChange}
                                className="w-24 border-b border-black dark:border-white focus:outline-none mx-1"
                                required
                            />
                        </div>
                    </div>

                    {/* Permanent Address */}
                    <div className="w-1/2">
                        <div className="font-semibold mb-1">
                            <RequiredLabel>PERMANENT ADDRESS:</RequiredLabel>
                        </div>
                        <textarea
                            name="perAddress"
                            value={formData.perAddress}
                            disabled={true}
                            onChange={handleChange}
                            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none h-8"
                            required
                        />
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            <div>
                                <span className="text-sm font-semibold"><RequiredLabel>Dist.</RequiredLabel></span>
                                <input
                                    type="text"
                                    name="perDistrict"
                                    value={formData.perDistrict}
                                    disabled={true}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none ml-1"
                                    required
                                />
                            </div>
                            <div>
                                <span className="text-sm font-semibold"><RequiredLabel>State</RequiredLabel></span>
                                <input
                                    type="text"
                                    name="perState"
                                    value={formData.perState}
                                    disabled={true}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none ml-1"
                                    required
                                />
                            </div>
                            <div>
                                <span className="text-sm font-semibold"><RequiredLabel>PIN</RequiredLabel></span>
                                <input
                                    type="text"
                                    name="perPincode"
                                    value={formData.perPincode}
                                    disabled={true}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none ml-1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex mt-2 items-center">
                            <div className="text-sm font-semibold">Tel: STD code</div>
                            <input
                                type="text"
                                name="perstdcode"
                                value={formData.perstdcode}
                                disabled={true}
                                onChange={handleChange}
                                className="w-16 border-b border-black dark:border-white focus:outline-none mx-1"
                            />
                            <div className="text-sm ml-4 font-semibold">
                                <RequiredLabel>Number</RequiredLabel>
                            </div>
                            <input
                                type="text"
                                name="percontactNumber"
                                value={formData.percontactNumber}
                                disabled={true}
                                onChange={handleChange}
                                className="w-24 border-b border-black dark:border-white focus:outline-none mx-1"
                                required
                            />
                        </div>
                    </div>
                </div>


                {/* Marital Status */}
                <div className="mb-4">
                    <div className="flex items-center flex-wrap gap-4">
                        <RequiredLabel>
                            <label htmlFor="maritalStatus" className="font-semibold whitespace-nowrap">
                                MARITAL STATUS:
                            </label>
                        </RequiredLabel>

                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="maritalStatus"
                                value="Married"
                                checked={formData.maritalStatus === 'Married'}
                                onChange={handleChange}
                            />
                            Married
                        </label>

                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="maritalStatus"
                                value="Single"
                                checked={formData.maritalStatus === 'Single'}
                                onChange={handleChange}
                            />
                            Single
                        </label>

                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="maritalStatus"
                                value="Divorced"
                                checked={formData.maritalStatus === 'Divorced'}
                                onChange={handleChange}
                            />
                            Divorced
                        </label>

                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="maritalStatus"
                                value="Widowed"
                                checked={formData.maritalStatus === 'Widowed'}
                                onChange={handleChange}
                            />
                            Widowed
                        </label>
                    </div>
                </div>


                {/* Spouse Details - Only show if married */}
                {formData.maritalStatus === 'Married' && (
                    <div className="mb-4">
                        <div className="font-semibold mb-2">IF MARRIED, DETAILS OF SPOUSE:</div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <RequiredLabel><label htmlFor="spouseName"> <div className="text-sm font-semibold">NAME</div></label></RequiredLabel>
                                <input
                                    type="text"
                                    name="spouseName"
                                    id='spouseName'
                                    value={formData.spouseName}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <RequiredLabel><label htmlFor='spouseDob'><div className="text-sm font-semibold">DATE OF BIRTH</div></label></RequiredLabel>
                                <input
                                    type="date"
                                    name="spouseDob"
                                    id='spouseDob'
                                    value={formData.spouseDob?.toString().split('T')[0] ?? ''}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <RequiredLabel><label htmlFor='anniversaryDate'><div className="text-sm font-semibold">ANNIVERSARY DATE</div></label></RequiredLabel>
                                <input
                                    type="date"
                                    name="anniversaryDate"
                                    id='anniversaryDate'
                                    value={formData.anniversaryDate?.toString().split('T')[0] ?? ''}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-x-8 mt-2">
                            <div className="w-[200px]">
                                <RequiredLabel>
                                    <label htmlFor="spouseBloodGroup">
                                        <div className="text-sm font-semibold">BLOOD GROUP</div>
                                    </label>
                                </RequiredLabel>
                                <select
                                    name="spouseBloodGroup"
                                    id="spouseBloodGroup"
                                    value={formData.spouseBloodGroup}
                                    onChange={handleChange}
                                    className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none bg-transparent"
                                    required
                                >
                                    <option className="bg-white dark:bg-neutral-800" value="">Select</option>
                                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                                        <option key={group} className="bg-white dark:bg-neutral-800" value={group}>
                                            {group}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-[400px]">
                                <RequiredLabel>
                                    <label htmlFor="spouseEducation">
                                        <div className="text-sm font-semibold">HIGHEST EDUCATIONAL QUALIFICATION</div>
                                    </label>
                                </RequiredLabel>
                                <input
                                    type="text"
                                    name="spouseEducation"
                                    id="spouseEducation"
                                    value={formData.spouseEducation}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="w-[180px]">
                                <RequiredLabel>
                                    <label htmlFor="spouseWorking">
                                        <div className="text-sm font-semibold">WORKING: YES / NO</div>
                                    </label>
                                </RequiredLabel>
                                <select
                                    name="spouseWorking"
                                    id="spouseWorking"
                                    value={formData.spouseWorking}
                                    onChange={handleChange}
                                    className="w-full border-b border-black dark:border-white focus:outline-none bg-transparent"
                                    required
                                >
                                    <option value=""></option>
                                    <option value="Yes">YES</option>
                                    <option value="No">NO</option>
                                </select>
                            </div>
                        </div>

                    </div>
                )}

                {/* Emergency Contact */}
                <div className="mb-6">
                    <div className="flex items-center gap-4">
                        <RequiredLabel>
                            <label htmlFor="emergencyContactName" className="font-semibold whitespace-nowrap">
                                EMERGENCY CONTACT:
                            </label>
                        </RequiredLabel>

                        <input
                            type="text"
                            name="emergencyContactName"
                            id="emergencyContactName"
                            placeholder="Name"
                            value={formData.emergencyContactName}
                            onChange={handleChange}
                            className="w-1/4 border-b border-black dark:border-white focus:outline-none"
                            required
                        />

                        <input
                            type="text"
                            name="emergencyContactPhone"
                            id="emergencyContactPhone"
                            placeholder="Telephone No."
                            value={formData.emergencyContactPhone}
                            onChange={handleChange}
                            className="w-1/4 border-b border-black dark:border-white focus:outline-none"
                            required
                        />

                        <input
                            type="text"
                            name="emergencyContactRelationship"
                            id="emergencyContactRelationship"
                            placeholder="Relationship"
                            value={formData.emergencyContactRelationship}
                            onChange={handleChange}
                            className="w-1/4 border-b border-black dark:border-white focus:outline-none"
                            required
                        />
                    </div>
                </div>


                {/* Other Information */}
                <div className="mb-6">
                    <div className="font-semibold mb-2">OTHER INFORMATION:</div>
                    <RequiredLabel><label htmlFor="gratuityNominee1Percent"><div className="text-sm">Gratuity NOMINEE (atleast one):</div></label></RequiredLabel>
                    <div className="flex items-center">
                        <span className="mr-2">1</span>
                        <input
                            type="text"
                            name="gratuityNominee1Percent"
                            value={formData.gratuityNominee1Percent}
                            id='gratuityNominee1Percent'
                            onChange={handleChange}
                            className="w-1/5 border-b border-black dark:border-white focus:outline-none"
                            placeholder='Percentage'
                            required
                        />
                        <span className="mx-1">%</span>
                        <input
                            type="text"
                            name="gratuityNominee1Name"
                            value={formData.gratuityNominee1Name}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-2"
                            placeholder='Name'
                            required
                        />
                    </div>
                    <div className="flex items-center mt-1">
                        <span className="mr-2">2</span>
                        <input
                            type="text"
                            name="gratuityNominee2Percent"
                            value={formData.gratuityNominee2Percent}
                            onChange={handleChange}
                            className="w-1/5 border-b border-black dark:border-white focus:outline-none"
                            placeholder='Percentage'
                        />
                        <span className="mx-1">%</span>
                        <input
                            type="text"
                            name="gratuityNominee2Name"
                            value={formData.gratuityNominee2Name}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-2"
                            placeholder='Name'
                        />
                    </div>
                    <RequiredLabel><label htmlFor="pfNominee1Percent"> <div className="text-sm mt-1">P.F. NOMINEE (atleast one):</div></label></RequiredLabel>
                    <div className="flex items-center">
                        <span className="mr-2">1</span>
                        <input
                            type="text"
                            name="pfNominee1Percent"
                            id='pfNominee1Percent'
                            value={formData.pfNominee1Percent}
                            onChange={handleChange}
                            className="w-1/5 border-b border-black dark:border-white focus:outline-none"
                            placeholder='Percentage'
                            required
                        />
                        <span className="mx-1">%</span>
                        <input
                            type="text"
                            name="pfNominee1Name"
                            value={formData.pfNominee1Name}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-2"
                            placeholder='Name'
                            required
                        />
                    </div>
                    <div className="flex items-center mt-1">
                        <span className="mr-2">2</span>
                        <input
                            type="text"
                            name="pfNominee2Percent"
                            value={formData.pfNominee2Percent}
                            onChange={handleChange}
                            className="w-1/5 border-b border-black dark:border-white focus:outline-none"
                            placeholder='Percentage'
                        />
                        <span className="mx-1">%</span>
                        <input
                            type="text"
                            name="pfNominee2Name"
                            value={formData.pfNominee2Name}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-2"
                            placeholder='Name'
                        />
                    </div>
                    <div className="flex items-center mt-1">
                        <span className="mr-2">3</span>
                        <input
                            type="text"
                            name="pfNominee3Percent"
                            value={formData.pfNominee3Percent}
                            onChange={handleChange}
                            className="w-1/5 border-b border-black dark:border-white focus:outline-none"
                            placeholder='Percentage'
                        />
                        <span className="mx-1">%</span>
                        <input
                            type="text"
                            name="pfNominee3Name"
                            value={formData.pfNominee3Name}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-2"
                            placeholder='Name'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
