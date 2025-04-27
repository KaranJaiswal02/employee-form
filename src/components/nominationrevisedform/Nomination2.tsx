"use client";
import React, { useState } from 'react';

type nominationForm2Data = {
  nominee: {
    name: string;
    address: string;
    dob: string;
    relationship: string;
  };
  subscriberDate: string;
  employerName: string;
  employerDate: string;
  establishmentDetails: string;
  place: string;
  certificationDate: string;
};

export default function EPFNominationFormPart2() {
  const [formData, setFormData] = useState<nominationForm2Data>({
    nominee: {
      name: '',
      address: '',
      dob: '',
      relationship: ''
    },
    subscriberDate: '',
    employerName: '',
    employerDate: '',
    establishmentDetails: '',
    place: '',
    certificationDate: ''
  });

  const handleNomineeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      nominee: {
        ...prev.nominee,
        [name]: value
      }
    }));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 border border-black bg-white text-sm">
      {/* First Declaration */}
      <div className="mb-6">
        <div className="flex items-start gap-2 mb-4">
          Certified that I have no family as defined in para 2 (vii) of the Employees' Family Pension Scheme 1995 and should I acquire a family hereafter I shall furnish Particulars thereon in the above form.
        </div>

        <p className="mb-4">
          I hereby nominate the following person for receiving the monthly widow pension (admissible under para 16 2 (a) (i) & (ii)) in the event of my death without leaving any eligible family member for receiving pension.
        </p>

        {/* Nominee Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-black text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2">Name and Address of the nominee</th>
                <th className="border border-black p-2">Date of Birth</th>
                <th className="border border-black p-2">Relationship with member</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-1">
                  <input
                    type="text"
                    name="name"
                    value={formData.nominee.name}
                    onChange={handleNomineeChange}
                    className="w-full outline-none border-b border-gray-300 mb-1"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.nominee.address}
                    onChange={handleNomineeChange}
                    className="w-full outline-none"
                    placeholder="Address"
                  />
                </td>
                <td className="border border-black p-1">
                  <input
                    type="date"
                    name="dob"
                    value={formData.nominee.dob}
                    onChange={handleNomineeChange}
                    className="w-full outline-none"
                  />
                </td>
                <td className="border border-black p-1">
                  <input
                    type="text"
                    name="relationship"
                    value={formData.nominee.relationship}
                    onChange={handleNomineeChange}
                    className="w-full outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-2">
            <label>Date:</label>
            <input
              type="date"
              name="subscriberDate"
              value={formData.subscriberDate}
              onChange={handleFieldChange}
              className="border-b border-black outline-none"
            />
          </div>
          <div className="w-64 border-t border-black text-center pt-2">
            Signature or thumb impression of the subscriber
          </div>
        </div>
      </div>

      {/* Employer Certificate */}
      <div className="border-t-2 border-black pt-4">
        <h3 className="font-bold text-center mb-4">CERTIFICATE BY EMPLOYER</h3>

        <p className="mb-4">
          Certified that the above declaration and nomination has been signed / thumb impressed before me by Shri / Smt./ Miss
          <input
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleFieldChange}
            className="border-b border-black outline-none mx-2 w-48"
            placeholder="Name"
          />
          employed in my establishment after he/she has read the entries / the entries have been read over to him/her by me and got confirmed by him/her.
        </p>

        <div className="flex justify-between mb-6">
          <div className="flex items-center gap-2">
            <label>Date:</label>
            <input
              type="date"
              name="employerDate"
              value={formData.employerDate}
              onChange={handleFieldChange}
              className="border-b border-black outline-none"
            />
          </div>
          <div className="w-64 border-t border-black text-center pt-2">
            Signature of the employer or other authorised officer of the establishment
          </div>
        </div>

        <div className="mb-4">
          <p>Name & address of the Factory / Establishment</p>
          <textarea
            name="establishmentDetails"
            value={formData.establishmentDetails}
            onChange={handleFieldChange}
            className="w-full border-b border-black outline-none h-16"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <label>Place:</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleFieldChange}
              className="border-b border-black outline-none w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Date:</label>
            <input
              type="date"
              name="certificationDate"
              value={formData.certificationDate}
              onChange={handleFieldChange}
              className="border-b border-black outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
