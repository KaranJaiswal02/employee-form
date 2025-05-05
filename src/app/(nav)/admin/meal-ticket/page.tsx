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

type formDataType = {
  name: string;
  month: string;
  year: number;
  noOfDays: number | null;
};

export default function MealTicketPage() {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    month: "",
    year: currentYear,
    noOfDays: 20,
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

    if (name === "noOfDays") {
      const parsed = parseInt(value);
      const days = value === "" 
        ? null 
        : (!isNaN(parsed) && parsed >= 0 && parsed <= 31 ? parsed : prev.noOfDays);
      return { ...prev, noOfDays: days };
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
    if (!formData.name || !formData.month) {
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
                    <SelectTrigger>
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

              <div className="space-y-2">
                <Label htmlFor="noOfDays">Number of Days (1-31)</Label>
                <Input
                  type="number"
                  id="noOfDays"
                  name="noOfDays"
                  value={formData.noOfDays || ""}
                  onChange={handleChange}
                  required
                />
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
              noOfDays={formData.noOfDays || 0}
              onReset={() => setShowGenerator(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}