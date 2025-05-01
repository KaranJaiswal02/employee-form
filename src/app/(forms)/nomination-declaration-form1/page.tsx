"use client";
import { Button } from '@/components/ui/button'
import { empFormData, formStatusus, nominationForm1Data } from '@/hooks/Atoms';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";

interface Nominee {
  name: string;
  address: string;
  relationship: string;
  dob: string;
  share: string;
  guardian: string;
}

interface FormData {
  name: string;
  fathersName: string;
  dob: string;
  sex: string;
  maritalStatus: string;
  permanentAddress: string;
  currentAddress: string;
  nominees: Nominee[];
  place: string;
  date: string;
  establishmentAddress: string;
}

export default function Page() {
  const router = useRouter()
  const [empFormData1] = useAtom(empFormData);
  const [_, setFormStatus] = useAtom(formStatusus);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: empFormData1.name || "",
      fathersName: empFormData1.fatherName || "",
      dob: empFormData1.dob || "",
      curraddress: empFormData1.currAddress || "",
      peraddress: empFormData1.perAddress || "",
      maritalStatus: empFormData1.maritalStatus || "",
    }));
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch("/api/forms/nomination-declaration-form1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 201) {
      setFormStatus((prevStatus) => ({
        ...prevStatus,
        form5: {
          ...prevStatus.form5,
          status: "done",
        },
      }));
      router.push("/gratuity-form");
    }
    else {
      const responseData = await response.json();
      alert(responseData.message);
    }
  };

  const [formData, setFormData] = useAtom<FormData>(nominationForm1Data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNomineeChange = (index: number, field: keyof Nominee, value: string) => {
    const updatedNominees = [...formData.nominees];
    updatedNominees[index] = {
      ...updatedNominees[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      nominees: updatedNominees
    }));
  };

  const addNominee = () => {
    setFormData(prev => ({
      ...prev,
      nominees: [
        ...prev.nominees,
        { name: "", address: "", relationship: "", dob: "", share: "", guardian: "" },
      ],
    }));
  };

  const removeNominee = (index: number) => {
    const updatedNominees = formData.nominees.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      nominees: updatedNominees
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg">
      <div>
        {/* Form Header */}
        <div className="text-center">
          <h2 className="font-bold text-lg">FORM I</h2>
          <p className="text-sm">[See Rule 3]</p>
          <h3 className="font-semibold text-base underline mt-2">
            Nomination and Declaration Form
          </h3>
        </div>

        {/* Static Inputs */}
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-4">
            <label className="w-64 font-medium">1. Name of person making nomination:</label>
            <input
              type="text"
              name="name"
              value={empFormData1.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="flex-1 border-b-1 border-black dark:border-white px-2 py-1"
              disabled={true}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-64 font-medium">2. Father's/Husband's Name:</label>
            <input
              type="text"
              name="fathersName"
              value={empFormData1.fatherName}
              placeholder="Your Father's or Husband's Name"
              onChange={handleChange}
              className="flex-1 border-b-1 border-black dark:border-white px-2 py-1"
              disabled={true}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-64 font-medium">3. Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="flex-1 border-b-1 border-black dark:border-white px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-64 font-medium">4. Sex:</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="flex-1 border-b-1 border-black dark:border-white px-2 py-1"
            >
              <option className='bg-white dark:bg-gray-800' value="">Select</option>
              <option className='bg-white dark:bg-gray-800' value="Male">Male</option>
              <option className='bg-white dark:bg-gray-800' value="Female">Female</option>
              <option className='bg-white dark:bg-gray-800' value="Other">Other</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="w-64 font-medium">5. Marital Status:</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="flex-1 border-b-1 border-black dark:border-white px-2 py-1"
            >
              <option className='bg-white dark:bg-gray-800' value="">Select</option>
              <option className='bg-white dark:bg-gray-800' value="Single">Single</option>
              <option className='bg-white dark:bg-gray-800' value="Married">Married</option>
              <option className='bg-white dark:bg-gray-800' value="Divorced">Divorced</option>
              <option className='bg-white dark:bg-gray-800' value="Widowed">Widowed</option>
            </select>
          </div>
          <div className="flex items-start gap-4">
            <label className="w-64 font-medium mt-1">6. Address:</label>
            <div className="flex-1 space-y-2">
              <textarea
                name="permanentAddress"
                value={empFormData1.perAddress}
                onChange={handleChange}
                placeholder="Permanent Address"
                className="w-full border-b-1 border-black dark:border-white px-2 py-1"
                rows={2}
                disabled={true}
              />
              <textarea
                name="currentAddress"
                value={empFormData1.currAddress}
                onChange={handleChange}
                placeholder="Current Address"
                className="w-full border-b-1 border-black dark:border-white px-2 py-1"
                rows={2}
                disabled={true}
              />
            </div>
          </div>
        </div>

        <p className="text-sm mt-6">
          I hereby nominated the person(s)/cancel the nomination made by me previously and nominate the person(s)
          mentioned below to receive any amount due to me from the employer, in the event of my death:
        </p>

        {/* Dynamic Nominee Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full border border-black dark:border-white text-sm text-center">
            <thead className="">
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-black dark:border-white px-2 py-1">Name of Nominee</th>
                <th className="border border-black dark:border-white px-2 py-1">Address</th>
                <th className="border border-black dark:border-white px-2 py-1">Relationship</th>
                <th className="border border-black dark:border-white px-2 py-1">Date of Birth</th>
                <th className="border border-black dark:border-white px-2 py-1">Share Amount</th>
                <th className="border border-black dark:border-white px-2 py-1">Guardian Info (if minor)</th>
                <th className="border border-black dark:border-white px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.nominees.map((nominee, index) => (
                <tr key={index}>
                  <td className="border border-black dark:border-white">
                    <input
                      type="text"
                      className="w-full px-1 py-1 border border-gray-300"
                      value={nominee.name}
                      onChange={(e) => handleNomineeChange(index, "name", e.target.value)}
                    />
                  </td>
                  <td className="border border-black dark:border-white">
                    <input
                      type="text"
                      className="w-full px-1 py-1 border border-gray-300"
                      value={nominee.address}
                      onChange={(e) => handleNomineeChange(index, "address", e.target.value)}
                    />
                  </td>
                  <td className="border border-black dark:border-white">
                    <input
                      type="text"
                      className="w-full px-1 py-1 border border-gray-300"
                      value={nominee.relationship}
                      onChange={(e) => handleNomineeChange(index, "relationship", e.target.value)}
                    />
                  </td>
                  <td className="border border-black dark:border-white">
                    <input
                      type="date"
                      className="w-full px-1 py-1 border border-gray-300"
                      value={nominee.dob}
                      onChange={(e) => handleNomineeChange(index, "dob", e.target.value)}
                    />
                  </td>
                  <td className="border border-black dark:border-white">
                    <input
                      type="text"
                      className="w-full px-1 py-1 border border-gray-300"
                      value={nominee.share}
                      onChange={(e) => handleNomineeChange(index, "share", e.target.value)}
                    />
                  </td>
                  <td className="border border-black dark:border-white">
                    <textarea
                      rows={1}
                      className="w-full px-1 py-1 border border-gray-300"
                      value={nominee.guardian}
                      onChange={(e) => handleNomineeChange(index, "guardian", e.target.value)}
                    />
                  </td>
                  <td className="border border-black dark:border-white">
                    {formData.nominees.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNominee(index)}
                        className="text-red-600 font-semibold cursor-pointer"
                      >
                        ❌
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-left">
            <button
              type="button"
              onClick={addNominee}
              className="px-3 py-[2px] my-1 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm mt-2"
            >
              + Add Nominee
            </button>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-3/4 bg-black mx-auto"></div>
      <div>
        {/* Certification Statements */}
        <ol className="list-decimal space-y-2 ml-6">
          <li>
            Certified that I have no family and should I acquire a family hereafter, the above
            nomination shall be deemed as cancelled.
          </li>
          <li>
            Certified that my father/ mother is/are dependent upon me.
          </li>
          <li>Strike out whichever is not applicable.</li>
        </ol>

        <div className="text-right pr-10 mt-10">
          <p>Signature or the thumb</p>
          <p>Impression of the employed person.</p>
        </div>

        {/* Certificate by Employer */}
        <div className="text-center mt-12">
          <h3 className="font-bold">CERTIFICATE BY EMPLOYER</h3>
        </div>
        <p className="text-justify">
          Certified that the above declaration and nomination has been signed/thumb impression before me by Shri./ Smt./ Kum.{" "}
          <input
            type="text"
            name="employeeName"
            value={formData.name}
            className="border-b-1 border-black dark:border-white px-2 mx-1 w-60 inline-block"
            disabled={true}
          />
          employed in my establishment after he/ she has read the entry/ entries have been read over to him/ her by me and got confirmed by him/her.
        </p>

        {/* Place & Date */}
        <div className="flex justify-between mt-10">
          <div className="flex flex-col gap-2 w-1/2">
            <div className="flex items-center gap-2">
              <label className="w-16 font-medium">Place:</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="flex-1 border-b-1 border-black dark:border-white px-2"
                placeholder="Enter Place"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-16 font-medium">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="flex-1 border-b-1 border-black dark:border-white px-2"
              />
            </div>
          </div>

          <div className="text-right w-1/2 pr-6">
            <p className="font-semibold">Signature of the employer or other</p>
            <p>authorised officer of the establishment</p>
            <p>And designation</p>
          </div>
        </div>

        {/* Name and address of factory */}
        <div className="mt-10">
          <label className="block font-medium mb-2">
            Name and address of the factory/Establishment and rubber stamp thereof:
          </label>
          <textarea
            name="establishmentAddress"
            value={formData.establishmentAddress}
            rows={2}
            placeholder="Enter establishment address"
            className="w-full border-b-1 border-black dark:border-white px-2 py-1 mb-4"
            onChange={handleChange}
          />
        </div>
      </div>
      <Button type="submit" className='w-full cursor-pointer'>Submit</Button>
    </form>
  )
}
