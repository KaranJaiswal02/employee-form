"use client";

import { grauFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";

export default function GratuityForm1() {
  const [formData, setFormData] = useAtom(grauFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNomineeChange = (index: number, field: string, value: string | number) => {
    setFormData((prevFormData) => {
      const updatedNominees = [...prevFormData.nominee];
      updatedNominees[index] = {
        ...updatedNominees[index],
        [field]: field === "age" || field === "proportion" ? Number(value) : value,
      };
      return {
        ...prevFormData,
        nominee: updatedNominees,
      };
    });
  };

  const addNominee = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nominee: [
        ...prevFormData.nominee,
        { name: "", relationship: "", age: null, proportion: null },
      ],
    }));
  };

  const removeNominee = (index: number) => {
    if (formData.nominee.length <= 1) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      nominee: prevFormData.nominee.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h2 className="text-center text-base font-bold uppercase mb-2">
        Payment of Gratuity (Central) Rules
      </h2>
      <h3 className="text-center font-semibold uppercase">Form &rsquo;F&rsquo;</h3>
      <p className="text-center italic text-xs mb-4">See sub-rule (1) of Rule 6</p>
      <h4 className="text-center font-semibold uppercase mb-4">Nomination</h4>

      <p className="mb-1">To,</p>
      <p>SLAP Private Limited</p>
      <p>Plot No-06-B, Industrial Park</p>
      <p>KIA Ancillary Unit, Site – B, Gudipalli Village,</p>
      <p className="mb-4">Puttaparthi District, Andhra Pradesh - 515122</p>

      <p className="mb-2">
        I, Shri/Shrimati/Kumari{" "}
        <input
          type="text"
          value={formData.name}
          className="border-b border-black dark:border-white w-72 mx-2 focus:outline-none"
          placeholder="Name in full here"
          required
          name="name"
          onChange={handleChange}
          disabled={true}
        />
        whose particulars are given in the statement below, hereby nominate the person(s)
        mentioned below to receive the gratuity payable after my death as also the gratuity
        standing to my credit in the event of my death before that amount has become payable, or
        having become payable has not been paid and direct that the said amount of gratuity shall
        be paid in proportion indicated against the name(s) of the nominee(s).
      </p>

      <ol className="list-decimal list-inside space-y-2">
        <li>
          I hereby certify that the person(s) mentioned is/are a member(s) of my family within the
          meaning of clause (h) of Section 2 of the Payment of Gratuity Act, 1972.
        </li>
        <li>
          I hereby declare that I have no family within the meaning of clause (h) of Section 2 of
          the said Act.
        </li>
        <li>
          <div className="pl-4">
            (a) My father/mother/parents is/are not dependent on me.
            <br />
            (b) My husband’s father/mother/parents is/are not dependent on my husband.
          </div>
        </li>
        <li>
          I have excluded my husband from my family by a notice dated{" "}
          <input
            type="date"
            value={formData.noticedate?.toString().split('T')[0] ?? ''} 
            className="border-b border-black dark:border-white w-40 inline-block focus:outline-none"
            onChange={handleChange}
            name="noticedate"
          />{" "}
          to the controlling authority in terms of the provison to clause (h) of Section 2 of the
          said Act.
        </li>
        <li>Nomination made herein invalidates my previous nomination.</li>
      </ol>

      <h4 className="font-semibold text-center mt-6 mb-2">Nominee(s)</h4>

      <table className="w-full border border-black dark:border-white text-left text-sm">
        <thead>
          <tr className="bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100">
            <th className="border border-black dark:border-white p-2 text-center ">
              Name in full with full address of nominee(s)
            </th>
            <th className="border border-black dark:border-white p-2 text-center">Relationship</th>
            <th className="border border-black dark:border-white p-2 text-center">Age</th>
            <th className="border border-black dark:border-white p-2 text-center">Proportion</th>
            <th className="border print:hidden border-black dark:border-white p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.nominee.map((row, i) => (
            <tr key={i}>
              <td className="border border-black dark:border-white p-2">
                <input
                  type="text"
                  value={row.name}
                  className="w-full focus:outline-none"
                  placeholder="Full Name & Address"
                  onChange={(e) => handleNomineeChange(i, "name", e.target.value)}
                  required={i=== 0}
                />
              </td>
              <td className="border border-black dark:border-white p-2">
                <input
                  type="text"
                  value={row.relationship}
                  className="w-full focus:outline-none"
                  placeholder="Relationship"
                  onChange={(e) => handleNomineeChange(i, "relationship", e.target.value)}
                  required={i=== 0}
                />
              </td>
              <td className="border border-black dark:border-white p-2">
                <input
                  type="number"
                  value={row.age || ''}
                  className="w-full focus:outline-none"
                  placeholder="Age"
                  onChange={(e) => handleNomineeChange(i, "age", e.target.value)}
                  required={i=== 0}
                />
              </td>
              <td className="border border-black dark:border-white p-2">
                <input
                  type="number"
                  value={row.proportion || ''}
                  className="w-full focus:outline-none"
                  placeholder="Proportion (%)"
                  onChange={(e) => handleNomineeChange(i, "proportion", e.target.value)}
                  required={i=== 0}
                />
              </td>
              <td className="border print:hidden border-black dark:border-white text-center">
                {formData.nominee.length > 1 && (<button
                  type="button"
                  onClick={() => removeNominee(i)}
                  className="text-red-600 font-semibold"
                  disabled={formData.nominee.length === 1}
                >
                  ❌
                </button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={addNominee}
        className="print:hidden px-3 py-[2px] my-1 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm mt-2"
      >
        + Add Row
      </button>

      <hr className="print:hidden my-6 border-black dark:border-white" />
    </div>
  );
}
