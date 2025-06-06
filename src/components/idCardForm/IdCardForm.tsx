"use client";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { idCardFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";

export default function IdCardForm() {
    const [formData, setFormData] = useAtom(idCardFormData);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <>
            <h1 className="text-center text-xl font-bold mb-4">ID CARD FORM</h1>

            <div className="grid grid-cols-3 gap-0 border border-black dark:border-white text-sm">

                <div className="col-span-2 w-full">
                    {/* NAME */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="name" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            NAME
                        </label>
                        <div className="w-2/3 flex items-center">
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                                disabled={true}
                                placeholder="Your Name"
                            />
                        </div>
                    </div>

                    {/* CODE */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="empcode" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            CODE
                        </label>
                        <div className="w-2/3 flex items-center">
                            <input
                                id="empcode"
                                type="text"
                                value={formData.empcode}
                                onChange={handleInputChange}
                                className="w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                                placeholder="your employment code"
                            />
                        </div>
                    </div>

                    {/* DEPARTMENT */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="department" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            DEPARTMENT
                        </label>
                        <div className="w-2/3 flex items-center">
                            <input
                                id="department"
                                type="text"
                                value={formData.department}
                                onChange={handleInputChange}
                                className="w-full text-md px-2 py-3 border-none focus:border-none"
                                placeholder="Your Department"
                                required
                            />
                        </div>
                    </div>

                    {/* DESIGNATION */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="designation" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            DESIGNATION
                        </label>
                        <div className="w-2/3 flex items-center">
                            <input
                                id="designation"
                                type="text"
                                value={formData.designation}
                                onChange={handleInputChange}
                                className="w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                                disabled={true}
                                required
                                placeholder="Your Designation"
                            />
                        </div>
                    </div>

                    {/* DOB */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="dob" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            DOB
                        </label>
                        <div className="w-2/3 flex items-center">
                            <input
                                id="dob"
                                type="date"
                                value={formData.dob?.toString().split('T')[0] ?? ''}
                                onChange={handleInputChange}
                                className="w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                                disabled={true}
                                required
                                min="1950-01-01"
                            />
                        </div>
                    </div>

                    {/* DOJ */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="dateOfJoining" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            DOJ
                        </label>
                        <div className="w-2/3 flex items-center">
                            <input
                                id="dateOfJoining"
                                type="date"
                                value={formData.dateOfJoining?.toString().split('T')[0] ?? ''}
                                onChange={handleInputChange}
                                className="w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* BLOOD GROUP */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="bloodGroup" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            BLOOD GROUP
                        </label>
                        <div className="w-2/3 flex items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-full text-left">
                                    <input
                                        id="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleInputChange}
                                        readOnly
                                        className="cursor-pointer w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                                        placeholder="Select Blood Group"
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48">
                                    <DropdownMenuRadioGroup
                                        value={formData.bloodGroup}
                                        onValueChange={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                bloodGroup: value,
                                            }))
                                        }
                                    >
                                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                                            (bg) => (
                                                <DropdownMenuRadioItem key={bg} value={bg}>
                                                    {bg}
                                                </DropdownMenuRadioItem>
                                            )
                                        )}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* FATHER NAME */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="fatherName" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            FATHER NAME
                        </label>
                        <div className="w-2/3 flex items-center">
                            <input
                                id="fatherName"
                                type="text"
                                value={formData.fatherName}
                                onChange={handleInputChange}
                                className="w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                                disabled={true}
                                required
                                placeholder="Your Father's Name"
                            />
                        </div>
                    </div>

                    {/* YEAR */}
                    <div className="flex border-b border-black dark:border-white h-12">
                        <label htmlFor="year" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                            YEAR
                        </label>
                        <div className="w-2/3 flex items-center">
                            <input
                                id="year"
                                type="text"
                                value={formData.year}
                                onChange={handleInputChange}
                                className="w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                                min="1970"
                                max="2100"
                            />
                        </div>
                    </div>
                </div>

                {/* PHOTO COLUMN */}
                <div className="row-span-9 border border-black dark:border-white flex items-center justify-center">
                    <label className="w-32 h-40 border-2 border-gray-400 text-center flex items-center justify-center text-xs cursor-pointer relative overflow-hidden">
                        {formData.photo ? (
                            <img
                                src={formData.photo || ""}
                                alt="Uploaded Photo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm">Upload Photo</span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="opacity-0 absolute inset-0 cursor-pointer"
                            disabled={true}
                            required
                        />
                    </label>

                </div>

                {/* ADDRESS ROW */}
                <div className="col-span-3 border-t border-black dark:border-white h-24 flex">
                    <label htmlFor="currAddress" className="w-1/6 border-r border-black dark:border-white px-2 font-semibold flex items-center">
                        ADDRESS
                    </label>
                    <label htmlFor="currAddress" className="w-5/6 flex items-center">
                        <textarea
                            id="currAddress"
                            rows={3}
                            value={formData.currAddress}
                            onChange={handleInputChange}
                            className="w-full flex px-2 py-1 text-md border-none focus:border-none focus:ring-0"
                            placeholder="Your Address"
                        />
                    </label>
                </div>

                {/* CONTACT NUMBER */}
                <div className="col-span-3 border-t border-black dark:border-white h-12 flex">
                    <label htmlFor="contactnumber" className="w-1/6 border-r border-black dark:border-white px-2 font-semibold flex items-center">
                        CONTACT NUMBER
                    </label>
                    <div className="w-5/6 flex items-center">
                        <input
                            id="contactnumber"
                            value={formData.contactnumber}
                            onChange={handleInputChange}
                            className="w-full text-md px-2 py-3 border-none focus:border-none focus:ring-0"
                            type="number"
                            pattern="[0-9]{10}"
                            placeholder="Your Contact Number"
                        />
                    </div>
                </div>

                {/* SIGNATURE */}
                <div className="col-span-3 border-t border-black dark:border-white h-12 flex">
                    <div className="w-1/6 border-r border-black dark:border-white px-2 font-semibold flex items-center">
                        SIGNATURE
                    </div>
                    <div className="w-5/6 px-2 flex items-center">
                    </div>
                </div>
            </div>
        </>
    );
}