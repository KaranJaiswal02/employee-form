"use client";

import { grauFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";

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

            <ol className="list-decimal list-inside space-y-2">
                <li className="flex">
                    Name of employee in full:
                    <input type="text" value={formData.name} disabled className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Sex:
                    <input id="sex" type="text" value={formData.sex} onChange={handleChange} className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Religion:
                    <input id="religion" type="text" value={formData.religion} onChange={handleChange} className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Whether unmarried/married/widow/widower:
                    <input id="marriagestatus" type="text" value={formData.marriagestatus} onChange={handleChange} className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Department/Branch/Section where employed:
                    <input id="department" type="text" value={formData.department} onChange={handleChange} className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Post held with Ticket No. or Serial No., if any:
                    <input id="post" type="text" value={formData.post} onChange={handleChange} className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li className="flex">
                    Date of appointment:
                    <input id="dateofappointment" type="date" value={formData.dateofappointment} onChange={handleDateChange} className="border-b border-black inline-block ml-2 flex-1 min-w-0" />
                </li>

                <li>
                    Permanent address:
                    <div className="ml-4 mt-2 space-y-1">
                        <div>
                            Village:
                            <input id="village" type="text" value={formData.village} onChange={handleChange} className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; Thana:
                            <input id="thana" type="text" value={formData.thana} onChange={handleChange} className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; Sub-division:
                            <input id="subdivision" type="text" value={formData.subdivision} onChange={handleChange} className="border-b border-black w-40 inline-block ml-1" />
                        </div>
                        <div>
                            Post Office:
                            <input id="postoffice" type="text" value={formData.postoffice} onChange={handleChange} className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; District:
                            <input id="district" type="text" value={formData.district} onChange={handleChange} className="border-b border-black w-40 inline-block ml-1" />
                            &nbsp; State:
                            <input id="state" type="text" value={formData.state} onChange={handleChange} className="border-b border-black w-40 inline-block ml-1" />
                        </div>
                    </div>
                </li>
            </ol>

            <hr className="my-6 border-black" />

            <div className="mt-6">
                <p>
                    Place:  
                    {/* <input id="place"
                    type="text" 
                    value={formData.place} 
                    onChange={handleChange} 
                    className="border-b border-black w-48 inline-block ml-2" /> */}
                    <b> Bengaluru</b>
                </p>
                <p className="mt-2">
                    Date: <input id="date" type="date" value={formData.date} onChange={handleDateChange} className="border-b border-black w-48 inline-block ml-2" />
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
                            <input
                                type="text"
                                value={formData.witness1name}
                                onChange={(e) => handleWitnessChange(0, e.target.value)}
                                className="border-b border-black w-full"
                                placeholder="Name and address"
                            />
                        </li>
                        <li>
                            <input
                                type="text"
                                value={formData.witness2name}
                                onChange={(e) => handleWitnessChange(1, e.target.value)}
                                className="border-b border-black w-full"
                                placeholder="Name and address"
                            />
                        </li>
                    </ol>
                </div>
                <div>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <input disabled={true} type="text" className="border-b border-black w-full" placeholder="Signature" />
                        </li>
                        <li>
                            <input disabled={true} type="text" className="border-b border-black w-full" placeholder="Signature" />
                        </li>
                    </ol>
                </div>
            </div>

            <p className="mt-4">Place: <input type="text" value={formData.place} disabled={true} className="border-b border-black w-48 inline-block ml-2" /></p>
            <p>Date: <input type="date" value={formData.date}  className="border-b border-black w-48 inline-block ml-2" /></p>

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
                <div className="border-b border-black w-60 inline-block mt-2 " />
                
            </p>
            <p>Date: <input type="date" value={formData.date} disabled className="border-b border-black w-48 inline-block ml-2 mt-2 mb-2 " /></p>
            <p>
                Name and address of the establishment or rubber stamp thereof:
                < div className="w-full mt-2 h-25" > 
                {/* < div className="w-full border border-black mt-2 h-25" ></div> */}
                <p><b>SL AP Private Limited</b><br />
                    Brigade Opus,  4th Floor<br />
                    Municipal No. 70/401, Survey No. 44/1 and 44/4
                    Kodigehalli Main Road, Hebbal,<br/> Bengaluru Urban, Karnataka 560092</p>
                    </div>
            </p>

            <hr className="my-6 border-black" />

            <h4 className="font-bold text-center">Acknowledgement by the Employee</h4>
            <p>
                Received the duplicate copy of nomination in Form 'F' filed by me and duly certified by the employer.
            </p>
            <p className="mt-2">
                Date: <input type="date" value={formData.date} disabled className="border-b border-black w-48 inline-block ml-2" />
            </p>
            <p className="text-right font-semibold mt-4">Signature of the Employee</p>

            <hr className="my-6 border-black" />

            <p className="text-xs italic mt-4">
                Note.—Strike out the words/paragraphs not applicable.
            </p>
        </div>
    );
}
