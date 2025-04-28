"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { bankMandateFormData, empFormData, formStatusus } from '@/hooks/Atoms';
import { Button } from '@/components/ui/button';

export default function BankMandateForm() {
    const router = useRouter();
    const [formData, setFormData] = useAtom(bankMandateFormData);
    const [formData1] = useAtom(empFormData);
    const [formStatus, setFormStatus] = useAtom(formStatusus);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            name: formData1.name || "",
            address: formData1.perAddress || "",
        }));
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, accountType: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic here
        console.log(formData);
        // Dummy DB call simulation
        const dummyDBCall = () => true;
        if (dummyDBCall()) {
            router.push("/nomination-declaration-form1"); // Redirect to a thank you page or another page
        } else {
            alert("Form Submission Failed!");
        }
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        const response = await fetch("/api/bank-mandate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.status === 201) {
            setFormStatus((prevStatus) => ({
                ...prevStatus,
                form4: {
                    ...prevStatus.form4,
                    status: "done",
                },
            }));
            router.push("/nomination-declaration-form1");
        }
        else {
            const responseData = await response.json();
            alert(responseData.errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg">
            <div className="flex justify-between items-start mb-4">
                <img src="/assets/images/logo.png" alt="Company Logo" className="h-8" />
                <span className="font-semibold">Annexure</span>
            </div>

            <h2 className="text-center font-bold underline mb-6">BANK MANDATE FORM FOR ELECTRONIC PAYMENT</h2>

            <div className="mb-4">
                <p>TO</p>
                <div className='mb-4'>
                    <p className="font-semibold">SL AP PRIVATE LTD</p>
                </div>
                <p>Dear Sir</p>
            </div>

            <div className="mb-4">
                <p className="font-semibold">Sub: Authorization for credit of salary through NEFT/RTGS</p>
            </div>

            <div className="space-y-3 mb-4">
                {['Name', 'Employee Code', 'Category(CT/DT/STAFF)', 'Address'].map((label, i) => (
                    <div key={i} className="flex flex-col sm:flex-row">
                        <label htmlFor={label.toLowerCase().replace(/[^a-z]/gi, '')} className="w-72">
                            {i + 1}. {label}
                        </label>
                        {label === 'Address' ? (
                            <textarea
                                id={label.toLowerCase().replace(/[^a-z]/gi, '')}
                                onChange={handleChange}
                                value={formData[label.toLowerCase().replace(/[^a-z]/gi, '') as keyof typeof formData]}
                                className="flex-1 border-b border-black sm:ml-4 resize-none h-16"
                                required
                                disabled={label === 'Address' || label === 'Name'}

                            />
                        ) : (
                            <input
                                id={label.toLowerCase().replace(/[^a-z]/gi, '')}
                                type="text"
                                onChange={handleChange}
                                value={formData[label.toLowerCase().replace(/[^a-z]/gi, '') as keyof typeof formData]}
                                className="flex-1 border-b border-black sm:ml-4"
                                required
                                disabled={label === 'Address' || label === 'Name'}
                            />
                        )}
                    </div>
                ))}
                <div className="flex flex-col sm:flex-row">
                    <label htmlFor="email" className="w-72">5. Email Id</label>
                    <input
                        id="email"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="flex-1 border-b border-black sm:ml-4"
                        required
                    />
                </div>

                <div className="flex flex-col sm:flex-row">
                    <label htmlFor="pan" className="w-72">6. Permanent Account Number</label>
                    <input
                        id="pan"
                        type="text"
                        onChange={handleChange}
                        value={formData.pan}
                        className="flex-1 border-b border-black sm:ml-4"
                        required
                    />
                </div>
            </div>

            <p className="mb-2">7. Particulars of bank:</p>

            <div className="overflow-x-auto">
                <table className="w-full border border-black text-sm">
                    <tbody>
                        <tr className="flex flex-col md:flex-row">
                            <td className="border border-black p-2 md:w-1/2 flex items-center justify-center">Bank Name</td>
                            <td className="border border-black p-2 md:w-1/2">
                                <input
                                    id="bankName"
                                    type="text"
                                    className="w-full outline-none"
                                    placeholder="Enter Bank Name"
                                    onChange={handleChange}
                                    value={formData.bankName}
                                    required
                                />
                            </td>
                            <td className="border border-black p-2 md:w-1/2 flex items-center justify-center">Branch Place</td>
                            <td className="border border-black p-2 md:w-1/2">
                                <input
                                    id="branchPlace"
                                    type="text"
                                    className="w-full outline-none"
                                    placeholder="Enter Branch Place"
                                    onChange={handleChange}
                                    value={formData.branchPlace}
                                    required
                                />
                            </td>
                        </tr>

                        <tr className="flex flex-col md:flex-row">
                            <td className="border border-black p-2 md:w-1/2 flex items-center justify-center">Branch City</td>
                            <td className="border border-black p-2 md:w-1/2">
                                <input
                                    id="branchCity"
                                    type="text"
                                    className="w-full outline-none"
                                    placeholder="Enter Branch City"
                                    onChange={handleChange}
                                    value={formData.branchCity}
                                    required
                                />
                            </td>
                            <td className="border border-black p-2 md:w-1/2 flex items-center justify-center">Pin Code</td>
                            <td className="border border-black p-2 md:w-1/2">
                                <input
                                    id="pincode"
                                    type="text"
                                    className="w-full outline-none"
                                    placeholder="Enter Pin Code"
                                    onChange={handleChange}
                                    value={formData.pincode}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="border border-black p-2" colSpan={4}>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <span>Account Type:</span>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="accountType"
                                            value="Savings"
                                            className="mr-1"
                                            checked={formData.accountType === 'Savings'}
                                            onChange={handleRadioChange}
                                            required
                                        />
                                        Savings
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="accountType"
                                            value="Current"
                                            className="mr-1"
                                            checked={formData.accountType === 'Current'}
                                            onChange={handleRadioChange}
                                        />
                                        Current
                                    </label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="border border-black p-2" colSpan={4}>
                                Account Number (as appearing in the cheque book):
                                <input
                                    id="accountNumber"
                                    type="text"
                                    className="w-full mt-2 outline-none border-t border-black"
                                    placeholder="Enter Account Number"
                                    onChange={handleChange}
                                    value={formData.accountNumber}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="border border-black p-2" colSpan={4}>
                                IFSC Code:
                                <input
                                    id="ifscCode"
                                    type="text"
                                    className="w-full mt-2 outline-none border-t border-black"
                                    placeholder="Enter IFSC Code"
                                    onChange={handleChange}
                                    value={formData.ifscCode}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="my-4">
                <p>7. Date from which the mandate should be effective: <span className="font-bold">Immediately</span></p>
            </div>

            <p className="mb-6 text-justify">
                I hereby declare that the particulars given above are correct and complete. If any transaction is delayed or not effected for reasons of incomplete or incorrect information, I shall not hold SL AP PRIVATE LTD responsible.
                I also undertake to advise any change in the particulars of my account to facilitate updation of records for the purpose of credit of amount through NEFT/RTGS.
                I am attaching a cancelled cheque leaf of my bank account.
            </p>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                <div className="flex items-center gap-2">
                    <label>Place:</label>
                    <input
                        id="place"
                        type="text"
                        onChange={handleChange}
                        value={formData.place}
                        className="border-b border-black outline-none flex-1"
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label>Date:</label>
                    <input
                        id="date"
                        type="date"
                        onChange={handleChange}
                        value={formData.date}
                        className="border-b border-black outline-none"
                        required
                    />
                </div>
            </div>

            <div className="text-right font-bold mt-6 mb-4">SIGNATURE</div>

            <div className="flex justify-center mt-6">
                <Button type="submit" className="w-full cursor-pointer">Submit</Button>
            </div>
        </form >
    );
}