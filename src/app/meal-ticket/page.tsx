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

export default function MealTicketPage() {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    month: "",
    year: currentYear,
    noOfDays: 20,
  });
  const [showGenerator, setShowGenerator] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "noOfDays" || name === "year" 
        ? Math.max(1, Math.min(name === "year" ? 2100 : 31, parseInt(value) || (name === "year" ? currentYear : 1))) 
        : value
    }));
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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
                    min="2000"
                    max="2100"
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
                  value={formData.noOfDays}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Generate Tickets
              </Button>
            </form>
          ) : (
            <MealTicketGenerator 
              name={formData.name} 
              month={formData.month}
              year={formData.year}
              noOfDays={formData.noOfDays}
              onReset={() => setShowGenerator(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}