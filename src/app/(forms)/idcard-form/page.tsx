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
import { useRouter } from "next/navigation";
import { empFormData, formStatusus, idCardFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useAtom(idCardFormData);
  const [empFormData1] = useAtom(empFormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [_, setFormStatus] = useAtom(formStatusus);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: empFormData1.name || "",
      fatherName: empFormData1.fatherName || "",
      designation: empFormData1.designation || "",
      dob: empFormData1.dob || "",
      // currAddress: empFormData1.currAddress || "",
    }));
    setPhotoPreview(formData.photo || null);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    e.preventDefault();
    console.log(formData);
    const response = await fetch("/api/forms/idcard-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 201) {
      setFormStatus((prevStatus) => ({
        ...prevStatus,
        form2: {
          ...prevStatus.form2,
          status: "done",
        },
      }));
      router.push("/staff-family-members");
    }
    else {
      const responseData = await response.json();
      alert(responseData.message);
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-950 shadow-md rounded-lg"
    >
      <h1 className="text-center text-xl font-bold mb-4">ID CARD FORM</h1>

      <div className="grid grid-cols-3 gap-0 border border-black dark:border-white text-sm">
        <div className="col-span-2 w-full">
          {[
            ["NAME", "name"],
            ["CODE", "empcode"],
            ["DEPARTMENT", "department"],
            ["DESIGNATION", "designation"],
            ["DOB", "dob", "date"],
            ["DOJ", "dateOfJoining", "date"],
            ["BLOOD GROUP", "bloodGroup"],
            ["FATHER NAME", "fatherName"],
            ["YEAR", "year"],
          ].map(([label, id, type]) => (
            <div key={id} className="flex border-b border-black dark:border-white h-12">
              <label htmlFor={id} className="w-1/3 border-r border-black dark:border-white font-semibold px-2 flex items-center">
                {label}

              </label>
              <div className="w-2/3 flex items-center px-2">
                {id === "bloodGroup" ? (
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
                ) : (
                  <Input
                    id={id}
                    type={type || "text"}
                    value={(formData as any)[id]}
                    onChange={handleInputChange}
                    className="w-full"
                    min={id === "year" ? "2000" : undefined}
                    max={id === "year" ? "2100" : undefined}
                  />
                )}
              </div>
            </div>
          ))}
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

      <div className="flex justify-center mt-6">
        <Button type="submit" className="w-full cursor-pointer">
          Submit
        </Button>
      </div>
    </form>
  );
}