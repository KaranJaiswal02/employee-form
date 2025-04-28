import { useAtom } from "jotai";
import { empFormData } from "@/hooks/Atoms";

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
        <div className="p-6 space-y-6 text-sm font-sans">
            {/* EDUCATIONAL QUALIFICATION */}
            <h2 className="font-bold uppercase">
                Educational Qualification <span className="italic">(Start from highest qualification)</span>
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
                        <th className="border border-black">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.education.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className="border border-black">
                                    <input
                                        type="text"
                                        className="w-full p-1"
                                        value={cell}
                                        onChange={(e) => handleEducationChange(i, j, e.target.value)}
                                    />
                                </td>
                            ))}
                            <td className="border border-black">
                                {formData.education.length > 1 && (<button
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
            <div className="mt-2">
                <button
                    type="button"
                    onClick={addEducationRow}
                    className="px-3 py-[1px] my-1 cursor-pointer bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-semibold"
                >
                    + Add Row
                </button>
            </div>

            {/* EMPLOYMENT RECORD */}
            <h2 className="font-bold uppercase mt-10">
                Employment Record <span className="italic">(Start from last employment)</span>
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
                        <th className="border border-black">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.employment.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className="border border-black">
                                    <input
                                        type="text"
                                        className="w-full p-1"
                                        value={cell}
                                        onChange={(e) => handleEmploymentChange(i, j, e.target.value)}
                                    />
                                </td>
                            ))}
                            <td className="border border-black">
                                {formData.employment.length > 1 && (<button
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
            <div className="mt-2">
                <button
                    type="button"
                    onClick={addEmploymentRow}
                    className="px-3 py-[1px] my-1 cursor-pointer bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-semibold"
                >
                    + Add Row
                </button>
            </div>

            {/* EXTRA-CURRICULAR ACTIVITIES */}
            <h2 className="font-bold uppercase mb-2">
                Extra-Curricular Activities <span className="italic">(Give details, achievements, etc)</span>
            </h2>
            <div className="border border-black p-4 rounded-md space-y-2">
                <div className="flex items-center gap-x-2">
                    <label htmlFor="games">Games / Sports:</label>
                    <input
                        id="games"
                        type="text"
                        className="border-b border-black flex-1"
                        value={formData.games}
                        onChange={(e) => handleChange("games", e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-x-2">
                    <label htmlFor="ncc">NCC etc.:</label>
                    <input
                        id="ncc"
                        type="text"
                        className="border-b border-black flex-1"
                        value={formData.ncc}
                        onChange={(e) => handleChange("ncc", e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-x-2">
                    <label htmlFor="hobbies">Hobbies & Other Interests:</label>
                    <input
                        id="hobbies"
                        type="text"
                        className="border-b border-black flex-1"
                        value={formData.hobbies}
                        onChange={(e) => handleChange("hobbies", e.target.value)}
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
                        {formData.references.map((ref, idx) => (
                            <div key={idx}>
                                <div>{idx + 1}</div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="border-b border-black w-full mt-1"
                                    value={ref.name}
                                    onChange={(e) => handleReferenceChange(idx, "name", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="border-b border-black w-full mt-1"
                                    value={ref.address}
                                    onChange={(e) => handleReferenceChange(idx, "address", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className="border-b border-black w-full mt-1"
                                    value={ref.phone}
                                    onChange={(e) => handleReferenceChange(idx, "phone", e.target.value)}
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
                <textarea
                    className="w-full border border-black mt-2 p-2"
                    rows={3}
                    value={formData.convictionDetails}
                    onChange={(e) => handleChange("convictionDetails", e.target.value)}
                ></textarea>
            </div>

            {/* AFFIRMATION */}
            <p className="mt-4">
                I hereby solemnly affirm that the information given by me in this form is true. If any information is found to be false, I will be liable for punitive action.
            </p>

            <div className="flex justify-between mt-4">
                <div>
                    DATE:{" "}
                    <input
                        type="date"
                        className="border-b border-black inline-block"
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                    />
                </div>
                <div>
                    PLACE:{" "}
                    <input
                        type="text"
                        className="border-b border-black inline-block w-40"
                        value={formData.place}
                        onChange={(e) => handleChange("place", e.target.value)}
                    />
                </div>
                <div className="text-right">
                    ______________________ <br />
                    SIGNATURE
                </div>
            </div>
        </div>
    );
}
