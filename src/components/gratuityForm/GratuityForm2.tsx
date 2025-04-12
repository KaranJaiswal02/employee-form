"use client";

import React from "react";

export default function GratuityForm2() {
    return (
        <div>
            <h4 className="font-bold text-center mb-4">Statement</h4>

            <ol className="list-decimal list-inside space-y-2">
                <li className="flex">
                    Name of employee in full:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Sex:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Religion:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Whether unmarried/married/widow/widower:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Department/Branch/Section where employed:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Post held with Ticket No. or Serial No., if any:
                    <input type="text" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Date of appointment:
                    <input type="date" className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li>
                    Permanent address:
                    <div className="ml-4 mt-2 space-y-1">
                        <div>
                            Village:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; Thana:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; Sub-division:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                        </div>
                        <div>
                            Post Office:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; District:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; State:
                            <input type="text" className="border-b border-black w-40 inline-block ml-1" />
                        </div>
                    </div>
                </li>
            </ol>

            <hr className="my-6 border-black" />

            <div className="mt-6">
                <p>
                    Place: <input type="text" className="border-b border-black w-48 inline-block ml-2" />
                </p>
                <p className="mt-2">
                    Date: <input type="date" className="border-b border-black w-48 inline-block ml-2" />
                </p>
                <p className="mt-4 text-right font-semibold">Signature/Thumb-impression of the Employee</p>
            </div>

            <hr className="my-6 border-black" />

            <h4 className="font-bold text-center">Declaration by Witnesses</h4>
            <p>Nomination signed/thumb-impressed before me</p>
            <p>Name in full and Full address of witnesses. </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <input type="text" className="border-b border-black w-full" placeholder="Name and address" />
                        </li>
                        <li>
                            <input type="text" className="border-b border-black w-full" placeholder="Name and address" />
                        </li>
                    </ol>
                </div>
                <div>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <input type="text" className="border-b border-black w-full" placeholder="Signature" />
                        </li>
                        <li>
                            <input type="text" className="border-b border-black w-full" placeholder="Signature" />
                        </li>
                    </ol>
                </div>
            </div>

            <p className="mt-4">Place: <input type="text" className="border-b border-black w-48 inline-block ml-2" /></p>
            <p>Date: <input type="date" className="border-b border-black w-48 inline-block ml-2" /></p>

            <hr className="my-6 border-black" />

            <h4 className="font-bold text-center">Certificate by the Employer</h4>
            <p>
                Certified that the particulars of the above nomination have been verified and recorded in this establishment.
            </p>
            <p>
                Employer's Reference No., if any:{" "}
                <input type="text" className="border-b border-black w-60 inline-block" />
            </p>
            <p className="mt-2">
                Signature of the employer/Officer authorised:{" "}
                <input type="text" className="border-b border-black w-60 inline-block" />
            </p>
            <p>Date: <input type="date" className="border-b border-black w-48 inline-block ml-2" /></p>
            <p>
                Name and address of the establishment or rubber stamp thereof:
                <textarea className="w-full border border-black mt-2 h-20" />
            </p>

            <hr className="my-6 border-black" />

            <h4 className="font-bold text-center">Acknowledgement by the Employee</h4>
            <p>
                Received the duplicate copy of nomination in Form 'F' filed by me and duly certified by the employer.
            </p>
            <p className="mt-2">
                Date: <input type="date" className="border-b border-black w-48 inline-block ml-2" />
            </p>
            <p className="text-right font-semibold mt-4">Signature of the Employee</p>


            <hr className="my-6 border-black" />

            <p className="text-xs italic mt-4">
                Note.—Strike out the words/paragraphs not applicable.
            </p>
        </div>
    );
}


