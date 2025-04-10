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

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    designation: "",
    dob: "",
    currAddress: "",
    empcode: "",
    department: "",
    bloodGroup: "",
    dateOfJoining: "",
    contactnumber: "",
    signature: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formData);
      }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="border border-black p-6 w-[700px] bg-white">
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
          <div className="row-span-8 border-l border-black flex items-center justify-center">
            <div className="w-32 h-40 border border-black text-center flex items-center justify-center text-xs">
              PHOTO
            </div>
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
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  );
}
