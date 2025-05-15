"use client";

import { Button } from "./ui/button";

type MealTicketGeneratorProps = {
  name: string;
  month: string;
  fromDay: number;
  toDay: number;
  year?: number;
  onReset?: () => void;
};

export default function MealTicketGenerator({
  name,
  month,
  year = new Date().getFullYear(),
  fromDay,
  toDay,
  onReset
}: MealTicketGeneratorProps) {

  const handlePrint = () => {
    const payload = {
      formKey: 'mealTickets',
      formData: { name, month, year, fromDay, toDay },
      layout: 'portrait',
      timestamp: Date.now(),
    };

    localStorage.setItem('printFormData', JSON.stringify(payload));
    const url = `/print/mealTickets`;
    const printWindow = window.open(url, '_blank');
    if (printWindow) printWindow.focus();
  };


  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 shadow-sm">
        <table className="min-w-full text-base text-center text-gray-700 dark:text-gray-300">
          <thead className="bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100 text-gray-900 dark:text-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2">Field</th>
              <th scope="col" className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-2 font-medium">Name</td>
              <td className="px-4 py-2">{name}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Month</td>
              <td className="px-4 py-2">{month}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Year</td>
              <td className="px-4 py-2">{year}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Days</td>
              <td className="px-4 py-2">{fromDay} to {toDay}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handlePrint}
          className="w-full sm:w-auto sm:flex-1 cursor-pointer"
        >
          Generate & Print Tickets
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