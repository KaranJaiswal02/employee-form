"use client";

import { useState } from "react";
import { Button } from "./ui/button";

type MealTicketGeneratorProps = {
  name: string;
  month: string;
  noOfDays: number;
  year?: number;
  onReset?: () => void;
};

export default function MealTicketGenerator({
  name,
  month,
  year = new Date().getFullYear(),
  noOfDays,
  onReset
}: MealTicketGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndPrintTickets = () => {
    setIsGenerating(true);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setIsGenerating(false);
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Meal Tickets - ${name}</title>
          <style>
            @page {
              size: A4;
              margin: 5mm;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              -webkit-print-color-adjust: exact;
            }
            .ticket-container {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
              padding: 16px;
            }
            @media (min-width: 768px) {
              .ticket-container {
                grid-template-columns: repeat(4, 1fr);
              }
            }
            @media (min-width: 1024px) {
              .ticket-container {
                grid-template-columns: repeat(6, 1fr);
              }
            }
            .ticket {
              width: 160px;
              height: 108px;
              border: 1px solid #d1d5db;
              border-radius: 0.375rem;
              background-color: white;
              box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
              padding: 8px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              position: relative;
              page-break-inside: avoid;
            }
            .ticket-number {
              position: absolute;
              top: 4px;
              right: 8px;
              font-size: 15px;
              font-weight: 600;
              // color: #6b7280;
              color: #1f2937;
              
            }
            .logo-container {
              display: flex;
              justify-content: center;
              height: 48px;
            }
            .logo {
              width: 165px;
              object-fit: contain;
            }
            .name {
              text-align: center;
              font-size: 13px;
              font-weight: 600;
              color: #1f2937;
              margin: 4px 0;
            }
            .month {
              text-align: center;
              font-size: 12px;
              color: #4b5563;
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            ${Array.from({ length: noOfDays }).map((_, index) => `
              <div class="ticket">
                <div class="ticket-number">#${index + 1}</div>
                <div class="logo-container">
                  <img 
                    src="/assets/images/SL India Software Center copy.png" 
                    class="logo" 
                    alt="Logo"
                    onerror="this.src='https://via.placeholder.com/64'"
                  />
                </div>
                <div class="name">${name}</div>
                <div class="month">${month} ${year}</div>
              </div>
            `).join('')}
          </div>
          <script>
            window.onload = function() {
              setTimeout(() => {
                window.print();
                setTimeout(() => {
                  window.close();
                }, 300);
              }, 200);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 shadow-sm">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-neutral-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Field</th>
              <th scope="col" className="px-6 py-3">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 font-medium">Name</td>
              <td className="px-6 py-4">{name}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium">Month</td>
              <td className="px-6 py-4">{month}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium">Year</td>
              <td className="px-6 py-4">{year}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium">No. of tickets</td>
              <td className="px-6 py-4">{noOfDays}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={generateAndPrintTickets}
          disabled={isGenerating}
          className="w-full sm:w-auto sm:flex-1 cursor-pointer"
        >
          {isGenerating ? "Generating..." : "Generate & Print Tickets"}
        </Button>

        {onReset && (
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full sm:w-auto sm:flex-1 cursor-pointer"
          >
            Back to Form
          </Button>
        )}
      </div>
    </div>
  );
}