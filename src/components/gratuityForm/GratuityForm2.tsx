"use client";

import { grauFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import RequiredLabel from "../RequiredLabel";

export default function GratuityForm2() {
    const [formData, setFormData] = useAtom(grauFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleWitnessChange = (index: number, value: string) => {
        if (index === 0) {
            setFormData(prev => ({ ...prev, witness1name: value }));
        } else if (index === 1) {
            setFormData(prev => ({ ...prev, witness2name: value }));
        }
    };

    return (
        <div>
            <h4 className="font-bold text-center mb-4">Statement</h4>

            <ol className="list-decimal list-inside space-y-2 ">

                <ul>
                    {/* Name of employee in full */}
                    <li className="flex">
                        <label htmlFor="name" className="flex-1 flex">
                            Name of employee in full:
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                disabled
                                className="border-b border-black dark:border-white inline-block ml-2 flex-1 min-w-0 focus:outline-none"
                            />
                        </label>
                    </li>

                    {/* Sex */}
                    <li className="flex">
                        <RequiredLabel><label htmlFor="sex" className="flex-1 flex">
                            Sex:</label></RequiredLabel>
                        <input
                            id="sex"
                            type="text"
                            value={formData.sex}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white inline-block ml-2 flex-1 min-w-0 focus:outline-none"
                            required
                        />

                    </li>

                    {/* Religion */}
                    <li className="flex">
                        <RequiredLabel><label htmlFor="religion" className="flex-1 flex">
                            Religion:</label></RequiredLabel>
                        <input
                            id="religion"
                            type="text"
                            value={formData.religion}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white inline-block ml-2 flex-1 min-w-0 focus:outline-none"
                            required
                        />

                    </li>

                    {/* Marital Status */}
                    <li className="flex">
                        <RequiredLabel><label htmlFor="marriagestatus" className="flex-1 flex">
                            Whether unmarried/married/widow/widower:</label></RequiredLabel>
                        <input
                            id="marriagestatus"
                            type="text"
                            value={formData.marriagestatus}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white inline-block ml-2 flex-1 min-w-0 focus:outline-none"
                            required
                        />

                    </li>

                    {/* Department */}
                    <li className="flex">
                        <RequiredLabel><label htmlFor="department" className="flex-1 flex">
                            Department/Branch/Section where employed:</label></RequiredLabel>
                        <input
                            id="department"
                            type="text"
                            value={formData.department}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white inline-block ml-2 flex-1 min-w-0 focus:outline-none"
                            required
                        />

                    </li>

                    {/* Post held */}
                    <li className="flex">
                        <label htmlFor="post" className="flex-1 flex">
                            Post held with Ticket No. or Serial No., if any:</label>
                        <input
                            id="post"
                            type="text"
                            value={formData.post}
                            onChange={handleChange}
                            className="border-b border-black dark:border-white inline-block ml-2 flex-1 min-w-0 focus:outline-none"
                        />

                    </li>

                    {/* Date of appointment */}
                    <li className="flex">
                        <RequiredLabel><label htmlFor="dateofappointment" className="flex-1 flex">
                            Date of appointment:</label></RequiredLabel>
                        <input
                            id="dateofappointment"
                            type="date"
                            value={formData.dateofappointment.toString().split('T')[0]}
                            onChange={handleChange}
                            required
                            className="border-b border-black dark:border-white inline-block ml-2 flex-1 max-w-[200px] focus:outline-none"
                        />

                    </li>
                </ul>
                <li>
                    <RequiredLabel><label htmlFor="building">Permanent address:</label></RequiredLabel>
                    <div className="ml-4 mt-2 space-y-1">
                        <div>
                            <label htmlFor="building" className="inline-block">
                                Building No./Street No.
                                <input
                                    id="building"
                                    type="text"
                                    value={formData.building}
                                    onChange={handleChange}
                                    className="border-b border-black dark:border-white w-40 inline-block ml-1 focus:outline-none"
                                    required
                                />
                            </label>

                            <label htmlFor="village" className="inline-block ml-2">
                                Village:
                                <input
                                    id="village"
                                    type="text"
                                    value={formData.village}
                                    onChange={handleChange}
                                    className="border-b border-black dark:border-white w-40 inline-block ml-1 focus:outline-none"
                                />
                            </label>

                            <label htmlFor="thana" className="inline-block ml-2">
                                Thana:
                                <input
                                    id="thana"
                                    type="text"
                                    value={formData.thana}
                                    onChange={handleChange}
                                    className="border-b border-black dark:border-white w-40 inline-block ml-1 focus:outline-none"
                                    required
                                />
                            </label>

                            <label htmlFor="subdivision" className="inline-block ml-0">
                                Sub-division:
                                <input
                                    id="subdivision"
                                    type="text"
                                    value={formData.subdivision}
                                    onChange={handleChange}
                                    className="border-b border-black dark:border-white w-40 inline-block ml-1 focus:outline-none"
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="postoffice" className="inline-block">
                                Post Office:
                                <input
                                    id="postoffice"
                                    type="text"
                                    value={formData.postoffice}
                                    onChange={handleChange}
                                    className="border-b border-black dark:border-white w-40 inline-block ml-1 focus:outline-none"
                                    required
                                />
                            </label>

                            <label htmlFor="district" className="inline-block ml-2">
                                District:
                                <input
                                    id="district"
                                    type="text"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="border-b border-black dark:border-white w-40 inline-block ml-1 focus:outline-none"
                                    required
                                />
                            </label>

                            <label htmlFor="state" className="inline-block ml-2">
                                State:
                                <input
                                    id="state"
                                    type="text"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="border-b border-black dark:border-white w-40 inline-block ml-1 focus:outline-none"
                                    required
                                />
                            </label>
                        </div>
                    </div>
                </li>
            </ol>

            <hr className="my-6 border-black dark:border-white" />

            <div className="mt-6">
                <p>
                    Place:
                    <input id="place"
                        type="text"
                        value={formData.place}
                        onChange={handleChange}
                        className=" font-bold border-black dark:border-white w-48 inline-block ml-2"
                        disabled={true}
                    />

                </p>
                <p className="mt-2">
                    Date: <input id="date" type="date" value={formData.date.toString().split('T')[0]} onChange={handleDateChange}
                        className=" border-black dark:border-white w-48 inline-block ml-2 focus:outline-none"
                        disabled={true}
                    />
                </p>
                <p className="mt-4 text-right font-semibold">Signature/Thumb-impression of the Employee</p>
            </div>

            <hr className="my-6 border-black dark:border-white" />

            <h4 className="font-bold text-center">Declaration by Witnesses</h4>
            <p>Nomination signed/thumb-impressed before me</p>
            <p>Name in full and Full address of witnesses. </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <input
                                type="text"
                                value={formData.witness1name}
                                onChange={(e) => handleWitnessChange(0, e.target.value)}
                                className="border-b border-black dark:border-white w-full focus:outline-none"
                                placeholder="Name and address"

                            />
                        </li>
                        <li>
                            <input
                                type="text"
                                value={formData.witness2name}
                                onChange={(e) => handleWitnessChange(1, e.target.value)}
                                className="border-b border-black dark:border-white w-full focus:outline-none"
                                placeholder="Name and address"
                            />
                        </li>
                    </ol>
                </div>
                <div>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <input disabled={true} type="text" className="border-b border-black dark:border-white w-full" placeholder="Signature" />
                        </li>
                        <li>
                            <input disabled={true} type="text" className="border-b border-black dark:border-white w-full" placeholder="Signature" />
                        </li>
                    </ol>
                </div>
            </div>

            <p className="mt-4">Place:
                <input type="text"
                    value={formData.place}
                    disabled={true}
                    className="font-bold border-black dark:border-white w-48 inline-block ml-2"
                />
            </p>
            <p>Date:
                <input
                    type="date"
                    value={formData.date.toString().split('T')[0]}
                    disabled={true}
                    className=" border-black dark:border-white w-48 inline-block ml-2"
                />
            </p>
            <hr className="print:hidden my-6 border-black dark:border-white" />
            <div className="page-break"></div>
            <h4 className="font-bold text-center">Certificate by the Employer</h4>
            <p>
                Certified that the particulars of the above nomination have been verified and recorded in this establishment.
            </p>
            <p>
                Employer's Reference No., if any:{" "}
                <input type="text" className="border-b border-black dark:border-white w-60 inline-block focus:outline-none" />
            </p>
            <div className="mt-2">
                Signature of the employer/Officer authorised:{" "}
                <div className="border-b border-black dark:border-white w-60 inline-block mt-2 " />
            </div>
            <p>Date: <input type="date" value={formData.date.toString().split('T')[0]} disabled className="border-b border-black dark:border-white w-48 inline-block ml-2 mt-2 mb-2 focus:outline-none " /></p>
            <div className="mt-2">
                Name and address of the establishment or rubber stamp thereof:
                < div className="w-full mt-3 mb-5" >
                    <textarea
                        id="establishmentAddress"
                        rows={4}
                        className="w-full border-b-1 border-black dark:border-white pb-1 focus:outline-none mr-2"
                        value={formData.establishmentAddress}
                        disabled />
                </div>
            </div>

            {/* <hr className="my-6 border-black dark:border-white" /> */}

            <h4 className="font-bold text-center">Acknowledgement by the Employee</h4>
            <p>
                Received the duplicate copy of nomination in Form 'F' filed by me and duly certified by the employer.
            </p>
            <p className="mt-2">
                Date: <input type="date" value={formData.date.toString().split('T')[0]} disabled className="focus:outline-none border-b border-black dark:border-white w-48 inline-block ml-2" />
            </p>
            <p className="text-right font-semibold mt-4">Signature of the Employee</p>

            {/* <hr className="my-6 border-black dark:border-white" /> */}

            <p className="text-xs italic mt-4">
                Note.—Strike out the words/paragraphs not applicable.
            </p>
        </div>
    );
}
