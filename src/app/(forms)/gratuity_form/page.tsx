"use client";

import React from "react";

export default function GratuityFormF() {
  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto text-sm border border-gray-400 rounded-md">
      <h2 className="text-center text-base font-bold uppercase mb-2">
        Payment of Gratuity (Central) Rules
      </h2>
      <h3 className="text-center font-semibold uppercase">Form 'F'</h3>
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
          className="border-b border-black w-72 mx-2"
          placeholder="Name in full here"
          required
        //given as the required prop in this code snippet, may not be queired or not work on submission
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
          <input type="date" className="border-b border-black w-40 inline-block" /> to the
          controlling authority in terms of the provison to clause (h) of Section 2 of the said Act.
        </li>
        <li>Nomination made herein invalidates my previous nomination.</li>
      </ol>

      <h4 className="font-semibold text-center mt-6 mb-2">Nominee(s)</h4>

      <table className="w-full border border-black text-left text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2 text-center">
              Name in full with full address of nominee(s)
            </th>
            <th className="border border-black p-2 text-center">Relationship with the employee</th>
            <th className="border border-black p-2 text-center">Age of nominee</th>
            <th className="border border-black p-2 text-center">
              Proportion by which the gratuity will be shared
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((row) => (
            <tr key={row}>
              <td className="border border-black p-2">
                <input type="text" className="w-full" placeholder={`Nominee ${row} Full Name & Address`} />
              </td>
              <td className="border border-black p-2">
                <input type="text" className="w-full" placeholder="Relationship" />
              </td>
              <td className="border border-black p-2">
                <input type="number" className="w-full" placeholder="Age" />
              </td>
              <td className="border border-black p-2">
                <input type="number" className="w-full" placeholder="Proportion (e.g., 100%)" />
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      <hr className="my-6 border-black" />

    </div>
  );
}
