"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { empFormData } from '@/hooks/Atoms'
import { useAtom } from 'jotai'

export default function EmpForm1() {
  const [empFormData1, setEmpFormData1] = useAtom(empFormData);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target as HTMLInputElement;
    setEmpFormData1(prev => ({ ...prev, [id]: value }));
    if (isChecked) {
      setEmpFormData1(prev => ({ ...prev, perAddress: empFormData1.currAddress, perDistrict: empFormData1.district, perState: empFormData1.state, perPincode: empFormData1.pincode, perstdcode: empFormData1.currstdcode,percontactNumber: empFormData1.currcontactNumber }));
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      setEmpFormData1(prev => ({ ...prev, perAddress: "", perDistrict: "", perState: "", perPincode: "", perstdcode: "", percontactNumber: "" }));
    } else {
      setEmpFormData1(prev => ({ ...prev, perAddress: empFormData1.currAddress, perDistrict: empFormData1.district, perState: empFormData1.state, perPincode: empFormData1.pincode, perstdcode: empFormData1.currstdcode,percontactNumber: empFormData1.currcontactNumber }));
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center mb-6">JOINING REPORT</h1>

      {/* Employee Basic Info */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="space-y-1">
          <label className="block font-medium">Employee Name</label>
          <Input
            type="text"
            id="name"
            value={empFormData1.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label className="block font-medium">Father's Name</label>
          <Input
            type="text"
            id="fatherName"
            value={empFormData1.fatherName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label className="block font-medium">Designation</label>
          <Input
            type="text"
            id="designation"
            value={empFormData1.designation}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-6">

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <label className="block">Date of Birth</label>
            <Input
              type="date"
              id="dob"
              value={empFormData1.dob}
              onChange={handleChange}
            />
          </div>

        </div>

        <h3 className="font-bold mb-2">Address for Correspondence</h3>

        {/* Current Address */}
        <div className="mb-2">
          <label className="block font-medium mb-1">Current Address:</label>
          <Textarea
            rows={2}
            id="currAddress"
            value={empFormData1.currAddress}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-2">
          <Input
            type="text"
            id="district"
            value={empFormData1.district}
            placeholder="Dist."
            onChange={handleChange}
          />
          <Input
            type="text"
            id="state"
            value={empFormData1.state}
            placeholder="State"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="pincode"
            value={empFormData1.pincode}
            placeholder="PIN"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span>Tel: STD Code:</span>
            <Input
              type="text"
              id="currstdcode"
              value={empFormData1.currstdcode}
              onChange={handleChange}
              className="w-20"
            />
            <span>Number:</span>
            <Input
              type="number"
              id="currcontactNumber"
              value={empFormData1.currcontactNumber}
              onChange={handleChange}
              className="flex-1"
            />
          </div>
        </div>

        <label className="block font-medium mb-1">Permanent Address:</label>
        {/* Same as Current Address Checkbox */}
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="sameAsCurrent"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
          <label htmlFor="sameAsCurrent" className="text-sm">
            Same as Current Address
          </label>
        </div>

        {/* Permanent Address */}
        {!isChecked && (<div>
          <div className="mb-2">
            <Textarea
              rows={2}
              id="perAddress"
              value={empFormData1.perAddress}
              onChange={handleChange}
              disabled={isChecked}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-2">
            <Input
              type="text"
              id="perDistrict"
              value={empFormData1.perDistrict}
              placeholder="Dist."
              onChange={handleChange}
              disabled={isChecked}
            />
            <Input
              type="text"
              id="perState"
              value={empFormData1.perState}
              placeholder="State"
              onChange={handleChange}
              disabled={isChecked}
            />
            <Input
              type="text"
              id="perPincode"
              value={empFormData1.perPincode}
              placeholder="PIN"
              onChange={handleChange}
              disabled={isChecked}
            />
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span>Tel: STD Code:</span>
              <Input
                type="text"
                id="perstdcode"
                value={empFormData1.perstdcode}
                onChange={handleChange}
                className="w-20"
                disabled={isChecked}
              />
              <span>Number:</span>
              <Input
                type="number"
                id="percontactNumber"
                value={empFormData1.percontactNumber}
                onChange={handleChange}
                className="flex-1"
                disabled={isChecked}
              />
            </div>
          </div>
        </div>)}


      </div>

      {/* Company Details */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 flex items-center gap-2">
          <span>Company Name:</span>
          <Input
            type='text'
            id='companyName'
            value={empFormData1.companyName}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Location:</span>
          <Input
            type='text'
            id='companylocation'
            value={empFormData1.companylocation}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Deptt:</span>
          <Input
            type='text'
            id='department'
            value={empFormData1.department}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span>Bank A/c No:</span>
          <Input
            type='text'
            id='accountNumber'
            value={empFormData1.accountNumber}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Bank Name :</span>
          <Input
            type='text'
            id='bankName'
            value={empFormData1.bankName}
            onChange={handleChange}
            className="flex-1"
          />
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
          <Input
            type="date"
            id='date'
            value={empFormData1.date}
            onChange={handleChange}
            className="w-40"
          />
        </div>
        <div className="w-48 border-t border-black text-center pt-2">
          <span>Signature </span>
          {/* <Input type="file" accept="image/*" className="w-40" /> */}
        </div>
      </div>

      {/* Certification */}
      <div className="space-y-4">
        <p>Certified that Mr./Ms. <span className="underline">{empFormData1.name || "________________________"}</span> has joined on <span className="underline">{empFormData1.dateOfJoining || "___________"}</span></p>
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