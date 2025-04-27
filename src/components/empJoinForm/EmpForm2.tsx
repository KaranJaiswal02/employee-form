"use client"
import { empFormData } from '@/hooks/Atoms'
import { useAtom } from 'jotai'
//import IAPIResponse from '@/types/responseType'

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
            <h4 className="text-lg font-bold mb-2 border-b border-black pb-1">TO BE FILLED BY HR</h4>
            <div className="border border-black mb-6">
                <div className="flex">
                    <div className="w-[20%] border-r border-black p-1 text-center font-semibold">E. CODE</div>
                    <div className="w-[20%] border-r border-black p-1 text-center font-semibold">P.F. NO.</div>
                    <div className="w-[20%] border-r border-black p-1 text-center font-semibold">DEPARTMENT</div>
                    <div className="w-[20%] border-r border-black p-1 text-center font-semibold">FUNCTION</div>
                    <div className="w-[20%] p-1 text-center font-semibold">LEVEL</div>
                </div>
                <div className="flex border-t border-black">
                    {(['eCode', 'pfNo', 'department', 'function', 'level'] as Array<keyof typeof formData>).map((field: keyof typeof formData) => (
                        <div key={field} className="w-[20%] border-r border-black last:border-r-0">
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
            <h4 className="text-lg font-bold mb-4 border-b border-black pb-2">TO BE FILLED BY EMPLOYEE</h4>

            {/* Name Section */}
            <div className="mb-4">
                <div className="font-semibold mb-1">NAME</div>
                <div className="flex">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-1/3 border-b-2 border-black pb-1 focus:outline-none mr-2"
                        placeholder="First"
                    />
                    <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        className="w-1/3 border-b-2 border-black pb-1 focus:outline-none mr-2"
                        placeholder="Middle"
                    />
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className="w-1/3 border-b-2 border-black pb-1 focus:outline-none"
                        placeholder="Surname"
                    />
                </div>
            </div>

            {/* Designation */}
            <div className="mb-4">
                <div className="font-semibold mb-1">DESIGNATION</div>
                <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full border-b-2 border-black pb-1 focus:outline-none"
                />
            </div>

            {/* Family Details */}
            <div className="mb-4">
                <div className="font-semibold mb-1">FATHER/MOTHER'S NAME & OCCUPATION</div>
                <input
                    type="text"
                    name="familyMemberName"
                    value={formData.familyMemberName}
                    onChange={handleChange}
                    className="w-full border-b-2 border-black pb-1 focus:outline-none"
                />
            </div>

            {/* Personal Details Grid */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                    <div className="font-semibold mb-1">DATE OF BIRTH</div>
                    <input
                        type="date"
                        name="dob"
                        id='dob'
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full border-b-2 border-black pb-1 focus:outline-none"
                    />
                </div>
                <div>
                    <div className="font-semibold mb-1">SEX</div>
                    <select
                        name="sex"
                        value={formData.sex}
                        id='sex'
                        onChange={handleChange}
                        className="w-full border-b-2 border-black pb-1 focus:outline-none bg-transparent"
                    >
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <div className="font-semibold mb-1">BLOOD GROUP</div>
                    <input
                        type="text"
                        name="bloodGroup"
                        id='bloodGroup'
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full border-b-2 border-black pb-1 focus:outline-none"
                    />
                </div>
                <div>
                    <div className="font-semibold mb-1">NATIONALITY</div>
                    <input
                        type="text"
                        name="nationality"
                        id='nationality'
                        value={formData.nationality}
                        onChange={handleChange}
                        className="w-full border-b-2 border-black pb-1 focus:outline-none"
                    />
                </div>
            </div>

            {/* Address Section */}
            <div className="mb-4">
                <div className="font-semibold mb-1">PRESENT ADDRESS:</div>
                <textarea
                    name="currAddress"
                    value={formData.currAddress}
                    disabled={true}
                    onChange={handleChange}
                    className="w-full border-b-2 border-black pb-1 focus:outline-none h-8"
                />
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                        <span className="text-sm">Dist.</span>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black focus:outline-none ml-1"
                        />
                    </div>
                    <div>
                        <span className="text-sm">State</span>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black focus:outline-none ml-1"
                        />
                    </div>
                    <div>
                        <span className="text-sm">PIN</span>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black focus:outline-none ml-1"
                        />
                    </div>
                </div>
                <div className="flex mt-2">
                    <div className="text-sm">Tel: STD code</div>
                    <input
                        type="text"
                        name="currstdcode"
                        value={formData.currstdcode}
                        disabled={true}
                        onChange={handleChange}
                        className="w-16 border-b border-black focus:outline-none mx-1"
                    />
                    <div className="text-sm ml-4">Number</div>
                    <input
                        type="text"
                        name="currcontactNumber"
                        value={formData.currcontactNumber}
                        disabled={true}
                        onChange={handleChange}
                        className="w-24 border-b border-black focus:outline-none mx-1"
                    />
                </div>
            </div>

            {/* Permanent Address */}
            <div className="mb-4">
                <div className="font-semibold mb-1">PERMANENT ADDRESS:</div>
                <textarea
                    name="perAddress"
                    value={formData.perAddress}
                    disabled={true}
                    onChange={handleChange}
                    className="w-full border-b-2 border-black pb-1 focus:outline-none h-8"
                />
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                        <span className="text-sm">Dist.</span>
                        <input
                            type="text"
                            name="perDistrict"
                            value={formData.perDistrict}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black focus:outline-none ml-1"
                        />
                    </div>
                    <div>
                        <span className="text-sm">State</span>
                        <input
                            type="text"
                            name="perState"
                            value={formData.perState}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black focus:outline-none ml-1"
                        />
                    </div>
                    <div>
                        <span className="text-sm">PIN</span>
                        <input
                            type="text"
                            name="perPincode"
                            value={formData.perPincode}
                            disabled={true}
                            onChange={handleChange}
                            className="w-3/4 border-b border-black focus:outline-none ml-1"
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
                        className="w-16 border-b border-black focus:outline-none mx-1"
                    />
                    <div className="text-sm ml-4">Number</div>
                    <input
                        type="text"
                        name="permanentPhone"
                        value={formData.percontactNumber}
                        disabled={true}
                        onChange={handleChange}
                        className="w-24 border-b border-black focus:outline-none mx-1"
                    />
                </div>
            </div>

            {/* Marital Status */}
            <div className="mb-4">
                <div className="font-semibold mb-1">MARITAL STATUS :
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="maritalStatus"
                            value="Married"
                            checked={formData.maritalStatus === 'Married'}
                            onChange={handleChange}
                            className="mr-1"
                        /> MARRIED
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="maritalStatus"
                            value="Single"
                            checked={formData.maritalStatus === 'Single'}
                            onChange={handleChange}
                            className="mr-1"
                        /> SINGLE
                    </label>
                </div>
            </div>

            {/* Spouse Details - Only show if married */}
            {formData.maritalStatus === 'Married' && (
                <div className="mb-4">
                    <div className="font-semibold mb-2">IF MARRIED, DETAILS OF SPOUSE:</div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="text-sm">NAME</div>
                            <input
                                type="text"
                                name="spouseName"
                                value={formData.spouseName}
                                onChange={handleChange}
                                className="w-full border-b border-black focus:outline-none"
                            />
                        </div>
                        <div>
                            <div className="text-sm">DATE OF BIRTH</div>
                            <input
                                type="date"
                                name="spouseDob"
                                value={formData.spouseDob}
                                onChange={handleChange}
                                className="w-full border-b border-black focus:outline-none"
                            />
                        </div>
                        <div>
                            <div className="text-sm">ANNIVERSARY DATE</div>
                            <input
                                type="date"
                                name="anniversaryDate"
                                value={formData.anniversaryDate}
                                onChange={handleChange}
                                className="w-full border-b border-black focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                            <div className="text-sm">BLOOD GROUP</div>
                            <input
                                type="text"
                                name="spouseBloodGroup"
                                value={formData.spouseBloodGroup}
                                onChange={handleChange}
                                className="w-full border-b border-black focus:outline-none"
                            />
                        </div>
                        <div>
                            <div className="text-sm">HIGHEST EDUCATIONAL QUALIFICATION</div>
                            <input
                                type="text"
                                name="spouseEducation"
                                value={formData.spouseEducation}
                                onChange={handleChange}
                                className="w-full border-b border-black focus:outline-none"
                            />
                        </div>
                        <div>
                            <div className="text-sm">WORKING: YES / NO</div>
                            <select
                                name="spouseWorking"
                                value={formData.spouseWorking}
                                onChange={handleChange}
                                className="w-full border-b border-black focus:outline-none bg-transparent"
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
                <div className="font-semibold mb-2">EMERGENCY CONTACT:</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm">NAME:</div>
                        <input
                            type="text"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleChange}
                            className="w-full border-b border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <div className="text-sm">TELEPHONE NO.</div>
                        <input
                            type="text"
                            name="emergencyContactPhone"
                            value={formData.emergencyContactPhone}
                            onChange={handleChange}
                            className="w-full border-b border-black focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="text-sm">RELATIONSHIP</div>
                    <input
                        type="text"
                        name="emergencyContactRelationship"
                        value={formData.emergencyContactRelationship}
                        onChange={handleChange}
                        className="w-full border-b border-black focus:outline-none"
                    />
                </div>
            </div>

            {/* Other Information */}
            <div className="mb-6">
                <div className="font-semibold mb-2">OTHER INFORMATION:</div>
                <div className="text-sm">Gratuity NOMINEE:</div>
                <div className="flex items-center">
                    <span className="mr-2">1</span>
                    <input
                        type="text"
                        name="gratuityNominee1Percent"
                        value={formData.gratuityNominee1Percent}
                        onChange={handleChange}
                        className="w-16 border-b border-black focus:outline-none"
                        placeholder='Percentage'
                    />
                    <span className="mx-1">%</span>
                    <input
                        type="text"
                        name="gratuityNominee1Name"
                        value={formData.gratuityNominee1Name}
                        onChange={handleChange}
                        className="w-full border-b border-black focus:outline-none ml-2"
                        placeholder='Name'
                    />
                </div>
                <div className="flex items-center mt-1">
                    <span className="mr-2">2</span>
                    <input
                        type="text"
                        name="gratuityNominee2Percent"
                        value={formData.gratuityNominee2Percent}
                        onChange={handleChange}
                        className="w-16 border-b border-black focus:outline-none"
                        placeholder='Percentage'
                    />
                    <span className="mx-1">%</span>
                    <input
                        type="text"
                        name="gratuityNominee2Name"
                        value={formData.gratuityNominee2Name}
                        onChange={handleChange}
                        className="w-full border-b border-black focus:outline-none ml-2"
                        placeholder='Name'
                    />
                </div>
                <div className="text-sm mt-1">P.F. NOMINEE:</div>
                <div className="flex items-center">
                    <span className="mr-2">1</span>
                    <input
                        type="text"
                        name="pfNominee1Percent"
                        value={formData.pfNominee1Percent}
                        onChange={handleChange}
                        className="w-16 border-b border-black focus:outline-none"
                        placeholder='Percentage'
                    />
                    <span className="mx-1">%</span>
                    <input
                        type="text"
                        name="pfNominee1Name"
                        value={formData.pfNominee1Name}
                        onChange={handleChange}
                        className="w-full border-b border-black focus:outline-none ml-2"
                        placeholder='Name'
                    />
                </div>
                <div className="flex items-center mt-1">
                    <span className="mr-2">2</span>
                    <input
                        type="text"
                        name="pfNominee2Percent"
                        value={formData.pfNominee2Percent}
                        onChange={handleChange}
                        className="w-16 border-b border-black focus:outline-none"
                        placeholder='Percentage'
                    />
                    <span className="mx-1">%</span>
                    <input
                        type="text"
                        name="pfNominee2Name"
                        value={formData.pfNominee2Name}
                        onChange={handleChange}
                        className="w-full border-b border-black focus:outline-none ml-2"
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
                        className="w-16 border-b border-black focus:outline-none"
                        placeholder='Percentage'
                    />
                    <span className="mx-1">%</span>
                    <input
                        type="text"
                        name="pfNominee3Name"
                        value={formData.pfNominee3Name}
                        onChange={handleChange}
                        className="w-full border-b border-black focus:outline-none ml-2"
                        placeholder='Name'
                    />
                </div>
            </div>
        </div>
    );
}
