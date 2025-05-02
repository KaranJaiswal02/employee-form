"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { bankMandateFormData, empFormData, formStatusus } from '@/hooks/Atoms';
import { Button } from '@/components/ui/button';
import RequiredLabel from '@/components/RequiredLabel';

export default function BankMandateForm() {
    const router = useRouter();
    const [formData, setFormData] = useAtom(bankMandateFormData);
    const [formData1] = useAtom(empFormData);
    const [, setFormStatus] = useAtom(formStatusus);
    const searchParams = useSearchParams()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

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
        console.log(formData)
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, accountType: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        e.preventDefault();
        const id = searchParams.get('id')
        console.log(formData);
        const response = await fetch("/api/forms/bank-mandate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`,
                "userid": id as string,
            },
            body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        if (responseData.success) {
            setFormStatus((prevStatus) => ({
                ...prevStatus,
                bank_mandate: {
                    ...prevStatus.bank_mandate,
                    status: "done",
                },
            }));
            const params = id ? `?id=${id}` : '';
            router.push(`/nomination-declaration-form1${params}`);
        }
        else {
            alert(responseData.message);
            setErrors(responseData.errors);
        }
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg">
            <div className="flex justify-between items-start mb-4">
                <img src="/assets/images/logo.png" alt="Company Logo" className="h-8 brightness-100 dark:brightness-150" />
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

                <div className="flex flex-col sm:flex-row">
                    <label htmlFor="name" className="w-72">
                        1. Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        onChange={handleChange}
                        value={formData.name || ""}
                        className="flex-1 border-b border-black dark:border-white sm:ml-4 focus:outline-none "
                        required
                        disabled={true}
                    />
                </div>

                <div className="flex flex-col sm:flex-row">
                    <label htmlFor="employeeCode" className="w-72">
                        2. Employee Code
                    </label>
                    <input
                        id="employeeCode"
                        type="text"
                        onChange={handleChange}
                        value={formData.employeeCode || ""}
                        className="flex-1 border-b border-black dark:border-white sm:ml-4 focus:outline-none"
                        required
                        disabled={false}
                    />
                </div>

                <div className="flex flex-col sm:flex-row">
                    <label htmlFor="categoryctdtstaff" className="w-72">
                        3. Category(CT/DT/STAFF)
                    </label>
                    <input
                        id="categoryctdtstaff"
                        type="text"
                        onChange={handleChange}
                        value={formData.categoryctdtstaff || ""}
                        className="flex-1 border-b border-black dark:border-white sm:ml-4 focus:outline-none"
                        required
                        disabled={false}
                    />
                </div>

                <div className="flex flex-col sm:flex-row">
                    <label htmlFor="address" className="w-72">
                        4. Address
                    </label>
                    <textarea
                        id="address"
                        onChange={handleChange}
                        value={formData.address || ""}
                        className="flex-1 border-b border-black dark:border-white sm:ml-4 resize-none h-16 focus:outline-none"
                        required
                        disabled={true}
                    />
                </div>
                <div className="flex flex-col sm:flex-row">
                    <RequiredLabel><label htmlFor="email" className="w-72">5. Email Id</label></RequiredLabel>
                    <input
                        id="email"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="flex-1 border-b border-black dark:border-white sm:ml-4 focus:outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col sm:flex-row">
                    <RequiredLabel><label htmlFor="pan" className="w-72">6. Permanent Account Number</label></RequiredLabel>
                    <input
                        id="pan"
                        type="text"
                        onChange={handleChange}
                        value={formData.pan}
                        className="flex-1 border-b border-black dark:border-white sm:ml-4 focus:outline-none"
                        required
                    />
                </div>
            </div>

            <p className="mb-2"><RequiredLabel>7. Particulars of bank:</RequiredLabel></p>

            <div className="overflow-x-auto">
                <table className="w-full border border-black dark:border-white text-sm">
                    <tbody>

                        <tr className="flex flex-col md:flex-row">
                            <td className="border border-black dark:border-white p-2 md:w-1/2 flex items-center justify-center">
                                <label htmlFor="bankName" className="text-center w-full">
                                    Bank Name
                                </label>
                            </td>
                            <td className="border border-black dark:border-white p-2 md:w-1/2">
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

                            <td className="border border-black dark:border-white p-2 md:w-1/2 flex items-center justify-center">
                                <label htmlFor="branchPlace" className="text-center w-full">
                                    Branch Place
                                </label>
                            </td>
                            <td className="border border-black dark:border-white p-2 md:w-1/2">
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
                            <td className="border border-black dark:border-white p-2 md:w-1/2 flex items-center justify-center">
                                <label htmlFor="branchCity" className="text-center w-full">
                                    Branch City</label></td>
                            <td className="border border-black dark:border-white p-2 md:w-1/2">
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
                            <td className="border border-black dark:border-white p-2 md:w-1/2 flex items-center justify-center">
                                <label htmlFor="pincode" className="text-center w-full">
                                    Pin Code</label></td>
                            <td className="border border-black dark:border-white p-2 md:w-1/2">
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
                            <td className="border border-black dark:border-white p-2" colSpan={4}>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <span><RequiredLabel>Account Type:</RequiredLabel></span>
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

                        {/* <tr>
                            <td className="border border-black dark:border-white p-2" colSpan={4}><RequiredLabel>
                                Account Number (as appearing in the cheque book):
                            </RequiredLabel>

                                <input
                                    id="accountNumber"
                                    type="number"
                                    className="w-full mt-2 outline-none border-t border-black dark:border-white"
                                    placeholder="Enter Account Number"
                                    onChange={handleChange}
                                    value={formData.accountNumber}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="border border-black dark:border-white p-2" colSpan={4}>
                                <RequiredLabel>IFSC Code:</RequiredLabel>
                                <input
                                    id="ifscCode"
                                    type="text"
                                    className="w-full mt-2 outline-none border-t border-black dark:border-white"
                                    placeholder="Enter IFSC Code"
                                    onChange={handleChange}
                                    value={formData.ifscCode}
                                    required
                                />
                            </td>
                        </tr> */}
                        <tr>
                            <td className="border border-black dark:border-white p-2" colSpan={4}>
                                <RequiredLabel> <label htmlFor="accountNumber" className="block">
                                    Account Number (as appearing in the cheque book):
                                </label></RequiredLabel>
                                <input
                                    id="accountNumber"
                                    type="number"
                                    className="w-full mt-2 outline-none border-t border-black dark:border-white"
                                    placeholder="Enter Account Number"
                                    onChange={handleChange}
                                    value={formData.accountNumber}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="border border-black dark:border-white p-2" colSpan={4}>
                                <RequiredLabel><label htmlFor="ifscCode" className="block">
                                    IFSC Code:
                                </label></RequiredLabel>
                                <input
                                    id="ifscCode"
                                    type="text"
                                    className="w-full mt-2 outline-none border-t border-black dark:border-white"
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
                    <label><p>Place:<b> Bengaluru</b></p></label>
                    {/* <input
                        id="place"
                        type="text"
                        onChange={handleChange}
                        value={formData.place}
                        className="border-b border-black dark:border-white outline-none flex-1"
                        required
                    /> */}
                </div>
                <div className="flex items-center gap-2">
                    <label>Date:</label>
                    <input
                        id="date"
                        type="date"
                        onChange={handleChange}
                        value={formData.date}
                        className="border-b border-black dark:border-white outline-none"
                        required
                        disabled={true}
                    />
                </div>
            </div>

            <div className="text-right font-bold mt-6 mb-4">SIGNATURE</div>
            {errors.length > 0 && (
                <div className="text-red-600 text-sm px-2 text-left">
                    {errors.map((err, index) => (
                        <div key={index}>{err}</div>
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-6">
                <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form >
    );
}