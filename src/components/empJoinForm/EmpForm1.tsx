"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { empFormData } from '@/hooks/Atoms'
import { useAtom } from 'jotai'
import RequiredLabel from '../RequiredLabel'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { toast } from 'sonner'
import { calculateAge } from '@/lib/calculateAge'

export default function EmpForm1() {
  const [empFormData1, setEmpFormData1] = useAtom(empFormData);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target as HTMLInputElement;
    if (id === "dob") {
      const age = calculateAge(value);
      if (age < 18) {
        toast.warning("Age must be at least 18 years.");
        return;
      }

      setEmpFormData1(prev => ({ ...prev, dob: value }));
      return;
    }
    setEmpFormData1(prev => ({ ...prev, [id]: value }));
    if (isChecked) {
      setEmpFormData1(prev => ({ ...prev, perAddress: empFormData1.currAddress, perDistrict: empFormData1.district, perState: empFormData1.state, perPincode: empFormData1.pincode, perstdcode: empFormData1.currstdcode, percontactNumber: empFormData1.currcontactNumber }));
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      setEmpFormData1(prev => ({ ...prev, perAddress: "", perDistrict: "", perState: "", perPincode: "", perstdcode: "", percontactNumber: "" }));
    } else {
      setEmpFormData1(prev => ({ ...prev, perAddress: empFormData1.currAddress, perDistrict: empFormData1.district, perState: empFormData1.state, perPincode: empFormData1.pincode, perstdcode: empFormData1.currstdcode, percontactNumber: empFormData1.currcontactNumber }));
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center mb-6">JOINING REPORT</h1>
      <h6 className="text-1.5xl font-bold text-center mb-6">Employee Basic Info</h6>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="space-y-1">
          <RequiredLabel><label htmlFor='name' className="block font-medium">Employee Name </label></RequiredLabel>
          <input
            type="text"
            id="name"
            value={empFormData1.name}
            onChange={handleChange}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
          />
        </div>
        <div className="space-y-1">
          <RequiredLabel><label htmlFor='fatherName' className="block font-medium"> Father's Name</label></RequiredLabel>
          <input
            type="text"
            id="fatherName"
            value={empFormData1.fatherName}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1">
          <RequiredLabel><label htmlFor='designation' className="block font-medium">Designation</label></RequiredLabel>
          <input
            type="text"
            id="designation"
            value={empFormData1.designation}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-6">

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <RequiredLabel> <label htmlFor='dob' className="block">Date of Birth </label></RequiredLabel>
            <input
              type="date"
              id="dob"
              value={empFormData1.dob.toString().split("T")[0]}
              onChange={handleChange}
              className="border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
              required
            />
          </div>

        </div>

        <h3 className="font-bold mb-2"> Address for Correspondence</h3>

        {/* Current Address */}
        <div className="mb-2">
          <RequiredLabel><label htmlFor='currAddress' className="block font-medium mb-1">Current Address:</label></RequiredLabel>
          <textarea
            rows={2}
            id="currAddress"
            value={empFormData1.currAddress}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-2">
          <input
            type="text"
            id="district"
            value={empFormData1.district}
            placeholder="Dist."
            onChange={handleChange}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
          />
          <input
            type="text"
            id="state"
            value={empFormData1.state}
            placeholder="State"
            onChange={handleChange}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
          />
          <input
            type="number"
            id="pincode"
            value={empFormData1.pincode}
            placeholder="PIN"
            onChange={handleChange}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
          />
        </div>
        <div className="flex flex-wrap cols-2 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>Tel: STD Code:</span>
            <input
              type="text"
              id="currstdcode"
              value={empFormData1.currstdcode}
              onChange={handleChange}
              className="w-20 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"

            />
            <RequiredLabel><label htmlFor='currcontactNumber' className='font-small'>Number:</label></RequiredLabel>
            <input
              type="number"
              id="currcontactNumber"
              value={empFormData1.currcontactNumber}
              onChange={handleChange}
              className="w-full flex-1 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
              required
            />
          </div>
        </div>

        <RequiredLabel> <label htmlFor='sameAsCurrent' className="block font-medium mb-1">Permanent Address:</label></RequiredLabel>
        {/* Same as Current Address Checkbox */}
        <div className="flex items-center gap-2 mb-2">
          <Checkbox id="sameAsCurrent" checked={isChecked} onCheckedChange={handleCheckboxChange} />
          <Label htmlFor="sameAsCurrent" className="text-sm">Same as Current Address</Label>
        </div>

        {/* Permanent Address */}
        {!isChecked && (<div>
          <div className="mb-2">
            <textarea
              rows={2}
              id="perAddress"
              value={empFormData1.perAddress}
              onChange={handleChange}
              disabled={isChecked}
              className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-2">
            <input
              type="text"
              id="perDistrict"
              value={empFormData1.perDistrict}
              placeholder="Dist."
              onChange={handleChange}
              className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
              disabled={isChecked}
              required
            />
            <input
              type="text"
              id="perState"
              value={empFormData1.perState}
              placeholder="State"
              onChange={handleChange}
              className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
              disabled={isChecked}
              required
            />
            <input
              type="text"
              id="perPincode"
              value={empFormData1.perPincode}
              placeholder="PIN"
              onChange={handleChange}
              className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
              disabled={isChecked}
              required
            />
          </div>


          <div className="flex flex-wrap cols-2 gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span>Tel: STD Code:</span>
              <input
                type="text"
                id="perstdcode"
                value={empFormData1.perstdcode}
                onChange={handleChange}
                className="w-20 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
                disabled={isChecked}
              />

              <RequiredLabel><label htmlFor="percontactNumber" className=" font-small">
                Number:
              </label></RequiredLabel>
              <input
                type="number"
                id="percontactNumber"
                value={empFormData1.percontactNumber}
                onChange={handleChange}
                className="w-full flex-1 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
                disabled={isChecked}
                required
              />

            </div>
          </div>
        </div>)}
      </div>

      {/* Company Details */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 flex items-center gap-2">
          <RequiredLabel><label htmlFor="companyName" className="block font-small">
            Company Name:
          </label></RequiredLabel>
          <input
            type="text"
            id="companyName"
            value={empFormData1.companyName}
            onChange={handleChange}
            className="w-full flex-1 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <RequiredLabel><label htmlFor="companylocation" className="font-small">
            Location:
          </label></RequiredLabel>
          <input
            type="text"
            id="companylocation"
            value={empFormData1.companylocation}
            onChange={handleChange}
            className="w-full flex-1 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <span>Deptt:</span>
          <input
            type='text'
            id='department'
            value={empFormData1.department}
            onChange={handleChange}
            className="w-full flex-1 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <RequiredLabel><label htmlFor='accountNumber' className='font-small'>Bank A/c No:</label></RequiredLabel>
          <input
            type='text'
            id='accountNumber'
            value={empFormData1.accountNumber}
            onChange={handleChange}
            className="w-full flex-1 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <RequiredLabel><label htmlFor='bankName' className='font-small'>Bank Name :</label></RequiredLabel>
          <input
            type='text'
            id='bankName'
            value={empFormData1.bankName}
            onChange={handleChange}
            className="w-full flex-1 border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
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
          <input
            type="date"
            id='date'
            value={empFormData1.date?.toString().split('T')[0]}
            onChange={handleChange}
            className="w-40 focus:outline-none"
          />
        </div>
        <div className="w-48 border-t border-black text-center pt-2">
          <span>Signature </span>
          {/* <input type="file" accept="image/*" className="w-40" /> */}
        </div>
      </div>

      {/* Certification */}
      <div className="space-y-4">
        <p>Certified that Mr./Ms. <span className="underline">{empFormData1.name || "________________________"}</span> has joined on
          <span className="underline">
            {empFormData1.dateOfJoining?.toString().split('T')[0]}
          </span>
        </p>
        {/* </div>
          {empFormData1.dateOfJoining || "___________"}
          </div></span></p> */}
        {/* <div className="space-y-4">
          <p>
            Certified that Mr./Ms. <span className="underline">{empFormData1.name || "________________________"}</span> has joined on
            <span className="underline">
              {empFormData1.dateOfJoining
                ? new Date(empFormData1.dateOfJoining).toISOString().split('T')[0]
                : "________________________"}
                
            </span>
          </p>
        </div> */}

        <div className="flex justify-between pt-7">
          <div className="w-48 border-t border-black text-center pt-2">
            Signature of Reporting In charge
          </div>
          <div className="w-48 border-t border-black text-center pt-2">
            HR Department
          </div>
        </div>
      </div>
    </div >
  );
}