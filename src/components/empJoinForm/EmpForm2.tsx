"use client"
import { empFormData } from '@/hooks/Atoms'
import { useAtom } from 'jotai'
import RequiredLabel from '../RequiredLabel';

export default function EmpForm2() {
    const [formData, setFormData] = useAtom(empFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log(formData)
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
            <h4 className="text-lg font-bold mb-2 border-b border-black dark:border-white pb-1">TO BE FILLED BY HR</h4>
            <div className="border border-black dark:border-white mb-6">
                <div className="flex">
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
            <h4 className="text-lg font-bold mb-4 border-b border-black dark:border-white pb-2">TO BE FILLED BY EMPLOYEE</h4>

            {/* Name Section */}
            <div className="mb-4">
                <RequiredLabel><label htmlFor="firstName" className="block font-semibold mb-1">
                    Name
                </label></RequiredLabel>
                <div className="flex">
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


            <div className="mb-4 flex gap-16">
                {/* Designation - Left Side */}
                {/* <div className="w-1/3">
                    <div className="font-semibold mb-1">
                        <RequiredLabel>DESIGNATION</RequiredLabel>
                    </div>
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                        required
                    />
                </div> */}
                <div className="w-1/3">
                    <RequiredLabel><label htmlFor="designation" className="font-semibold mb-1 block">
                        DESIGNATION
                    </label></RequiredLabel>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                        required
                    />
                </div>

                {/* Father's/Mother's Name & Occupation - Right Side */}
                {/* <div className="w-2/3">
                    <div className="font-semibold mb-1">
                        <RequiredLabel>FATHER/MOTHER'S NAME & OCCUPATION</RequiredLabel>
                    </div>
                    <input
                        type="text"
                        name="familyMemberName"
                        value={formData.familyMemberName}
                        onChange={handleChange}
                        className="w-3/4 border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                        required
                    />
                </div> */}
                <div className="w-2/3">
                    <RequiredLabel><label htmlFor="familyMemberName" className="font-semibold mb-1 block">
                        FATHER/MOTHER'S NAME & OCCUPATION
                    </label></RequiredLabel>
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
                        value={formData.dob}
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
                        <option className="bg-white dark:bg-gray-800" value="">Select</option>
                        <option className="bg-white dark:bg-gray-800" value="Male">Male</option>
                        <option className="bg-white dark:bg-gray-800" value="Female">Female</option>
                        <option className="bg-white dark:bg-gray-800" value="Other">Other</option>
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
                        className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none"
                        required
                    />
                </div>
            </div>

            {/* Address Section */}
            <div className="mb-4">
                <RequiredLabel><label htmlFor='currAddress'> <div className="font-semibold mb-1">CURRENT ADDRESS:</div></label></RequiredLabel>
                <textarea
                    name="currAddress"
                    value={formData.currAddress}
                    disabled={true}
                    onChange={handleChange}
                    className="w-3/5 border-b-1 border-black dark:border-white pb-1 focus:outline-none h-8"
                    required
                />
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                        <span className="text-sm"><RequiredLabel>Dist.</RequiredLabel></span>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-1"
                            required
                        />
                    </div>
                    <div>
                        <span className="text-sm"><RequiredLabel>State</RequiredLabel></span>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-1"
                            required
                        />
                    </div>
                    <div>
                        <span className="text-sm"><RequiredLabel>PIN</RequiredLabel></span>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-1"
                            required
                        />
                    </div>
                </div>
                <div className="flex mt-2">
                    <label htmlFor='currstdcode'><div className="text-sm">Tel: STD code</div></label>
                    <input
                        type="text"
                        name="currstdcode"
                        value={formData.currstdcode}
                        disabled={true}
                        onChange={handleChange}
                        className="w-16 border-b border-black dark:border-white focus:outline-none mx-1"
                    />
                    <RequiredLabel><label htmlFor='currcontactNumber'><div className="text-sm ml-4">Number</div></label></RequiredLabel>
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
            <div className="mb-4">
                <div className="font-semibold mb-1"><RequiredLabel>PERMANENT ADDRESS:</RequiredLabel></div>
                <textarea
                    name="perAddress"
                    value={formData.perAddress}
                    disabled={true}
                    onChange={handleChange}
                    className="w-3/5 border-b-1 border-black dark:border-white pb-1 focus:outline-none h-8"
                    required
                />
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                        <span className="text-sm"><RequiredLabel>Dist.</RequiredLabel></span>
                        <input
                            type="text"
                            name="perDistrict"
                            value={formData.perDistrict}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-1"
                            required
                        />
                    </div>
                    <div>
                        <span className="text-sm"><RequiredLabel>State</RequiredLabel></span>
                        <input
                            type="text"
                            name="perState"
                            value={formData.perState}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-1"
                            required
                        />
                    </div>
                    <div>
                        <span className="text-sm"><RequiredLabel>PIN</RequiredLabel></span>
                        <input
                            type="text"
                            name="perPincode"
                            value={formData.perPincode}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none ml-1"
                            required
                        />
                    </div>
                </div>
                <div className="flex mt-2">
                    <div className="text-sm">Tel: STD code</div>
                    <input
                        type="text"
                        name="perstdcode"
                        value={formData.perstdcode}
                        disabled={true}
                        onChange={handleChange}
                        className="w-16 border-b border-black dark:border-white focus:outline-none mx-1"
                    />
                    <div className="text-sm ml-4"><RequiredLabel>Number</RequiredLabel></div>
                    <input
                        type="text"
                        name="permanentPhone"
                        value={formData.percontactNumber}
                        disabled={true}
                        onChange={handleChange}
                        className="w-24 border-b border-black dark:border-white focus:outline-none mx-1"
                        required
                    />
                </div>
            </div>

            {/* Marital Status */}
            <div className="mb-4">
                <RequiredLabel> <label htmlFor="maritalStatus"> <div className="font-semibold mb-1">MARITAL STATUS :</div></label></RequiredLabel>
                <label className="ml-4">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="Married"
                        checked={formData.maritalStatus === 'Married'}
                        onChange={handleChange}
                        className="mr-1"

                    /> Married
                </label>
                <label className="ml-4">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="Single"
                        checked={formData.maritalStatus === 'Single'}
                        onChange={handleChange}
                        className="mr-1"

                    /> Single
                </label>
                <label className="ml-4">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="Divorced"
                        checked={formData.maritalStatus === 'Divorced'}
                        onChange={handleChange}
                        className="mr-1"
                    /> Divorced
                </label>
                <label className="ml-4">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="Widowed"
                        checked={formData.maritalStatus === 'Widowed'}
                        onChange={handleChange}
                        className="mr-1"
                    /> Widowed
                </label>

            </div>

            {/* Spouse Details - Only show if married */}
            {formData.maritalStatus === 'Married' && (
                <div className="mb-4">
                    <div className="font-semibold mb-2">IF MARRIED, DETAILS OF SPOUSE:</div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <RequiredLabel><label htmlFor="spouseName"> <div className="text-sm">NAME</div></label></RequiredLabel>
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
                            <RequiredLabel><label htmlFor='spouseDob'><div className="text-sm">DATE OF BIRTH</div></label></RequiredLabel>
                            <input
                                type="date"
                                name="spouseDob"
                                id='spouseDob'
                                value={formData.spouseDob}
                                onChange={handleChange}
                                className="w-full border-b border-black dark:border-white focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <RequiredLabel><label htmlFor='anniversaryDate'><div className="text-sm">ANNIVERSARY DATE</div></label></RequiredLabel>
                            <input
                                type="date"
                                name="anniversaryDate"
                                id='anniversaryDate'
                                value={formData.anniversaryDate}
                                onChange={handleChange}
                                className="w-full border-b border-black dark:border-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                            <RequiredLabel><label htmlFor="spouseBloodGroup"><div className="text-sm">BLOOD GROUP</div></label></RequiredLabel>
                            <select
                                name="spouseBloodGroup"
                                id="spouseBloodGroup"
                                value={formData.spouseBloodGroup}
                                onChange={handleChange}
                                className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none bg-transparent"
                                required
                            >
                                <option className="bg-white dark:bg-gray-800" value="">Select</option>
                                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                                    <option key={group} className="bg-white dark:bg-gray-800" value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <RequiredLabel> <label htmlFor="spouseEducation"> <div className="text-sm">HIGHEST EDUCATIONAL QUALIFICATION</div></label></RequiredLabel>
                            <input
                                type="text"
                                name="spouseEducation"
                                id='spouseEducation'
                                value={formData.spouseEducation}
                                onChange={handleChange}
                                className="w-full border-b border-black dark:border-white focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <RequiredLabel><label htmlFor="spouseWorking"> <div className="text-sm">WORKING: YES / NO</div></label></RequiredLabel>
                            <select
                                name="spouseWorking"
                                id='spouseWorking'
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
                <RequiredLabel><label htmlFor="emergencyContactName"><div className="font-semibold mb-2">EMERGENCY CONTACT:</div></label></RequiredLabel>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <RequiredLabel><label htmlFor="emergencyContactName"> <div className="text-sm">NAME:</div></label></RequiredLabel>
                        <input
                            type="text"
                            name="emergencyContactName"
                            id='emergencyContactName'
                            value={formData.emergencyContactName}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <RequiredLabel><label htmlFor="emergencyContactPhone"><div className="text-sm">TELEPHONE NO.</div></label></RequiredLabel>
                        <input
                            type="text"
                            name="emergencyContactPhone"
                            id='emergencyContactPhone'
                            value={formData.emergencyContactPhone}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black dark:border-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <RequiredLabel><label htmlFor="emergencyContactRelationship"><div className="text-sm">RELATIONSHIP</div></label></RequiredLabel>
                    <input
                        type="text"
                        name="emergencyContactRelationship"
                        id='emergencyContactRelationship'
                        value={formData.emergencyContactRelationship}
                        onChange={handleChange}
                        className="w-2/5 border-b border-black dark:border-white focus:outline-none"
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
                        className="w-16 border-b border-black dark:border-white focus:outline-none"
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
                        className="w-16 border-b border-black dark:border-white focus:outline-none"
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
                        className="w-16 border-b border-black dark:border-white focus:outline-none"
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
                        className="w-16 border-b border-black dark:border-white focus:outline-none"
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
                        className="w-16 border-b border-black dark:border-white focus:outline-none"
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
    );
}
