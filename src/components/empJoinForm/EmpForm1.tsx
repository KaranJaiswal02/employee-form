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

    return (
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
                  <Input type='text' id="district" value={empFormData1.currAddress} placeholder="Dist." onChange={handleChange} />
                  <Input type='text' id="state" value={empFormData1.state} placeholder="State" onChange={handleChange} />
                  <Input type='text' id="pincode" value={empFormData1.pincode} placeholder="PIN" onChange={handleChange} />
                </div>
          
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span>Tel: STD Code:</span>
                    <Input type='text' id='stdcode' value={empFormData1.currstdcode} className="w-20" />
                    <span>Number:</span>
                    <Input  type='number' id='contactnumber' value={empFormData1.currcontactNumber} className="flex-1" />
                  </div>
                </div>
          
                <div className="mb-2">
                  <label className="block font-medium mb-1">Permanent Address:</label>
                  <Textarea rows={2} />
                </div>
          
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <Input type='text' id='district' value={empFormData1.perDistrict} placeholder="Dist." />
                  <Input type='text' id='state' value={empFormData1.perState} placeholder="State" />
                  <Input type='text' id='pincode' value={empFormData1.perPincode} placeholder="PIN" />
                </div>
          
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span>Tel: STD Code:</span>
                    <Input type='text' id='stdcode' value={empFormData1.perstdcode} className="w-20" />
                    <span>Number:</span>
                    <Input  type='number' id='contactnumber' value={empFormData1.percontactNumber} className="flex-1" />
                  </div>
                </div>
              </div>
          
              {/* Company Details */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="col-span-2 flex items-center gap-2">
                  <span>Company Name:</span>
                  <Input type='text' id='companyname' value={empFormData1.companyName} className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Location:</span>
                  <Input type='text' id='location' value={empFormData1.companylocation} className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Deptt:</span>
                  <Input  type='text' id='dept' value={empFormData1.department} className="flex-1" />
                </div>
              </div>
          
              {/* Bank Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span>Bank A/c No:</span>
                  <Input  type='text' id='bankaccount' value={empFormData1.accountNumber} className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Bank Name :</span>
                  <Input  type='text' id='bankname' value={empFormData1.bankName} className="flex-1" />
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
                  <Input type="date" id='date' value={empFormData1.date} className="w-40" />
                </div>
                <div className="w-48 border-t border-black text-center pt-2">
                  <span>Signature </span>
                  {/* <Input type="file" accept="image/*" className="w-40" /> */}
                </div>
              </div>
            
              {/* Certification */}
              <div className="space-y-4">
                <p>Certified that Mr./Ms. <span className="underline">________________________</span> has joined on <span className="underline">___________</span></p>
                <div className="flex justify-between pt-7">
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
