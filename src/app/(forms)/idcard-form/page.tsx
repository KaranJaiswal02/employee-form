"use client";
import { useState } from "react";
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
import { idCardFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useAtom(idCardFormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dummy DB call simulation
    const dummyDBCall = () => true;
    if (dummyDBCall()) {
      router.push("/staff-family-members");
    } else {
      alert("Form Submission Failed!");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="border border-black p-6 w-full max-w-2xl bg-white mx-auto my-4"
    >
      <h1 className="text-center text-xl font-bold mb-4">ID CARD FORM</h1>

      <div className="grid grid-cols-3 gap-0 border border-black text-sm">
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
          ].map(([label, id, type]) => (
            <div key={id} className="flex border-b border-black h-12">
              <div className="w-1/3 border-r border-black font-semibold px-2 flex items-center">
                {label}
              </div>
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
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PHOTO COLUMN */}
        <div className="row-span-8 border border-black flex items-center justify-center">
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
            />
          </label>
        </div>


        {/* ADDRESS ROW */}
        <div className="col-span-3 border-t border-black h-24 flex">
          <div className="w-1/6 border-r border-black px-2 font-semibold flex items-center">
            ADDRESS
          </div>
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
        <div className="col-span-3 border-t border-black h-12 flex">
          <div className="w-1/6 border-r border-black px-2 font-semibold flex items-center">
            CONTACT NUMBER
          </div>
          <div className="w-5/6 px-2 flex items-center">
            <Input
              id="contactnumber"
              value={formData.contactnumber}
              onChange={handleInputChange}
              type="tel"
            />
          </div>
        </div>

        {/* SIGNATURE */}
        <div className="col-span-3 border-t border-black h-12 flex">
          <div className="w-1/6 border-r border-black px-2 font-semibold flex items-center">
            SIGNATURE
          </div>
          <div className="w-5/6 px-2 flex items-center">
            <Input
              id="signature"
              value={formData.signature}
              onChange={handleInputChange}
            />
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
