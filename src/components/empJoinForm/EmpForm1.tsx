"use client"
import { useState } from 'react'
import { empFormData } from '@/hooks/Atoms'
import { useAtom } from 'jotai'
import RequiredLabel from '../RequiredLabel'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { toast } from 'sonner'
import { calculateAge } from '@/lib/calculateAge'
import { useEffect } from 'react'

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

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeKB = file.size / 1024;

    if (fileSizeKB < 50 || fileSizeKB > 500) {
      toast.error("Invalid Photo Size", {
        description: "Please upload a photo between 50 KB and 500 KB.",
      });
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setEmpFormData1((prev) => ({ ...prev, photo: base64String }));
    };
    reader.readAsDataURL(file);
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

      <div className="flex justify-between items-start mb-1">
        <img src="/assets/images/logo.png" alt="Company Logo" className="h-8 brightness-100 dark:brightness-150" />
        <span className="font-semibold">Annexure1</span>
      </div>

      <h1 className="text-2xl font-bold text-center mb-4 underline">JOINING REPORT</h1>
      {/* <h6 className="text-1.5xl font-bold text-center mb-6">Employee Basic Info</h6> */}

      {/* <div className="grid grid-cols-3 gap-4 mb-1">
        <div className="space-y-0.5">
          <RequiredLabel><label htmlFor='name' className="block font-semibold">Employee Name </label></RequiredLabel>
          <input
            type="text"
            id="name"
            value={empFormData1.name}
            onChange={handleChange}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            required
          />
        </div>
        <div className="space-y-0.5">
          <RequiredLabel><label htmlFor='fatherName' className="block font-semibold"> Father&rsquo;s Name</label></RequiredLabel>
          <input
            type="text"
            id="fatherName"
            value={empFormData1.fatherName}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-0.5">
          <RequiredLabel><label htmlFor='designation' className="block font-semibold">Designation</label></RequiredLabel>
          <input
            type="text"
            id="designation"
            value={empFormData1.designation}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            onChange={handleChange}
            required
          />
        </div>
      </div> */}

      {/* Address Section */}
      <div className="mb-6">

        {/* <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-0.5">
            <RequiredLabel> <label htmlFor='dob' className="block font-semibold">Date of Birth </label></RequiredLabel>
            <input
              type="date"
              id="dob"
              value={empFormData1.dob.toString().split("T")[0]}
              onChange={handleChange}
              className="border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
              required
            />
          </div>

        </div> */}
        <div className="flex gap-6">
          {/* Left 70% section for inputs */}
          <div className="w-[70%] space-y-4">
            {/* Line 1: Employee Name and Father's Name */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <RequiredLabel>
                  <label htmlFor="name" className="font-semibold block mb-1">Employee Name</label>
                </RequiredLabel>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={empFormData1.name}
                  onChange={handleChange}
                  className="w-full border-b border-black dark:border-white focus:outline-none pb-1"
                  required
                />
              </div>
              <div className="w-1/2">
                <RequiredLabel>
                  <label htmlFor="fatherName" className="font-semibold block mb-1">Father&rsquo;s Name</label>
                </RequiredLabel>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  value={empFormData1.fatherName}
                  onChange={handleChange}
                  className="w-full border-b border-black dark:border-white focus:outline-none pb-1"
                  required
                />
              </div>
            </div>

            {/* Line 2: Designation and DOB */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <RequiredLabel>
                  <label htmlFor="designation" className="font-semibold block mb-1">Designation</label>
                </RequiredLabel>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={empFormData1.designation}
                  onChange={handleChange}
                  className="w-full border-b border-black dark:border-white focus:outline-none pb-1"
                  required
                />
              </div>
              <div className="w-1/2">
                <RequiredLabel>
                  <label htmlFor="dob" className="font-semibold block mb-1">Date of Birth</label>
                </RequiredLabel>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={empFormData1.dob.toString().split("T")[0]}
                  onChange={handleChange}
                  className="w-full border-b border-black dark:border-white focus:outline-none pb-1"
                  required
                />
              </div>
            </div>
          </div>

          {/* section for Photo */}
          <div className="row-span-9 flex items-center ml-12 justify-center">
            <label className="w-32 h-40 border-2 border-gray-400 text-center flex items-center justify-center text-xs cursor-pointer relative overflow-hidden">
              {empFormData1.photo ? (
                <img
                  src={empFormData1.photo || ""}
                  alt="Uploaded Photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm">Upload Photo</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="opacity-0 absolute inset-0 cursor-pointer"
                required
              />
            </label>
          </div>
        </div>


        <h3 className="font-bold mb-1"> Address for Correspondence</h3>

        {/* Current Address */}
        <div className="mb-2">
          <RequiredLabel><label htmlFor='currAddress' className="block font-semibold mb-1">Current Address:</label></RequiredLabel>
          <textarea
            rows={1}
            id="currAddress"
            value={empFormData1.currAddress}
            className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-0.5">
          <input
            type="text"
            id="district"
            value={empFormData1.district}
            placeholder="Dist."
            onChange={handleChange}
            className="w-full border-b-1 border-black dark:border-white pb-0 focus:outline-none mr-2"
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
          <div className="flex flex-wrap items-center gap-2 font-semibold">
            <span>Tel: STD Code:</span>
            <input
              type="text"
              id="currstdcode"
              value={empFormData1.currstdcode}
              onChange={handleChange}
              className="w-20 border-b-1 border-black font-normal dark:border-white pb-0 focus:outline-none mr-2"

            />
            <RequiredLabel><label htmlFor='currcontactNumber' className='font-small'>Number:</label></RequiredLabel>
            <input
              type="number"
              id="currcontactNumber"
              value={empFormData1.currcontactNumber}
              onChange={handleChange}
              className="w-full flex-1 border-b-1 border-black dark:border-white pb-0 font-normal focus:outline-none mr-2"
              required
            />
          </div>
        </div>

        <RequiredLabel> <label htmlFor='sameAsCurrent' className="block font-medium mt-1 mb-1">Permanent Address:</label></RequiredLabel>
        {/* Same as Current Address Checkbox */}
        <div className="flex items-center gap-2 mb-1">
          <Checkbox id="sameAsCurrent" checked={isChecked} onCheckedChange={handleCheckboxChange} />
          <Label htmlFor="sameAsCurrent" className="text-sm">Same as Current Address</Label>
        </div>

        {/* Permanent Address */}
        {!isChecked && (<div>
          <div className="mb-2">
            <textarea
              rows={1}
              id="perAddress"
              value={empFormData1.perAddress}
              onChange={handleChange}
              disabled={isChecked}
              className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-0.5">
            <input
              type="text"
              id="perDistrict"
              value={empFormData1.perDistrict}
              placeholder="Dist."
              onChange={handleChange}
              className="w-full border-b-1 border-black dark:border-white pb-0 focus:outline-none mr-2"
              disabled={isChecked}
              required
            />
            <input
              type="text"
              id="perState"
              value={empFormData1.perState}
              placeholder="State"
              onChange={handleChange}
              className="w-full border-b-1 border-black dark:border-white pb-0 focus:outline-none mr-2"
              disabled={isChecked}
              required
            />
            <input
              type="text"
              id="perPincode"
              value={empFormData1.perPincode}
              placeholder="PIN"
              onChange={handleChange}
              className="w-full border-b-1 border-black dark:border-white pb-0 focus:outline-none mr-2"
              disabled={isChecked}
              required
            />
          </div>


          <div className="flex flex-wrap cols-2 gap-4">
            <div className="flex flex-wrap items-center gap-2 font-semibold">
              <span>Tel: STD Code:</span>
              <input
                type="text"
                id="perstdcode"
                value={empFormData1.perstdcode}
                onChange={handleChange}
                className="w-20 border-b-1 border-black dark:border-white pb-1 font-normal focus:outline-none mr-2"
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
                className="w-full flex-1 border-b-1 border-black dark:border-white pb-1 font-normal focus:outline-none mr-2"
                disabled={isChecked}
                required
              />

            </div>
          </div>
        </div>)}
      </div>

      <div className="flex flex-wrap gap-4 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-[350px]">
          <RequiredLabel>
            <label htmlFor="companyName" className="block font-semibold">
              Company Name:
            </label>
          </RequiredLabel>
          <input
            type="text"
            id="companyName"
            value={empFormData1.companyName}
            onChange={handleChange}
            className="w-[210px] border-b border-black dark:border-white pb-0 focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <RequiredLabel>
            <label htmlFor="companylocation" className="font-semibold">
              Location:
            </label>
          </RequiredLabel>
          <input
            type="text"
            id="companylocation"
            value={empFormData1.companylocation}
            onChange={handleChange}
            className="w-full border-b border-black dark:border-white pb-0 focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-[70px] font-semibold">
          <span>Dept:</span>
          <input
            type='text'
            id='department'
            value={empFormData1.department}
            onChange={handleChange}
            className="w-full border-b border-black font-normal dark:border-white pb-0 focus:outline-none"
          />
        </div>
      </div>


      {/* Bank Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <RequiredLabel><label htmlFor='accountNumber' className='font-semibold'>Bank A/c No:</label></RequiredLabel>
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
          <RequiredLabel><label htmlFor='bankName' className='font-semibold'>Bank Name :</label></RequiredLabel>
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
        <h3 className="font-bold mb-1">Documents to be attached:</h3>
        <ul className="list-disc pl-5 space-y-0">
          <li>Photocopy of Educational Certificates</li>
          <li>Experience Certificate/Relieving Letter from Previous Employer</li>
          <li>Two Photographs</li>
          <li>Date of Birth Proof</li>
          <li>Salary Certificate/Salary Slip (previous employer)</li>
          <li>Medical Fitness Certificate</li>
        </ul>
      </div>

      {/* Signature Section */}
      <div className="flex justify-between font-semibold mb-3">
        <div className="flex items-center gap-2">
          <span>Date:</span>
          <input
            type="date"
            id='date'
            value={empFormData1.date?.toString().split('T')[0] ?? ''}
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
      <div className="space-y-3">
        <p>Certified that Mr./Ms. <span className="underline">{empFormData1.name || "________________________"}</span> has joined on
          <span className="underline">
            {empFormData1.dateOfJoining?.toString().split('T')[0] ?? ''}
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

        <div className="flex justify-between pt-7 font-semibold">
          <div className="w-48 border-t dark:border-white border-black text-center pt-0">
            Signature of Reporting In charge
          </div>
          <div className="w-48 border-t dark:border-white border-black text-center pt-2">
            HR Department
          </div>
        </div>
      </div>
    </div >
  );
}