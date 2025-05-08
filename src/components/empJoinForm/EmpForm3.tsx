import { useAtom } from "jotai";
import { empFormData } from "@/hooks/Atoms";
import RequiredLabel from "../RequiredLabel";

export default function EmpForm3() {
    const [formData, setFormData] = useAtom(empFormData);

    const handleEducationChange = (row: number, col: number, value: string) => {
        setFormData(prev => {
            const updated = [...prev.education];
            updated[row] = [...updated[row]];
            updated[row][col] = value;
            return { ...prev, education: updated };
        });
    };

    const handleEmploymentChange = (row: number, col: number, value: string) => {
        setFormData(prev => {
            const updated = [...prev.employment];
            updated[row] = [...updated[row]];
            updated[row][col] = value;
            return { ...prev, employment: updated };
        });
    };

    const handleReferenceChange = (index: number, field: keyof (typeof formData.references)[0], value: string) => {
        setFormData(prev => {
            const updated = [...prev.references];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, references: updated };
        });
    };

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addEducationRow = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, ["", "", "", "", "", ""]],
        }));
    };

    const removeEducationRow = (index: number) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    const addEmploymentRow = () => {
        setFormData(prev => ({
            ...prev,
            employment: [...prev.employment, ["", "", "", "", "", ""]],
        }));
    };

    const removeEmploymentRow = (index: number) => {
        setFormData(prev => ({
            ...prev,
            employment: prev.employment.filter((_, i) => i !== index),
        }));
    };

    return (


        <div className="p-6 space-y-1 text-sm font-sans">
            {/* EDUCATIONAL QUALIFICATION */}
            <h2 className="font-bold uppercase">
                <RequiredLabel>Educational Qualification<div className="italic">(Start from highest qualification)</div></RequiredLabel>
            </h2>
            <table className="table-auto w-full border border-black dark:border-white text-center text-sm mb-0">
                <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100">
                        <th className="border border-black dark:border-white">Examination</th>
                        <th className="border border-black dark:border-white">University / Institute</th>
                        <th className="border border-black dark:border-white">From</th>
                        <th className="border border-black dark:border-white">To</th>
                        <th className="border border-black dark:border-white">Specialisation</th>
                        <th className="border border-black dark:border-white">Division %</th>
                        <th className="border print:hidden border-black dark:border-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.education.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className="border border-black dark:border-white">
                                    <input
                                        type="text"
                                        className="w-full p-1"
                                        value={cell}
                                        onChange={(e) => handleEducationChange(i, j, e.target.value)}
                                        required={j === 0} // Make the first column required
                                    />
                                </td>
                            ))}
                            <td className="border print:hidden border-black dark:border-white">
                                {formData.education.length > 1 && (<button
                                    type="button"
                                    className="text-red-600 font-semibold cursor-pointer"
                                    onClick={() => removeEducationRow(i)}
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
                onClick={addEducationRow}
                className="print:hidden px-3 py-[2px] my-1 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm mt-2"
            >
                + Add Row
            </button>

            {/* EMPLOYMENT RECORD */}
            <h2 className="font-bold uppercase mt-4">
                Employment Record <span className="italic">(Start from last employment)</span>
            </h2>
            <table className="table-auto w-full border border-black dark:border-white text-center text-sm mb-0">
                <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100">
                        <th className="border border-black dark:border-white">Name of the Organisation</th>
                        <th className="border border-black dark:border-white">From</th>
                        <th className="border border-black dark:border-white">To</th>
                        <th className="border border-black dark:border-white">Designation</th>
                        <th className="border border-black dark:border-white">Last Salary Drawn (CTC)</th>
                        <th className="border border-black dark:border-white">Reason for Leaving</th>
                        <th className="border print:hidden border-black dark:border-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.employment.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className="border border-black dark:border-white">
                                    <input
                                        type="text"
                                        className="w-full p-1"
                                        value={cell}
                                        onChange={(e) => handleEmploymentChange(i, j, e.target.value)}
                                    />
                                </td>
                            ))}
                            <td className="border print:hidden border-black dark:border-white">
                                {formData.employment.length > 1 && (<button
                                    type="button"
                                    className="text-red-600 font-semibold cursor-pointer"
                                    onClick={() => removeEmploymentRow(i)}
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
                onClick={addEmploymentRow}
                className="print:hidden px-3 py-[2px] my-1 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded text-sm mt-2"
            >
                + Add Row
            </button>

            {/* EXTRA-CURRICULAR ACTIVITIES */}
            <h2 className="font-bold uppercase my-1 mt-3">
                Extra-Curricular Activities <span className="italic">(Give details, achievements, etc)</span>
            </h2>
            <div className="border border-black dark:border-white p-4 rounded-md space-y-2">
                <div className="flex items-center gap-x-2">
                    <RequiredLabel><label htmlFor="games">Games / Sports:</label></RequiredLabel>
                    <input
                        id="games"
                        type="text"
                        className="border-b border-black dark:border-white flex-1 focus:outline-none"
                        value={formData.games}
                        onChange={(e) => handleChange("games", e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center gap-x-2">
                    <RequiredLabel><label htmlFor="ncc">NCC etc.:</label></RequiredLabel>
                    <input
                        id="ncc"
                        type="text"
                        className="border-b border-black dark:border-white flex-1 focus:outline-none"
                        value={formData.ncc}
                        onChange={(e) => handleChange("ncc", e.target.value)}
                        placeholder="NCC, NSS, etc., if not applicable, write N/A"
                        required
                    />
                </div>

                <div className="flex items-center gap-x-2">
                    <RequiredLabel> <label htmlFor="hobbies">Hobbies & Other Interests:</label></RequiredLabel>
                    <input
                        id="hobbies"
                        type="text"
                        className="border-b border-black dark:border-white flex-1 focus:outline-none"
                        value={formData.hobbies}
                        onChange={(e) => handleChange("hobbies", e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* REFERENCES */}
            <div>
                <strong>
                    Name, address and telephone of two references{" "}
                    <span className="italic">(Other than relatives) </span>
                </strong>
                <div className="border border-black dark:border-white p-4 rounded-md cornered-md space-y-2">
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {formData.references.map((ref, idx) => (
                            <div key={idx}>
                                <div>{idx + 1}</div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="border-b border-black dark:border-white w-full mt-1 focus:outline-none"
                                    value={ref.name}
                                    onChange={(e) => handleReferenceChange(idx, "name", e.target.value)}

                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="border-b border-black dark:border-white w-full mt-1 focus:outline-none"
                                    value={ref.address}
                                    onChange={(e) => handleReferenceChange(idx, "address", e.target.value)}

                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className="border-b border-black dark:border-white w-full mt-1 focus:outline-none"
                                    value={ref.phone}
                                    onChange={(e) => handleReferenceChange(idx, "phone", e.target.value)}

                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <RequiredLabel><label htmlFor="convictionDetails" className="font-bold block">
                    Have you been convicted by any court? If yes, please give details:
                </label></RequiredLabel>
                <textarea
                    id="convictionDetails"
                    className="w-full border rounded-md border-black dark:border-white mt-1 p-2 focus:outline-none"
                    rows={3}
                    value={formData.convictionDetails}
                    onChange={(e) => handleChange("convictionDetails", e.target.value)}
                    placeholder="If not applicable, write No"
                    required
                ></textarea>
            </div>


            {/* AFFIRMATION */}
            <p className="mt-4">
                I hereby solemnly affirm that the information given by me in this form is true. If any information is found to be false, I will be liable for punitive action.
            </p>

            <div className="flex justify-between mt-4">
                <div className="font-semibold">
                    DATE:{" "}
                    <input
                        type="date"
                        className=" border-black dark:border-white inline-block"
                        value={formData.date?.toString().split('T')[0] ?? ''}
                        onChange={(e) => handleChange("date", e.target.value)}
                        disabled={true}
                    />
                </div>
                <div className=" border-black dark:border-white inline-block font-semibold w-40">
                    <p>PLACE: Bengaluru</p>
                </div>
                <div className="text-right font-semibold">
                    ______________________ <br />
                    SIGNATURE
                </div>
            </div>
        </div>

    );
}
