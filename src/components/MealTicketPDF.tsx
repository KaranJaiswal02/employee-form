"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
type MealTicketPDFProps = {
  name: string;
  month: string;
  year: string;
  noOfDays: number;
};

export default function MealTicketPDF({ name, month,year, noOfDays }: MealTicketPDFProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    if (typeof window === "undefined") return;

    setIsLoading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0,
        filename: `${name}_Meal_Tickets.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(contentRef.current).save();

    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <Button onClick={handleDownload} className="cursor-pointer" disabled={isLoading}>
          {isLoading ? "Preparing PDF..." : "Download Meal Tickets"}
        </Button>
      </div>

      {/* Only this part will go to PDF */}
      <div
        ref={contentRef}
        className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3 justify-items-center p-4 bg-white"
      >

        {Array.from({ length: noOfDays=28 }).map((_, index) => (
          <div
            key={index}
            className="w-40 h-27 border border-gray-400 rounded-md bg-white shadow-sm p-2 flex flex-col justify-between relative"
          >
            <div className="absolute top-1 right-2 text-[15px] font-semibold text-gray-500">
              #{index + 1}
            </div>
            <div className="flex justify-center">
              <img
                src="/assets/images/SL India Software Center copy.png" // make sure this path works!
                className="w-60 h-12 object-contain"
                alt="Logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/64";
                }}
              />
            </div>
            <div className="text-center text-[13px] font-semibold text-gray-800">
              {name}
            </div>
            <div className="text-center text-[12px] text-gray-600">
              {month} {year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
