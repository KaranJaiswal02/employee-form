import React from "react";

export default function EmpForm3() {
    return (
        <div>
            <div className="p-6 space-y-6 text-sm font-sans">
                {/* EDUCATIONAL QUALIFICATION */}
                <h2 className="font-bold uppercase">
                    Educational Qualification{" "}
                    <span className="italic">(Start from highest qualification)</span>
                </h2>
                <table className="table-auto w-full border border-black text-center text-sm">
                    <thead>
                        <tr className="border border-black bg-gray-100">
                            <th className="border border-black">Examination</th>
                            <th className="border border-black">University / Institute</th>
                            <th className="border border-black">From</th>
                            <th className="border border-black">To</th>
                            <th className="border border-black">Specialisation</th>
                            <th className="border border-black">Division %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i}>
                                {[...Array(6)].map((_, j) => (
                                    <td key={j} className="border border-black">
                                        <input type="text" className="w-full p-1" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* EMPLOYMENT RECORD */}
                <h2 className="font-bold uppercase">
                    Employment Record{" "}
                    <span className="italic">(Start from last employment)</span>
                </h2>
                <table className="table-auto w-full border border-black text-center text-sm">
                    <thead>
                        <tr className="border border-black bg-gray-100">
                            <th className="border border-black">Name of the Organisation</th>
                            <th className="border border-black">From</th>
                            <th className="border border-black">To</th>
                            <th className="border border-black">Designation</th>
                            <th className="border border-black">Last Salary Drawn (CTC)</th>
                            <th className="border border-black">Reason for Leaving</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(4)].map((_, i) => (
                            <tr key={i}>
                                {[...Array(6)].map((_, j) => (
                                    <td key={j} className="border border-black">
                                        <input type="text" className="w-full p-1" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className="font-bold uppercase mb-2">
                    Extra-Curricular Activities{" "}
                    <span className="italic">(Give details, achievements, etc)</span>
                </h2>

                <div className="border border-black p-4 rounded-md space-y-2">
                    <div className="flex items-center gap-x-2">
                        <label htmlFor="games">Games / Sports:</label>
                        <input
                            id="games"
                            type="text"
                            className="border-b border-black flex-1"
                        />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <label htmlFor="ncc">NCC etc.:</label>
                        <input
                            id="ncc"
                            type="text"
                            className="border-b border-black flex-1"
                        />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <label htmlFor="hobbies">Hobbies & Other Interests:</label>
                        <input
                            id="hobbies"
                            type="text"
                            className="border-b border-black flex-1"
                        />
                    </div>
                </div>



                {/* DO YOU KNOW ANYONE */}
                <div>
                    <strong>
                        Do you know anyone in SL AP{" "}
                        <span className="italic">(If yes, name of the person and relation)</span>
                    </strong>
                    <div className="border border-black p-4 cornered-md space-y-2">
                        <input
                            type="text"
                            className=" w-full inline-block mt-1"
                        />
                    </div>
                </div>

                {/* REFERENCES */}
                <div>
                    <strong>
                        Name, address and telephone of two references{" "}
                        <span className="italic">(Other than relatives)</span>
                    </strong>
                    <div className="border border-black p-4 cornered-md space-y-2">
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {[1, 2].map((num) => (
                                <div key={num}>
                                    <div>{num}</div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="border-b border-black w-full mt-1"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="border-b border-black w-full mt-1"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        className="border-b border-black w-full mt-1"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COURT CONVICTION */}
                <div>
                    <strong>
                        Have you been convicted by any court? If yes, please give details:
                    </strong>
                    <textarea className="w-full border border-black mt-2 p-2" rows={3}></textarea>
                </div>

                {/* AFFIRMATION */}
                <p className="mt-4">
                    I hereby solemnly affirm that the information given by me in this form is true. If
                    any information is found to be false, I will be liable for punitive action.
                </p>

                <div className="flex justify-between mt-4">
                    <div>
                        DATE: <input type="date" className="border-b border-black inline-block" />
                    </div>
                    <div>
                        PLACE: <input type="text" className="border-b border-black inline-block w-40" />
                    </div>
                    <div className="text-right">
                        ______________________ <br />
                        SIGNATURE
                    </div>
                </div>
            </div>
        </div>
    );
};
