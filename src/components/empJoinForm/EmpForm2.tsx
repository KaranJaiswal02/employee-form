"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
//import IAPIResponse from '@/types/responseType'

export default function EmpForm2() 
{
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


    const submitForm = (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        console.log("Form Data: ", formData);
        // Perform form submission logic here (e.g., send data to an API)
    };

    return (
        <form onSubmit={submitForm} className="p-6 max-w-3xl mx-auto my-10 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4"><i>TO BE FILLED BY HR</i></h2>
            <div className="mb-4">
                <label htmlFor="ecode" className="block text-gray-700 font-semibold mb-2">E. CODE</label>
                <input type="text" id="ecode" value={formData.ecode} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="pfno" className="block text-gray-700 font-semibold mb-2">P.F. NO.</label>
                <input type="text" id="pfno" value={formData.pfno} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="department" className="block text-gray-700 font-semibold mb-2">DEPARTMENT</label>
                <input type="text" id="deparment" value={formData.department} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="function" className="block text-gray-700 font-semibold mb-2">FUNCTION</label>
                <input type="text" id="function" value={formData.function} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="level" className="block text-gray-700 font-semibold mb-2">LEVEL</label>
                <input type="text" id="level" value={formData.level} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            </div>

            <h2 className="text-2xl font-bold mb-4"><i>TO BE FILLED BY EMPLOYEE</i></h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name of the applicant making nomination:</label>
                <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="designation" className="block text-gray-700 font-semibold mb-2">DESIGNATION</label>
                <input type="text" id="designation" value={formData.designation} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="occupation" className="block text-gray-700 font-semibold mb-2">FATHER/MOTHER'S NAME & OCCUPATION</label>
                <input type="text" id="occupation" value={formData.occupation} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">DATE OF BIRTH</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="empsex" className="block text-gray-700 font-semibold mb-2">SEX:</label>

                <select id="empsex" value={formData.empsex} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required>
                    <option value="">Select</option>
                    <option value="">Male</option>
                    <option value="">Female</option>
                    <option value="">Prefer not to say</option>
                </select>
                <label htmlFor="nationality" className="block text-gray-700 font-semibold mb-2">NATIONALITY</label>
                <select id="nationality" value={formData.nationality} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required>
                    <option value="">Select</option>
                    <option value="">Indian</option>
                    <option value="">South Korean</option>
                    <option value="">American</option>
                    <option value="">British</option>
                    <option value="">Australian</option>
                    <option value="">Canadian</option>
                    <option value="">Chinese</option>
                </select>
                <label htmlFor="presentaddress" className="block text-gray-700 font-semibold mb-2">PRESENT ADDRESS</label>
                <Textarea id="presentaddress" value={formData.address} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="permanentaddress" className="block text-gray-700 font-semibold mb-2">PERMANENT ADDRESS</label>
                <Textarea id="permanentaddress" value={formData.address} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="mobilenumber" className="block text-gray-700 font-semibold mb-2">MOBILE NUMBER</label>
                <input type="text" id="mobilenumber" value={formData.mobilenumber} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="maritalstatus" className="block text-gray-700 font-semibold mb-2">MARITAL STATUS:</label>
                <select id="maritalstatus" value={formData.maritalstatus} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required>
                    <option value="">Select</option>
                    <option value="">Single</option>
                    <option value="">Married</option>
                    <option value="">Divorced</option>
                    <option value="">Widowed</option>
                </select>
                <h2 className="text-2xl font-bold mb-4"><i>IF MARRIED, DETAILS OF SPOUSE:</i></h2>
                <label htmlFor="spousename" className="block text-gray-700 font-semibold mb-2">NAME</label>
                <input type="text" id="spousename" value={formData.spousename} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="dateofbirth" className="block text-gray-700 font-semibold mb-2">DATE OF BIRTH</label>
                <input type="date" id="dateofbirth" value={formData.dob} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="highestqualification" className="block text-gray-700 font-semibold mb-2">HIGHEST QUALIFICATION</label>
                <input type="text" id="highestqualification" value={formData.highestqualification} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
                <label htmlFor="occupation" className="block text-gray-700 font-semibold mb-2">OCCUPATION</label>
                <input type="text" id="occupation" value={formData.occupation} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            </div>

            <h2 className="text-2xl font-bold mb-4"><i>DETAILS OF CHILDREN:</i></h2>

            <label htmlFor="serialno" className="block text-gray-700 font-semibold mb-2">S.NO.</label>
            <input type="number" id="serialno" value={formData.serialno} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" required />

            <label htmlFor="childname" className="block text-gray-700 font-semibold mb-2">NAME</label>
            <input type="text" id="childname" value={formData.childname} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" required />

            <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">DATE OF BIRTH</label>
            <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" required />

            <label htmlFor="sex" className="block text-gray-700 font-semibold mb-2">SEX</label>
            <select id="sex" value={formData.sex} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <div className="border-b border-gray-300 py-4">
                <h3 className="font-semibold">Child 1</h3>
                <label htmlFor="child1name" className="block text-gray-700 font-semibold mb-2">NAME</label>
                <input type="text" id="child1name" value={formData.child1name} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" />

                <label htmlFor="child1dob" className="block text-gray-700 font-semibold mb-2">DATE OF BIRTH</label>
                <input type="date" id="child1dob" value={formData.child1dob} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" />

                <label htmlFor="child1sex" className="block text-gray-700 font-semibold mb-2">SEX</label>
                <select id="child1sex" value={formData.child1sex} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className="border-b border-gray-300 py-4">
                <h3 className="font-semibold">Child 2</h3>
                <label htmlFor="child2name" className="block text-gray-700 font-semibold mb-2">NAME</label>
                <input type="text" id="child2name" value={formData.child2name} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" />

                <label htmlFor="child2dob" className="block text-gray-700 font-semibold mb-2">DATE OF BIRTH</label>
                <input type="date" id="child2dob" value={formData.child2dob} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" />

                <label htmlFor="child2sex" className="block text-gray-700 font-semibold mb-2">SEX</label>
                <select id="child2sex" value={formData.child2sex} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>


            <div className="border-b border-gray-300 py-4">
                <h3 className="font-semibold">Child 3</h3>
                <label htmlFor="child3name" className="block text-gray-700 font-semibold mb-2">NAME</label>
                <input type="text" id="child3name" value={formData.child3name} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" />

                <label htmlFor="child3dob" className="block text-gray-700 font-semibold mb-2">DATE OF BIRTH</label>
                <input type="date" id="child3dob" value={formData.child3dob} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" />

                <label htmlFor="child3sex" className="block text-gray-700 font-semibold mb-2">SEX</label>
                <select id="child3sex" value={formData.child3sex} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full mb-4" >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <h2 className="text-2xl font-bold mb-4"><i>LANGUAGES KNOWN</i></h2>
            <label htmlFor="languages" className="block text-gray-700 font-semibold mb-2">LANGUAGES</label>
            <input type="text" id="languages" value={formData.languages} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            <label htmlFor="readwrite" className="block text-gray-700 font-semibold mb-2">READ/WRITE</label>
            <input type="text" id="readwrite" value={formData.readwrite} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            <label htmlFor="speak" className="block text-gray-700 font-semibold mb-2">SPEAK</label>
            <input type="text" id="speak" value={formData.speak} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />

            <h2 className="text-2xl font-bold mb-4"><i>EMERGENCY CONTACT NUMBER</i></h2>
            <label htmlFor="emergencycontact" className="block text-gray-700 font-semibold mb-2">NAME:</label>
            <input type="text" id="emergencycontact" value={formData.emergencycontact} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            <label htmlFor="relationship" className="block text-gray-700 font-semibold mb-2">RELATIONSHIP:</label>
            <input type="text" id="relationship" value={formData.relationship} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            <label htmlFor="contactnumber" className="block text-gray-700 font-semibold mb-2">CONTACT NUMBER:</label>
            <input type="number" id="contactnumber" value={formData.contactnumber} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />

            <h2 className="text-2xl font-bold mb-4"><i>OTHER INFORMATION:</i></h2>
            <label htmlFor="gratuitynominee" className="block text-gray-700 font-semibold mb-2">GRATUITY NOMINEE:</label>
            <input type="text" id="gratuitynominee" value={formData.gratuitynominee} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            <label htmlFor="pfnominee1" className="block text-gray-700 font-semibold mb-2">PF NOMINEE:</label>
            <input type="text" id="pfnominee1" value={formData.pfnominee1} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            <label htmlFor="pfnominee2" className="block text-gray-700 font-semibold mb-2">PF NOMINEE:</label>
            <input type="text" id="pfnominee2" value={formData.pfnominee2} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            <label htmlFor="percentage3" className="block text-gray-700 font-semibold mb-2">PERCENTAGE:</label>
            <input type="text" id="percentage3" value={formData.percentage3} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />

        </form>

    )
}
