"use client";

export default function EmployerCertification() {
    return (
        <div className="max-w-5xl mx-auto bg-white p-10 text-black border border-gray-300 rounded-md font-serif space-y-6 mt-8 text-sm">
            {/* Certification Statements */}
            <ol className="list-decimal space-y-2 ml-6">
                <li>
                    Certified that I have no family and should I acquire a family hereafter, the above
                    nomination shall be deemed as cancelled.
                </li>
                <li>
                    *Certified that my father/ mother is/are dependent upon me.
                </li>
                <li>*Strike out whichever is not applicable.</li>
            </ol>

            <div className="text-right pr-10 mt-10">
                <p>Signature or the thumb</p>
                <p>Impression of the employed person.</p>
            </div>

            {/* Certificate by Employer */}
            <div className="text-center mt-12">
                <h3 className="font-bold">CERTIFICATE BY EMPLOYER</h3>
            </div>
            <p className="text-justify">
                Certified that the above declaration and nomination has been signed/thumb impression before me by Shri./ Smt./ Kum.{" "}
                <input
                    type="text"
                    placeholder="Full Name"
                    className="border-b border-gray-500 px-2 mx-1 w-60 inline-block"
                />
                employed in my establishment after he/ she has read the entry/ entries have been read over to him/ her by me and got confirmed by him/her.
            </p>

            {/* Place & Date */}
            <div className="flex justify-between mt-10">
                <div className="flex flex-col gap-2 w-1/2">
                    <div className="flex items-center gap-2">
                        <label className="w-16 font-medium">Place:</label>
                        <input
                            type="text"
                            className="flex-1 border-b border-gray-500 px-2"
                            placeholder="Enter Place"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="w-16 font-medium">Date:</label>
                        <input
                            type="date"
                            className="flex-1 border-b border-gray-500 px-2"
                        />
                    </div>
                </div>

                <div className="text-right w-1/2 pr-6">
                    <p className="font-semibold">Signature of the employer or other</p>
                    <p>authorised officer of the establishment</p>
                    <p>And designation</p>
                </div>
            </div>

            {/* Name and address of factory */}
            <div className="mt-10">
                <label className="block font-medium mb-2">
                    Name and address of the factory/Establishment and rubber stamp thereof:
                </label>
                <textarea
                    rows={3}
                    className="w-full border border-gray-400 px-2 py-1"
                    placeholder="Enter full address"
                />
            </div>
        </div>
    );
}
