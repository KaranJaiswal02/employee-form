"use client";
import IdCardForm from "@/components/idCardForm/IdCardForm";
import { DefaultIdCardFormData } from "@/hooks/defaultValue";
import { IdCardFormData } from "@/models/forms/idcard-form";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { idCardFormData } from "@/hooks/Atoms";

export default function IdcardForm({ data = DefaultIdCardFormData }: { data?: IdCardFormData }) {
  const [, setFormData] = useAtom(idCardFormData);

  useEffect(() => {
    setFormData(data);
  }, [data, setFormData]);

  return (
    <>
      <div className='print:hidden h-screen text-5xl flex justify-center items-end bg-white dark:bg-card text-black dark:text-white p-4 font-bold font-mono'>
        Id card Form
      </div>
      <div className="hidden print:block force-light p-6 max-w-2xl mx-auto bg-white">
        <IdCardForm />
      </div>
    </>
  );
}