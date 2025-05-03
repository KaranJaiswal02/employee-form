"use client";
import { nominationForm2Data } from '@/hooks/Atoms';
import { useAtom } from 'jotai';

type nominationForm2Data = {
  pension_nominee: {
    name: string;
    address: string;
    dob: string;
    relationship: string;
  };
  subscriberDate: string;
  name: string;
  employerDate: string;
  establishmentDetails: string;
  place: string;
  date: string;
};

export default function EPFNominationFormPart2() {
  const [formData, setFormData] = useAtom(nominationForm2Data);

  const handleNomineeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      pension_nominee: {
        ...prev.pension_nominee,
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
    <div className="max-w-4xl mx-auto p-4 md:p-8 border border-black dark:border-white text-sm">
      {/* First Declaration */}
      <div className="mb-6">
        <div className="flex items-start gap-2 mb-4">
          Certified that I have no family as defined in para 2 (vii) of the Employees' Family Pension Scheme 1995 and should I acquire a family hereafter I shall furnish Particulars thereon in the above form.
        </div>

        <p className="mb-4">
          I hereby nominate the following person for receiving the monthly widow pension (admissible under para 16 2 (a) (i) & (ii)) in the event of my death without leaving any eligible family member for receiving pension.
        </p>

        {/* pension_Nominee Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-black dark:border-white text-sm">
            <thead>
              <tr className="bg-neutral-100 dark:bg-neutral-800">
                <th className="border border-black dark:border-white p-2">Name and Address of the pension_nominee</th>
                <th className="border border-black dark:border-white p-2">Date of Birth</th>
                <th className="border border-black dark:border-white p-2">Relationship with member</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black dark:border-white p-1">
                  <input
                    type="text"
                    name="name"
                    value={formData.pension_nominee.name}
                    onChange={handleNomineeChange}
                    className="w-full outline-none border-b border-gray-300 mb-1"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.pension_nominee.address}
                    onChange={handleNomineeChange}
                    className="w-full outline-none"
                    placeholder="Address"
                  />
                </td>
                <td className="border border-black dark:border-white p-1">
                  <input
                    type="date"
                    name="dob"
                    value={formData.pension_nominee.dob}
                    onChange={handleNomineeChange}
                    className="w-full outline-none"
                  />
                </td>
                <td className="border border-black dark:border-white p-1">
                  <input
                    type="text"
                    name="relationship"
                    value={formData.pension_nominee.relationship}
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
              className="border-b border-black dark:border-white outline-none"
            />
          </div>
          <div className="w-64 border-t border-black dark:border-white text-center pt-2 mt-8">
            Signature or thumb impression of the subscriber
          </div>
        </div>
      </div>

      {/* Employer Certificate */}
      <div className="border-t-2 border-black dark:border-white pt-4">
        <h3 className="font-bold text-center mb-4">CERTIFICATE BY EMPLOYER</h3>

        <p className="mb-4">
          Certified that the above declaration and nomination has been signed / thumb impressed before me by Shri / Smt./ Miss
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFieldChange}
            className="border-b border-black dark:border-white outline-none mx-2 w-48"
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
              className="border-b border-black dark:border-white outline-none"
            />
          </div>
          <div className="w-64 border-t border-black dark:border-white text-center pt-2 mt-4">
            Signature of the employer or other authorised officer of the establishment
          </div>
        </div>

        <div className="mb-4">
          <p>Name & address of the Factory / Establishment:</p>
          <p><b>SL AP Private Limited</b><br />
            Brigade Opus,  4th Floor<br />
            Municipal No. 70/401, Survey No. 44/1 and 44/4
            Kodigehalli Main Road, Hebbal,<br/> Bengaluru Urban, Karnataka 560092</p>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <label>Place:</label>
            {/* <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleFieldChange}
              className="border-b border-black dark:border-white outline-none w-32"
            /> */}
            <p><b>Bengaluru</b></p>           
          </div>
          <div className="flex items-center gap-2">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFieldChange}
              className="border-b border-black dark:border-white outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
