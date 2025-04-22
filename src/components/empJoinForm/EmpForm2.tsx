"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
//import IAPIResponse from '@/types/responseType'

export default function EmpForm2() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        ecode: "",
        presentaddress: "",
        permanentaddress: "",
        district: "",
        state: "",
        pincode: "",
        companyname: "",
        fathername: "",
        dob: "",
        sex: "",
        designation: "",
        pfno: "",
        department: "",
        function: "",
        level: "",
        fathersname: "",
        maritalstatus: "",
        address: "",
        mobilenumber: "",
        nationality: "",
        spousename: "",
        highestqualification: "",
        occupation: "",
        serialno: "",
        childname: "",
        child1name: "",
        child2name: "",
        child3name: "",
        child1dob: "",
        child2dob: "",
        child3dob: "",
        child1sex: "",
        child2sex: "",
        child3sex: "",
        languages: "",
        readwrite: "",
        speak: "",
        emergencycontact: "",
        relationship: "",
        contactnumber: "",
        gratuitynominee: "",
        pfnominee1: "",
        pfnominee2: "",
        percentage3: "",
        empsex: "",

    });

    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    type Child = {
        id: string;
        serialNo: string;
        name: string;
        dob: string;
        sex: string;
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data: ", formData);
        // Perform form submission logic here (e.g., send data to an API)
        router.push('/declaration-form')
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
            {/* <h4 className="text-lg font-bold mb-4 border-b border-black pb-2">TO BE FILLED BY HR.</h4>
            <div className="grid grid-cols-5 gap-2 mb-8 border border-black p-2">
                <div className="font-semibold text-center border-r border-black">E. CODE</div>
                <div className="font-semibold text-center border-r border-black">P.F. NO.</div>
                <div className="font-semibold text-center border-r border-black">DEPARTMENT</div>
                <div className="font-semibold text-center border-r border-black">FUNCTION</div>
                <div className="font-semibold text-center">LEVEL</div>
                <div className="h-8 border-t border-black">
                    <input type="text" className="w-full h-full px-1 border-none focus:outline-none" />
                </div>
                <div className="h-8 border-t border-black">
                    <input type="text" className="w-full h-full px-1 border-none focus:outline-none" />
                </div>
                <div className="h-8 border-t border-black">
                    <input type="text" className="w-full h-full px-1 border-none focus:outline-none" />
                </div>
                <div className="h-8 border-t border-black">
                    <input type="text" className="w-full h-full px-1 border-none focus:outline-none" />
                </div>
                <div className="h-8 border-t border-black">
                    <input type="text" className="w-full h-full px-1 border-none focus:outline-none" />
                </div>
            </div> */}
            {/* HR Section - Accurate Table Layout */}
            <h4 className="text-lg font-bold mb-2 border-b border-black pb-1">TO BE FILLED BY HR</h4>

            <div className="border border-black mb-6">
                {/* Table Header Row */}
                <div className="flex">
                    <div className="w-[20%] border-r border-black p-1 text-center font-semibold">E. CODE</div>
                    <div className="w-[20%] border-r border-black p-1 text-center font-semibold">P.F. NO.</div>
                    <div className="w-[20%] border-r border-black p-1 text-center font-semibold">DEPARTMENT</div>
                    <div className="w-[20%] border-r border-black p-1 text-center font-semibold">FUNCTION</div>
                    <div className="w-[20%] p-1 text-center font-semibold">LEVEL</div>
                </div>

                {/* Table Input Row */}
                <div className="flex border-t border-black">
                    <div className="w-[20%] border-r border-black">
                        <input
                            type="text"
                            className="w-full h-8 px-1 border-none focus:outline-none"
                            placeholder=""
                        />
                    </div>
                    <div className="w-[20%] border-r border-black">
                        <input
                            type="text"
                            className="w-full h-8 px-1 border-none focus:outline-none"
                            placeholder=""
                        />
                    </div>
                    <div className="w-[20%] border-r border-black">
                        <input
                            type="text"
                            className="w-full h-8 px-1 border-none focus:outline-none"
                            placeholder=""
                        />
                    </div>
                    <div className="w-[20%] border-r border-black">
                        <input
                            type="text"
                            className="w-full h-8 px-1 border-none focus:outline-none"
                            placeholder=""
                        />
                    </div>
                    <div className="w-[20%]">
                        <input
                            type="text"
                            className="w-full h-8 px-1 border-none focus:outline-none"
                            placeholder=""
                        />
                    </div>
                </div>
            </div>


            {/* Employee Section */}
            <h4 className="text-lg font-bold mb-4 border-b border-black pb-2">TO BE FILLED BY EMPLOYEE</h4>

            {/* Name Section */}
            <div className="mb-4">
                <div className="font-semibold mb-1">NAME</div>
                <input type="text" className="w-full border-b-2 border-black pb-1 focus:outline-none" />
                <div className="flex mt-1">
                    <div className="text-xs pl-4 w-1/3">(FIRST)</div>
                    <div className="text-xs pl-4 w-1/3">(MIDDLE)</div>
                    <div className="text-xs pl-4 w-1/3">(SURNAME)</div>
                </div>
            </div>

            {/* Designation */}
            <div className="mb-4">
                <div className="font-semibold mb-1">DESIGNATION</div>
                <input type="text" className="w-full border-b-2 border-black pb-1 focus:outline-none" />
            </div>

            {/* Family Details */}
            <div className="mb-4">
                <div className="font-semibold mb-1">FATHER/MOTHER'S NAME & OCCUPATION</div>
                <input type="text" className="w-full border-b-2 border-black pb-1 focus:outline-none" />
            </div>

            {/* Personal Details Grid */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                    <div className="font-semibold mb-1">DATE OF BIRTH</div>
                    <input type="date" className="w-full border-b-2 border-black pb-1 focus:outline-none" />
                </div>
                <div>
                    <div className="font-semibold mb-1">SEX</div>
                    <select className="w-full border-b-2 border-black pb-1 focus:outline-none bg-transparent">
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <div className="font-semibold mb-1">BLOOD GROUP</div>
                    <input type="text" className="w-full border-b-2 border-black pb-1 focus:outline-none" />
                </div>
                <div>
                    <div className="font-semibold mb-1">NATIONALITY</div>
                    <input type="text" className="w-full border-b-2 border-black pb-1 focus:outline-none" />
                </div>
            </div>

            {/* Address Section */}
            <div className="mb-4">
                <div className="font-semibold mb-1">PRESENT ADDRESS:</div>
                <textarea className="w-full border-b-2 border-black pb-1 focus:outline-none h-8" />
                <textarea className="w-full border-b-2 border-black pb-1 focus:outline-none h-8 mt-2" />
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                        <span className="text-sm">Dist.</span>
                        <input type="text" className="w-3/4 border-b border-black focus:outline-none ml-1" />
                    </div>
                    <div>
                        <span className="text-sm">State</span>
                        <input type="text" className="w-3/4 border-b border-black focus:outline-none ml-1" />
                    </div>
                    <div>
                        <span className="text-sm">PIN</span>
                        <input type="text" className="w-3/4 border-b border-black focus:outline-none ml-1" />
                    </div>
                </div>
                <div className="flex mt-2">
                    <div className="text-sm">Tel: STD code</div>
                    <input type="text" className="w-16 border-b border-black focus:outline-none mx-1" />
                    <div className="text-sm ml-4">Number</div>
                    <input type="text" className="w-24 border-b border-black focus:outline-none mx-1" />
                </div>
            </div>

            {/* Permanent Address */}
            <div className="mb-4">
                <div className="font-semibold mb-1">PERMANENT ADDRESS:</div>
                <textarea className="w-full border-b-2 border-black pb-1 focus:outline-none h-8" />
                <textarea className="w-full border-b-2 border-black pb-1 focus:outline-none h-8 mt-2" />
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                        <span className="text-sm">Dist.</span>
                        <input type="text" className="w-3/4 border-b border-black focus:outline-none ml-1" />
                    </div>
                    <div>
                        <span className="text-sm">State</span>
                        <input type="text" className="w-3/4 border-b border-black focus:outline-none ml-1" />
                    </div>
                    <div>
                        <span className="text-sm">PIN</span>
                        <input type="text" className="w-3/4 border-b border-black focus:outline-none ml-1" />
                    </div>
                </div>
                <div className="flex mt-2">
                    <div className="text-sm">Tel: STD code</div>
                    <input type="text" className="w-16 border-b border-black focus:outline-none mx-1" />
                    <div className="text-sm ml-4">Number</div>
                    <input type="text" className="w-24 border-b border-black focus:outline-none mx-1" />
                </div>
            </div>

            {/* Marital Status */}
            <div className="mb-4">
                <div className="font-semibold mb-1">MARITAL STATUS :
                    <label className="ml-4">
                        <input type="radio" name="maritalStatus" className="mr-1" /> MARRIED
                    </label>
                    <label className="ml-4">
                        <input type="radio" name="maritalStatus" className="mr-1" /> SINGLE
                    </label>
                </div>
            </div>

            {/* Spouse Details */}
            <div className="mb-4">
                <div className="font-semibold mb-2">IF MARRIED, DETAILS OF SPOUSE:</div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <div className="text-sm">NAME</div>
                        <input type="text" className="w-full border-b border-black focus:outline-none" />
                    </div>
                    <div>
                        <div className="text-sm">DATE OF BIRTH</div>
                        <input type="date" className="w-full border-b border-black focus:outline-none" />
                    </div>
                    <div>
                        <div className="text-sm">ANNIVERSARY DATE</div>
                        <input type="date" className="w-full border-b border-black focus:outline-none" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                        <div className="text-sm">BLOOD GROUP</div>
                        <input type="text" className="w-full border-b border-black focus:outline-none" />
                    </div>
                    <div>
                        <div className="text-sm">HIGHEST EDUCATIONAL QUALIFICATION</div>
                        <input type="text" className="w-full border-b border-black focus:outline-none" />
                    </div>
                    <div>
                        <div className="text-sm">WORKING: YES / NO</div>
                        <select className="w-full border-b border-black focus:outline-none bg-transparent">
                            <option value=""></option>
                            <option value="Yes">YES</option>
                            <option value="No">NO</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Languages Section */}
            <div className="mb-6">
                <div className="font-semibold mb-2">LANGUAGES KNOWN <span className="font-normal">(UNDERLINE MOTHER TONGUE)</span></div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                    <div className="col-span-3 font-semibold">READ WRITE SPEAK</div>
                    <div className="font-semibold">UNDERLINE</div>
                </div>
                {[1, 2].map((_, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                        <div className="col-span-3 flex items-center">
                            <input type="checkbox" className="mr-4" />
                            <input type="checkbox" className="mr-4" />
                            <input type="checkbox" />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <input type="text" className="border-b border-black focus:outline-none w-3/4" />
                        </div>
                    </div>
                ))}
            </div>
            {/* Emergency Contact */}
            <div className="mb-6">
                <div className="font-semibold mb-2">EMERGENCY CONTACT:</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm">NAME:</div>
                        <input type="text" className="w-full border-b border-black focus:outline-none" />
                    </div>
                    <div>
                        <div className="text-sm">TELEPHONE NO.</div>
                        <input type="text" className="w-full border-b border-black focus:outline-none" />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="text-sm">RELATIONSHIP</div>
                    <input type="text" className="w-full border-b border-black focus:outline-none" />
                </div>
            </div>

            {/* Other Information */}
            <div className="mb-6">
                <div className="font-semibold mb-2">OTHER INFORMATION:</div>
                <div className="text-sm">Gratuity NOMINEE:</div>
                <div className="flex items-center">
                    <span className="mr-2">1</span>
                    <input type="text" className="w-16 border-b border-black focus:outline-none" />
                    <span className="mx-1">%</span>
                    <input type="text" className="w-full border-b border-black focus:outline-none ml-2" />
                </div>
                <div className="flex items-center mt-1">
                    <span className="mr-2">2</span>
                    <input type="text" className="w-16 border-b border-black focus:outline-none" />
                    <span className="mx-1">%</span>
                    <input type="text" className="w-full border-b border-black focus:outline-none ml-2" />
                </div>
                {/* <input type="text" className="w-full border-b border-black focus:outline-none" /> */}
                <div className="text-sm mt-1">P.F. NOMINEE:</div>
                <div className="flex items-center">
                    <span className="mr-2">1</span>
                    <input type="text" className="w-16 border-b border-black focus:outline-none" />
                    <span className="mx-1">%</span>
                    <input type="text" className="w-full border-b border-black focus:outline-none ml-2" />
                </div>
                <div className="flex items-center mt-1">
                    <span className="mr-2">2</span>
                    <input type="text" className="w-16 border-b border-black focus:outline-none" />
                    <span className="mx-1">%</span>
                    <input type="text" className="w-full border-b border-black focus:outline-none ml-2" />
                </div>
                <div className="flex items-center mt-1">
                    <span className="mr-2">3</span>
                    <input type="text" className="w-16 border-b border-black focus:outline-none" />
                    <span className="mx-1">%</span>
                    <input type="text" className="w-full border-b border-black focus:outline-none ml-2" />
                </div>
            </div>
        </div>

    )
}

