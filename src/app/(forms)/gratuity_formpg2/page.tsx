/*"use client";
import { useState } from "react";

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        sex: "",
        religion: "",
        maritalStatus: "",
        department: "",
        postHeld: "",
        appointmentDate: "",
        village: "",
        thana: "",
        subdivision: "",
        postOffice: "",
        district: "",
        state: "",
        place: "",
        signature: "",
        date: "",
        


    });
    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data: ", formData);
        // Perform form submission logic here (e.g., send data to an API)
    };

    return (
        <form onSubmit={submitForm} className="flex flex-col items-center justify-center h-screen bg-gray-100">

            <div className="flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Employee Statement</h1>
                <h3 className="text-xl mb-4">Form Details</h3>
            </div>


            <div className="flex flex-col items-left justify-left bg-gray-100 w-full max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block">1. Name of employee in full</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="sex" className="block">2. Sex</label>
                    <input
                        type="text"
                        id="sex"
                        value={formData.sex}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter your sex (e.g., Male/Female)"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="religion" className="block">3. Religion</label>
                    <input
                        type="text"
                        id="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter your religion"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="maritalStatus" className="block">4. Whether unmarried/married/widow/widower</label>
                    <input
                        type="text"
                        id="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter your marital status"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="department" className="block">5. Department/Branch/Section where employed</label>
                    <input
                        type="text"
                        id="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter your department"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="postHeld" className="block">6. Post held with Ticket No. or Serial No., if any</label>
                    <input
                        type="text"
                        id="postHeld"
                        value={formData.postHeld}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter your post held and ticket/serial no."
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="appointmentDate" className="block">7. Date of appointment</label>
                    <input
                        type="date"
                        id="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block">8. Permanent address:</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="village">Village</label>
                            <input
                                type="text"
                                id="village"
                                value={formData.village}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                placeholder="Enter village"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="thana">Thana</label>
                            <input
                                type="text"
                                id="thana"
                                value={formData.thana}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                placeholder="Enter thana"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="subdivision">Sub-division</label>
                            <input
                                type="text"
                                id="subdivision"
                                value={formData.subdivision}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                placeholder="Enter subdivision"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="postOffice">Post Office</label>
                            <input
                                type="text"
                                id="postOffice"
                                value={formData.postOffice}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                placeholder="Enter post office"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="district">District</label>
                            <input
                                type="text"
                                id="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                placeholder="Enter district"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                placeholder="Enter state"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="place" className="block">Place</label>
                    <input
                        type="text"
                        id="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter the place"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="signature" className="block">Signature/Thumb-impression of the Employee</label>
                    <input
                        type="text"
                        id="signature"
                        value={formData.signature}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter signature/thumb-impression"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
            </div>

        </form>
    )
}
    */

import React from "react";

export default function GratuityFormFStatement() {
    return (
        <div className="bg-white text-black p-8 max-w-4xl mx-auto text-sm border border-gray-400 rounded-md space-y-4">
            <h4 className="font-bold text-center mb-4">Statement</h4>

            <ol className="list-decimal list-inside space-y-2">
                <li className="flex">
                    Name of employee in full:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Sex:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Religion:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Whether unmarried/married/widow/widower:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Department/Branch/Section where employed:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Post held with Ticket No. or Serial No., if any:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Date of appointment:
                    <input type="date" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li>
                    Permanent address:
                    <div className="ml-4 mt-2 space-y-1">
                        <div>
                            Village:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; Thana:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; Sub-division:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                        </div>
                        <div>
                            Post Office:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; District:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; State:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                        </div>
                    </div>
                </li>
            </ol>

            <hr className="my-6 border-black" />

            <div className="mt-6">
                <p>
                    Place: <input type="text" className="border-b border-black w-48 inline-block ml-2" />
                </p>
                <p className="mt-2">
                    Date: <input type="date" className="border-b border-black w-48 inline-block ml-2" />
                </p>
                <p className="mt-4 text-right font-semibold">Signature/Thumb-impression of the Employee</p>
            </div>

            <hr className="my-6 border-black" />

            <h4 className="font-bold text-center">Declaration by Witnesses</h4>
            <p>Nomination signed/thumb-impressed before me</p>
            <p>Name in full and Full address of witnesses. </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <input type="text" className="border-b border-black w-full" placeholder="Name and address" />
                        </li>
                        <li>
                            <input type="text" className="border-b border-black w-full" placeholder="Name and address" />
                        </li>
                    </ol>
                </div>
                <div>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <input type="text" className="border-b border-black w-full" placeholder="Signature" />
                        </li>
                        <li>
                            <input type="text" className="border-b border-black w-full" placeholder="Signature" />
                        </li>
                    </ol>
                </div>
            </div>

            <p className="mt-4">Place: <input type="text" className="border-b border-black w-48 inline-block ml-2" /></p>
            <p>Date: <input type="date" className="border-b border-black w-48 inline-block ml-2" /></p>

            <hr className="my-6 border-black" />

            <h4 className="font-bold text-center">Certificate by the Employer</h4>
            <p>
                Certified that the particulars of the above nomination have been verified and recorded in this establishment.
            </p>
            <p>
                Employer's Reference No., if any:{" "}
                <input type="text" className="border-b border-black w-60 inline-block" />
            </p>
            <p className="mt-2">
                Signature of the employer/Officer authorised:{" "}
                <input type="text" className="border-b border-black w-60 inline-block" />
            </p>
            <p>Date: <input type="date" className="border-b border-black w-48 inline-block ml-2" /></p>
            <p>
                Name and address of the establishment or rubber stamp thereof:
                <textarea className="w-full border border-black mt-2 h-20" />
            </p>

            <hr className="my-6 border-black" />

            <h4 className="font-bold text-center">Acknowledgement by the Employee</h4>
            <p>
                Received the duplicate copy of nomination in Form 'F' filed by me and duly certified by the employer.
            </p>
            <p className="mt-2">
                Date: <input type="date" className="border-b border-black w-48 inline-block ml-2" />
            </p>
            <p className="text-right font-semibold mt-4">Signature of the Employee</p>


            <hr className="my-6 border-black" />

            <p className="text-xs italic mt-4">
                Note.—Strike out the words/paragraphs not applicable.
            </p>
        </div>
    );
}


