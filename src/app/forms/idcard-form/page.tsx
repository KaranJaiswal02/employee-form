"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { empFormData, formStatusus, idCardFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useAtom(idCardFormData);
  const [empFormData1] = useAtom(empFormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [, setFormStatus] = useAtom(formStatusus);
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: empFormData1.name || "",
      fatherName: empFormData1.fatherName || "",
      designation: empFormData1.designation || "",
      dob: empFormData1.dob || "",
      // currAddress: empFormData1.currAddress || "",
    }));
  }, []);

  useEffect(() => {
    setPhotoPreview(formData.photo || null);
  }, [formData.photo]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(empFormData1.fatherName.toString())
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        setFormData((prev) => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    
    const id = searchParams.get('id')
    console.log(formData);
    const response = await fetch("/api/forms/idcard-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
        "userid": id as string,
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    if (responseData.success) {
      setFormStatus((prevStatus) => ({
        ...prevStatus,
        id_card: {
          ...prevStatus.id_card,
          status: "done",
        },
      }));
      toast.success(responseData.message);
      const params = id ? `?id=${id}` : '';
      router.push(`/forms/staff-family-members${params}`);
    }
    else {
      toast.error(responseData.message);
      setErrors(responseData.errors);
    }
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-2xl mx-auto bg-white dark:bg-card border shadow-md rounded-lg"
    >
      <h1 className="text-center text-xl font-bold mb-4">ID CARD FORM</h1>

      <div className="grid grid-cols-3 gap-0 border border-black dark:border-white text-sm">

        <div className="col-span-2 w-full">
          {/* NAME */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="name" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              NAME
            </label>
            <div className="w-2/3 flex items-center px-2">
              <Input
                id="name"
                type="text"
                value={empFormData1.name}
                onChange={handleInputChange}
                className="w-full"
                disabled={true}
              />
            </div>
          </div>

          {/* CODE */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="empcode" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              CODE
            </label>
            <div className="w-2/3 flex items-center px-2">
              <Input
                id="empcode"
                type="text"
                value={formData.empcode}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>

          {/* DEPARTMENT */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="department" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              DEPARTMENT
            </label>
            <div className="w-2/3 flex items-center px-2">
              <Input
                id="department"
                type="text"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>

          {/* DESIGNATION */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="designation" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              DESIGNATION
            </label>
            <div className="w-2/3 flex items-center px-2">
              <Input
                id="designation"
                type="text"
                value={empFormData1.designation}
                onChange={handleInputChange}
                className="w-full"
                disabled={true}
                required
              />
            </div>
          </div>

          {/* DOB */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="dob" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              DOB
            </label>
            <div className="w-2/3 flex items-center px-2">
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full"
                disabled={true}
                required
                min="1950-01-01"
              />
            </div>
          </div>

          {/* DOJ */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="dateOfJoining" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              DOJ
            </label>
            <div className="w-2/3 flex items-center px-2">
              <Input
                id="dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>

          {/* BLOOD GROUP */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="bloodGroup" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              BLOOD GROUP
            </label>
            <div className="w-2/3 flex items-center px-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full text-left">
                  <Input
                    id="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    readOnly
                    className="cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuRadioGroup
                    value={formData.bloodGroup}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        bloodGroup: value,
                      }))
                    }
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                      (bg) => (
                        <DropdownMenuRadioItem key={bg} value={bg}>
                          {bg}
                        </DropdownMenuRadioItem>
                      )
                    )}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* FATHER NAME */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="fatherName" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              FATHER NAME
            </label>
            <div className="w-2/3 flex items-center px-2">
              <Input
                id="fatherName"
                type="text"
                value={empFormData1.fatherName}
                onChange={handleInputChange}
                className="w-full"
                disabled={true}
                required
              />
            </div>
          </div>

          {/* YEAR */}
          <div className="flex border-b border-black dark:border-white h-12">
            <label htmlFor="year" className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
              YEAR
            </label>
            <div className="w-2/3 flex items-center px-2">
              <Input
                id="year"
                type="text"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full"
                min="2000"
                max="2100"
              />
            </div>
          </div>
        </div>

        {/* PHOTO COLUMN */}
        <div className="row-span-9 border border-black dark:border-white flex items-center justify-center">
          <label className="w-32 h-40 border-2 border-gray-400 text-center flex items-center justify-center text-xs cursor-pointer relative">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Uploaded Photo"
                className="w-32 h-40 object-contain absolute inset-0"
              />
            ) : (
              <span className="text-sm">Upload Photo</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="opacity-0 absolute inset-0 cursor-pointer"
              required
            />
          </label>
        </div>

        {/* ADDRESS ROW */}
        <div className="col-span-3 border-t border-black dark:border-white h-24 flex">
          <label htmlFor="currAddress" className="w-1/6 border-r border-black dark:border-white px-2 font-semibold flex items-center">
            ADDRESS
          </label>
          <div className="w-5/6 px-2">
            <Textarea
              id="currAddress"
              value={formData.currAddress}
              onChange={handleInputChange}
              className="w-full h-full resize-none"
            />
          </div>
        </div>

        {/* CONTACT NUMBER */}
        <div className="col-span-3 border-t border-black dark:border-white h-12 flex">
          <label htmlFor="contactnumber" className="w-1/6 border-r border-black dark:border-white px-2 font-semibold flex items-center">
            CONTACT NUMBER
          </label>
          <div className="w-5/6 px-2 flex items-center">
            <Input
              id="contactnumber"
              value={formData.contactnumber}
              onChange={handleInputChange}
              type="number"
              pattern="[0-9]{10}"
            />
          </div>
        </div>

        {/* SIGNATURE */}
        <div className="col-span-3 border-t border-black dark:border-white h-12 flex">
          <div className="w-1/6 border-r border-black dark:border-white px-2 font-semibold flex items-center">
            SIGNATURE
          </div>
          <div className="w-5/6 px-2 flex items-center">
            {/* Signature upload could be added here similarly to photo upload */}
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="text-red-600 text-sm px-2 text-left">
          {errors.map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
          Submit
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}