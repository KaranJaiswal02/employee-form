"use client"
import { useState } from 'react'

export default function Page() {
    const [formData, setFormData] = useState({
            name: "",
            fathername: "",
            dob: "",
            sex: "",
            maritalstatus: "",
            address: "",
    });
    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
        const { id, value } = e.target as HTMLInputElement; 
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data: ", formData);
        // Perform form submission logic here (e.g., send data to an API)
    };

    return (
        <form onSubmit={submitForm} className="p-6 max-w-3xl mx-auto my-10 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Declaration Form</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name of the applicant making nomination:</label>
                <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="fatherName" className="block text-gray-700 font-semibold mb-2">Father's Name:</label>
                <input type="text" id="fatherName" value={formData.fathername} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">Date of Birth:</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor='maritalStatus' className="block text-gray-700 font-semibold mb-2">Marital Status:</label>
                <select id="maritalStatus" value={formData.maritalstatus} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required>
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address:</label>
                <textarea id="address" value={formData.address} onChange={handleInputChange} className="border border-gray-300 rounded-lg p-2 w-full" required></textarea>
            </div>
        <p className="text-gray-700 mb-4">I hereby nominated the person(s)/cancel the nomination made by me previously and nominated the person(s) mentioned below to receive any amountdue to me from the employer, in event to my death:</p>
        </form>
        

    )
}
