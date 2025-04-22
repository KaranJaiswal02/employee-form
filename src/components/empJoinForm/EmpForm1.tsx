"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import IAPIResponse from '@/types/responseType'
import { IEmployeeJoinForm } from '@/models/empjoin_form'
import {empFormData} from '@/hooks/Atoms'
import { useAtom } from 'jotai'

export default function EmpForm1() {
    const [empFormData1, setEmpFormData1] = useAtom(empFormData);
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target as HTMLInputElement;
        // const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
        // setEmpFormData1({...empFormData1, [id]: value});
        setEmpFormData1(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = () => {
        if (isChecked) {
            setEmpFormData1(prev => ({ ...prev, perAddress: "", perDistrict: "", perState: "", perPincode: "" }));
        } else {
            setEmpFormData1(prev => ({ ...prev, perAddress: empFormData1.currAddress, perDistrict: empFormData1.district, perState: empFormData1.state, perPincode: empFormData1.pincode }));
        }
        setIsChecked(!isChecked);
    };

    const signatureChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Only image files are allowed.");
                return;
            }

            if (file.size > 1024 * 512) {
                alert("File size must be less than 500KB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const base64Content = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

                // console.log(base64Content);
                setEmpFormData1(prev => ({ ...prev, signature: base64Content }));
            };
            reader.readAsDataURL(file);
        }
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("Form Data: ", empFormData1);

        try {
            const response = await fetch("/api/empjoin-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(empFormData1),
            });

            const result : IAPIResponse<IEmployeeJoinForm> = await response.json();

            console.log(result)
            if (!result.success) {
                alert("Error: " + result.message);
                return;
            }
            // console.log(result.data);
            alert("Form submitted successfully!");

            setEmpFormData1({
                name: "",
                fatherName: "",
                designation: "",
                dob: "",
                currAddress: "",
                district: "",
                state: "",
                pincode: "",
                perAddress: "",
                perDistrict: "",
                perState: "",
                perPincode: "",
                companyName: "",
                companyAddress: "",
                department: "",
                bankName: "",
                accountNumber: "",
                ifsc: "",
                dateOfJoining: "",
                signature: null,
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit the form. Please try again.");
        }
    };


    return (
        // <div>
        //     <h2 className="text-xl font-semibold mb-4">Employee Joining Form</h2>
        //     <div className="grid grid-cols-2 gap-4">
        //         <div className="flex flex-col">
        //             <label htmlFor="name">Employee Name</label>
        //             <Input type="text" id="name" value={empFormData1.name} onChange={handleChange} placeholder="Enter your name" />
        //         </div>
        //         <div className="flex flex-col">
        //             <label htmlFor="fatherName">Father's Name</label>
        //             <Input type="text" id="fatherName" value={empFormData1.fatherName} onChange={handleChange} placeholder="Enter your Father's name" />
        //         </div>
        //         <div className="flex flex-col">
        //             <label htmlFor="dob">Date of Birth</label>
        //             {/* For date inputs, rely on the label instead of placeholder */}
        //             <Input type="date" id="dob" value={empFormData1.dob} onChange={handleChange} />
        //         </div>
        //         <div className="flex flex-col">
        //             <label htmlFor="designation">Designation</label>
        //             <DropdownMenu>
        //                 <DropdownMenuTrigger asChild>
        //                     <Button variant="outline">{empFormData1.designation || "Select Designation"}</Button>
        //                 </DropdownMenuTrigger>
        //                 <DropdownMenuContent className="w-56">
        //                     <DropdownMenuRadioGroup value={empFormData1.designation} onValueChange={(value) => setEmpFormData1(prev => ({ ...prev, designation: value }))}>
        //                         <DropdownMenuRadioItem value="Admin">Admin</DropdownMenuRadioItem>
        //                         <DropdownMenuRadioItem value="Manager">Manager</DropdownMenuRadioItem>
        //                         <DropdownMenuRadioItem value="Employee">Employee</DropdownMenuRadioItem>
        //                     </DropdownMenuRadioGroup>
        //                 </DropdownMenuContent>
        //             </DropdownMenu>
        //         </div>
        //     </div>

        //     <h3 className="text-lg font-semibold mt-6">Address Details</h3>
        //     <Textarea id="currAddress" placeholder="Enter your current address" onChange={handleChange} />
        //     <div className="grid grid-cols-3 gap-4">
        //         <Input id="district" placeholder="District" onChange={handleChange} />
        //         <Input id="state" placeholder="State" onChange={handleChange} />
        //         <Input id="pincode" placeholder="Pincode" type="number" onChange={handleChange} />
        //     </div>

        //     <div className="flex items-center gap-2 mt-4">
        //         <Checkbox checked={isChecked} onCheckedChange={handleCheckboxChange} />
        //         <label htmlFor="sameAsCurrent">Same as Current Address</label>
        //     </div>

        //     {!isChecked && (
        //         <>
        //             <Textarea id="perAddress" placeholder="Enter your permanent address" onChange={handleChange} />
        //             <div className="grid grid-cols-3 gap-4">
        //                 <Input id="perDistrict" placeholder="District" onChange={handleChange} />
        //                 <Input id="perState" placeholder="State" onChange={handleChange} />
        //                 <Input id="perPincode" placeholder="Pincode" type="number" onChange={handleChange} />
        //             </div>
        //         </>
        //     )}

        //     <h3 className="text-lg font-semibold mt-6">Company Details</h3>
        //     <Input id="companyName" placeholder="Company Name" onChange={handleChange} />
        //     <Textarea id="companyAddress" placeholder="Company Address" onChange={handleChange} />
        //     <Input id="department" placeholder="Department" onChange={handleChange} />

        //     <h3 className="text-lg font-semibold mt-6">Bank Details</h3>
        //     <div className="grid grid-cols-3 gap-4">
        //         <Input id="bankName" placeholder="Bank Name" onChange={handleChange} />
        //         <Input id="accountNumber" placeholder="Account Number" type="number" onChange={handleChange} />
        //         <Input id="ifsc" placeholder="IFSC Code" onChange={handleChange} />
        //     </div>

        //     <h3 className="text-lg font-semibold mt-6">Other Details</h3>
        //     <div className="grid grid-cols-2 gap-4">
        //         <div className="flex flex-col">
        //             <label htmlFor="dateOfJoining">Date of Joining</label>
        //             <Input id="dateOfJoining" type="date" value={empFormData1.dateOfJoining} onChange={handleChange} />
        //         </div>
        //         <div className="flex flex-col">
        //             <label htmlFor="signature">Signature</label>
        //             <Input id="signature" accept="image/*" type="file" onChange={signatureChangeHandler} />
        //         </div>
        //     </div>
        // </div>



        
            <div className="">
              <h1 className="text-2xl font-bold text-center mb-6">JOINING REPORT</h1>
          
              {/* Employee Basic Info */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="space-y-1">
                  <label className="block font-medium">Employee Name</label>
                  <Input type="text" id="name" value={empFormData1.name} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium">Father's Name</label>
                  <Input type="text" id="fatherName" value={empFormData1.fatherName} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium">Designation</label>
                  <Input type="text" id="designation" value={empFormData1.designation} onChange={handleChange} />
                </div>
              </div>
          
              {/* Address Section */}
              <div className="mb-6">
                <h3 className="font-bold mb-2">Address for Correspondence</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <label className="block">Date of Birth</label>
                    <Input type="date" id="dob" value={empFormData1.dob} onChange={handleChange} />
                  </div>
                  <div className="space-y-1">
                    <label className="block">Date of Joining</label>
                    <Input type="date" id="dateOfJoining" value={empFormData1.dateOfJoining} onChange={handleChange} />
                  </div>
                </div>
          
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <Input id="district" placeholder="Dist." onChange={handleChange} />
                  <Input id="state" placeholder="State" onChange={handleChange} />
                  <Input id="pincode" placeholder="PIN" onChange={handleChange} />
                </div>
          
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span>Tel: STD Code:</span>
                    <Input className="w-20" />
                    <span>Number:</span>
                    <Input className="flex-1" />
                  </div>
                </div>
          
                <div className="mb-2">
                  <label className="block font-medium mb-1">Permanent Address:</label>
                  <Textarea rows={2} />
                </div>
          
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <Input placeholder="Dist." />
                  <Input placeholder="State" />
                  <Input placeholder="PIN" />
                </div>
          
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span>Tel: STD Code:</span>
                    <Input className="w-20" />
                    <span>Number:</span>
                    <Input className="flex-1" />
                  </div>
                </div>
              </div>
          
              {/* Company Details */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="col-span-2 flex items-center gap-2">
                  <span>Company Name:</span>
                  <Input className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Location:</span>
                  <Input className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Deptt:</span>
                  <Input className="flex-1" />
                </div>
              </div>
          
              {/* Bank Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span>Bank A/c No:</span>
                  <Input className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Bank Name - ICICI:</span>
                  <Input className="flex-1" />
                </div>
              </div>
          
              {/* Documents Section */}
              <div className="mb-6">
                <h3 className="font-bold mb-2">Documents to be attached:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Photocopy of Educational Certificates</li>
                  <li>Experience Certificate/Relieving Letter from Previous Employer</li>
                  <li>Two Photographs</li>
                  <li>Date of Birth Proof</li>
                  <li>Salary Certificate/Salary Slip (previous employer)</li>
                  <li>Medical Fitness Certificate</li>
                </ul>
              </div>
          
              {/* Signature Section */}
              <div className="flex justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span>Date:</span>
                  <Input type="date" className="w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Signature:</span>
                  <Input type="file" accept="image/*" className="w-40" />
                </div>
              </div>
          
              {/* Certification */}
              <div className="space-y-4">
                <p>Certified that Mr./Ms. <span className="underline">_________</span> has joined on <span className="underline">_________</span></p>
                <div className="flex justify-between">
                  <div className="w-48 border-t border-black text-center pt-2">
                    Signature of Reporting In charge
                  </div>
                  <div className="w-48 border-t border-black text-center pt-2">
                    HR Department
                  </div>
                </div>
              </div>
            </div>
        
    );
}
