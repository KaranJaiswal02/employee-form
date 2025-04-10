
"use client";
import Image from "next/image";

interface WelcomeCardProps {
  name: string;
  designation: string;
  joiningDate: string;
  location: string;
  reportingManager: string;
  department: string;
  education: string;
  experience: string;
  hobbies: string;
  contact: string;
  imageUrl: string;
  logoUrl: string;
}

export default function WelcomeCard({
  name,
  designation,
  joiningDate,
  location,
  reportingManager,
  department,
  education,
  experience,
  hobbies,
  contact,
  imageUrl,
  logoUrl,
}: WelcomeCardProps) {
  return (
    <div className="bg-[#f9fafb] text-[#1a1a1a] p-10 border-4 border-blue-400 max-w-5xl mx-auto rounded-md font-sans">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col items-start space-y-2">
          <Image
            src={""/*"C:\Users\ISC7002004\OneDrive - SLWORLD.COM\Desktop\employee-form\public\companylogo.jpg"*/}
            alt={`${name} photo`}
            width={120}
            height={150}
            className="rounded-md border border-gray-500"
          />
          <div className="mt-2">
            <h2 className="font-bold text-lg">{name}</h2>
            <p className="text-sm">{designation}</p>
          </div>
        </div>
        <Image
          src={""/*"C:\Users\ISC7002004\OneDrive - SLWORLD.COM\Desktop\employee-form\public\companylogo.jpg*/} // Replace with your actual logo path
          alt="Company Logo"
          width={100}
          height={50}
          className="object-contain"
        />
      </div>

      <h1 className="text-center text-3xl font-bold text-orange-500 mb-6">
        Welcome
      </h1>

      <div className="space-y-4 text-sm">
        <p>
          We are pleased to extend a warm welcome to <strong>{name}</strong> who joined us on{" "}
          <strong>{joiningDate}</strong> as <strong>{designation}</strong> for{" "}
          <strong>{department}</strong>, a branch of SL AP Pvt Ltd. They will be based in{" "}
          <strong>{location}</strong> and will report to <strong>{reportingManager}</strong>.
        </p>

        <p>
          {name} has completed {education} and has more than {experience} of experience. Their hobbies
          include {hobbies}.
        </p>

        <p>
          Please extend your warm welcome and provide the necessary cooperation and support to the new
          member of SL ISC family. We wish them a long and mutually beneficial association with us.
        </p>

        <p className="font-medium">Can be reached at: {contact}</p>
      </div>
    </div>
  );
}

