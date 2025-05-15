"use client";

import { useState } from "react";
import MealTicketGenerator from "@/components/MealTicketPDF";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type formDataType = {
  name: string;
  month: string;
  year: number;
  fromDay: number | null;
  toDay: number | null;
};

export default function MealTicketPage() {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    month: "",
    year: currentYear,
    fromDay: 1,
    toDay: 20,
  });

  const [showGenerator, setShowGenerator] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      if (name === "year") {
        const year = parseInt(value) || currentYear;
        const clampedYear = Math.max(currentYear, Math.min(currentYear + 2, year));
        return { ...prev, year: clampedYear };
      }

      if (name === "fromDay" || name === "toDay") {
        const parsed = parseInt(value);
        const validDay = value === ""
          ? null
          : (!isNaN(parsed) && parsed >= 1 && parsed <= 31 ? parsed : prev[name]);
        return { ...prev, [name]: validDay };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleMonthChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      month: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, month, fromDay, toDay } = formData;

    if (!name || !month || fromDay === null || toDay === null || fromDay > toDay) {
      toast.warning("Please fill all fields correctly.",{
        description: "From Day must be less than or equal to To Day."
      });
      return;
    }
    setShowGenerator(true);
  };

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Meal Ticket Generator</CardTitle>
        </CardHeader>
        <CardContent>
          {!showGenerator ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Employee Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter employee name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Select
                    value={formData.month}
                    onValueChange={handleMonthChange}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromDay">From Day (1-31)</Label>
                  <Input
                    type="number"
                    id="fromDay"
                    name="fromDay"
                    value={formData.fromDay ?? ""}
                    max={31}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toDay">To Day (1-31)</Label>
                  <Input
                    type="number"
                    id="toDay"
                    name="toDay"
                    value={formData.toDay ?? ""}
                    max={31}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Generate Tickets
              </Button>
            </form>
          ) : (
            <MealTicketGenerator
              name={formData.name}
              month={formData.month}
              year={formData.year}
              fromDay={formData.fromDay ?? 1}
              toDay={formData.toDay ?? 1}
              onReset={() => setShowGenerator(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}