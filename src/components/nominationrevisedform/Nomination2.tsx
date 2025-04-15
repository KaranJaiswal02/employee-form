"use client";
import React, { useState } from 'react';

type Nominee = {
  name: string;
  address: string;
  dob: string;
  relationship: string;
};

export default function EPFNominationFormPart2() {
  const [hasNoFamily, setHasNoFamily] = useState(false);
  const [nominee, setNominee] = useState<Nominee>({
    name: '',
    address: '',
    dob: '',
    relationship: ''
  });
  const [subscriberDate, setSubscriberDate] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [employerDate, setEmployerDate] = useState('');
  const [establishmentDetails, setEstablishmentDetails] = useState('');

  const handleNomineeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNominee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      hasNoFamily,
      nominee,
      subscriberDate,
      employerName,
      employerDate,
      establishmentDetails
    };
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 md:p-8 border border-black bg-white text-sm">
      {/* First Declaration */}
      <div className="mb-6">
        <div className="flex items-start gap-2 mb-4">
          <input
            type="checkbox"
            id="hasNoFamily"
            checked={hasNoFamily}
            onChange={(e) => setHasNoFamily(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="hasNoFamily">
            Certified that I have no family as defined in para 2 (vii) of the Employees' Family Pension Scheme 1995 and should I acquire a family hereafter I shall furnish Particulars there on in the above form.
          </label>
        </div>

        <p className="mb-4">
          I hereby nominate the following person for receiving the monthly widow pension (admissible under para 16 2 (a) (i) & (ii) in the event of my death without leaving any eligible family member for receiving pension.
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
                    value={nominee.name}
                    onChange={handleNomineeChange}
                    className="w-full outline-none border-b border-gray-300 mb-1"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="address"
                    value={nominee.address}
                    onChange={handleNomineeChange}
                    className="w-full outline-none"
                    placeholder="Address"
                  />
                </td>
                <td className="border border-black p-1">
                  <input
                    type="date"
                    name="dob"
                    value={nominee.dob}
                    onChange={handleNomineeChange}
                    className="w-full outline-none"
                  />
                </td>
                <td className="border border-black p-1">
                  <input
                    type="text"
                    name="relationship"
                    value={nominee.relationship}
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
              value={subscriberDate}
              onChange={(e) => setSubscriberDate(e.target.value)}
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
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
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
              value={employerDate}
              onChange={(e) => setEmployerDate(e.target.value)}
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
            value={establishmentDetails}
            onChange={(e) => setEstablishmentDetails(e.target.value)}
            className="w-full border-b border-black outline-none h-16"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <label>Place:</label>
            <input
              type="text"
              className="border-b border-black outline-none w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Date:</label>
            <input
              type="date"
              className="border-b border-black outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit Form
        </button>
      </div>
    </form>
  );
}