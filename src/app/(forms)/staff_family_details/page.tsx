"use client";

import React from "react";

export default function MedicalInsuranceForm() {
    return (
        <div className="bg-white text-black p-10 max-w-5xl mx-auto border border-gray-400 rounded-md text-sm">
            <h2 className="text-center text-lg font-semibold border-b border-black pb-2 mb-4">
                STAFF FAMILY MEMBERS DETAILS - MEDICAL INSURANCE
            </h2>

            <table className="w-full border border-black text-left text-sm">
                <tbody>
                    <tr className="border border-black">
                        <td className="p-2 border border-black">1</td>
                        <td className="p-2 border border-black">EMP. NO</td>
                        <td className="p-2 border border-black">
                            <input type="text" className="w-full" placeholder="Employee Number" />
                        </td>
                        <td className="p-2 border border-black">Emp. Name</td>
                        <td className="p-2 border border-black" colSpan={4}>
                            <input type="text" className="w-full" placeholder="Employee Name" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td></td>
                        <td className="p-2 border border-black">DEPARTMENT</td>
                        <td className="p-2 border border-black">
                            <input type="text" className="w-full" placeholder="Department" />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black">
                            <input type="date" className="w-full" />
                        </td>
                        <td className="p-2 border border-black">AGE</td>
                        <td className="p-2 border border-black">
                            <input type="number" className="w-full" placeholder="Age" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td></td>
                        <td className="p-2 border border-black">MARITAL STATUS</td>
                        <td className="p-2 border border-black" colSpan={5}>
                            <input type="text" placeholder="MARRIED / SINGLE" className="w-full" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">2</td>
                        <td className="p-2 border border-black">SPOUSE NAME</td>
                        <td className="p-2 border border-black" colSpan={2}>
                            <input type="text" className="w-full" placeholder="Spouse Name" />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black" colSpan={2}>
                            <input type="date" className="w-full" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">3</td>
                        <td className="p-2 border border-black">NO. OF CHILD</td>
                        <td className="p-2 border border-black" colSpan={5}>
                            <input type="number" className="w-full" placeholder="Number of Children" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">4</td>
                        <td className="p-2 border border-black">CHILD.1 NAME</td>
                        <td className="p-2 border border-black">
                            <input type="text" className="w-full" placeholder="Child 1 Name" />
                        </td>
                        <td className="p-2 border border-black">GENDER</td>
                        <td className="p-2 border border-black">
                            <input type="text" className="w-full" placeholder="Gender" />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black">
                            <input type="date" className="w-full" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">5</td>
                        <td className="p-2 border border-black">CHILD.2 NAME</td>
                        <td className="p-2 border border-black">
                            <input type="text" className="w-full" placeholder="Child 2 Name" />
                        </td>
                        <td className="p-2 border border-black">GENDER</td>
                        <td className="p-2 border border-black">
                            <input type="text" className="w-full" placeholder="Gender" />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black">
                            <input type="date" className="w-full" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">6</td>
                        <td className="p-2 border border-black">FATHER NAME / FATHER-IN-LAW</td>
                        <td className="p-2 border border-black" colSpan={3}>
                            <input type="text" className="w-full" placeholder="Father or Father-in-law Name" />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black">
                            <input type="date" className="w-full" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">7</td>
                        <td className="p-2 border border-black">MOTHER NAME / MOTHER-IN-LAW</td>
                        <td className="p-2 border border-black" colSpan={3}>
                            <input type="text" className="w-full" placeholder="Mother or Mother-in-law Name" />
                        </td>
                        <td className="p-2 border border-black">DOB</td>
                        <td className="p-2 border border-black">
                            <input type="date" className="w-full" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">8</td>
                        <td className="p-2 border border-black">MOBILE NUMBER</td>
                        <td className="p-2 border border-black" colSpan={5}>
                            <input type="number" className="w-full" placeholder="Mobile Number" />
                        </td>
                    </tr>

                    <tr className="border border-black">
                        <td className="p-2 border border-black">9</td>
                        <td className="p-2 border border-black">ADDRESS</td>
                        <td className="p-2 border border-black" colSpan={5}>
                            <textarea className="w-full h-16" placeholder="Full Address"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-between mt-6 text-sm">
                <div>
                    <span className="font-semibold">DATE:</span>
                    <input type="date" className="ml-2 border p-1" />
                </div>
                <div className="text-right">
                    <p className="font-semibold">THE EMPLOYEE SIGNATURE</p>
                </div>
            </div>

            <p className="text-xs mt-6 italic text-red-700">
                Note: Combination of Father & Father in-law / Mother & Mother in law is not allowed
            </p>
        </div>
    );
}
