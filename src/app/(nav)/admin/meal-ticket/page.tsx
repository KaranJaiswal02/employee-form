'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { useState } from 'react';
import MealTicketGenerator from '@/components/MealTicketPDF';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString('default', { month: 'long' });

export default function MealTicketForm() {
  const [inputMethod, setInputMethod] = useState<'manual' | 'csv'>('manual');
  const [showGenerator, setShowGenerator] = useState(false);
  const [formData, setFormData] = useState({
    rawNames: '',
    names: [] as string[],
    month: currentMonth,
    year: currentYear,
    fromDay: '1',
    toDay: '20',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/).filter(Boolean).map(line => line.trim());
      setFormData(prev => ({
        ...prev,
        names: lines,
        rawNames: lines.join(', '),
      }));
    };
    reader.readAsText(file);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMethod === 'manual') {
      const names = formData.rawNames.split(',').map(n => n.trim()).filter(Boolean);
      setFormData(prev => ({ ...prev, names }));
    }
    setShowGenerator(true);
  };

  const handleMonthChange = (value: string) => {
    setFormData(prev => ({ ...prev, month: value }));
  };

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
                <Label>Input Method</Label>
                <RadioGroup
                  value={inputMethod}
                  onValueChange={val => setInputMethod(val as 'manual' | 'csv')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="manual" />
                    <Label htmlFor="manual">Enter names manually</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="csv"
                      id="csv" />
                    <Label htmlFor="csv">Upload CSV</Label>
                  </div>
                </RadioGroup>
              </div>

              {inputMethod === 'manual' && (
                <div className="space-y-2">
                  <Label htmlFor="rawNames">Employee Names (comma separated)</Label>
                  <Input
                    id="rawNames"
                    name="rawNames"
                    value={formData.rawNames}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alice, Bob, Charlie"
                  />
                </div>
              )}
              <div className={`space-y-2 ${inputMethod === 'csv' ? '' : 'hidden'}`}>
                <Label htmlFor="csvUpload">Upload CSV</Label>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Select value={formData.month} onValueChange={handleMonthChange} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
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
                    onChange={e => {
                      const year = parseInt(e.target.value) || currentYear;
                      setFormData(prev => ({
                        ...prev,
                        year: Math.max(currentYear, Math.min(currentYear + 2, year)),
                      }));
                    }}
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
                    value={formData.fromDay}
                    onChange={handleChange}
                    max={31}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toDay">To Day (1-31)</Label>
                  <Input
                    type="number"
                    id="toDay"
                    name="toDay"
                    value={formData.toDay}
                    onChange={handleChange}
                    max={31}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Generate Tickets
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <MealTicketGenerator
                names={formData.names}
                month={formData.month}
                year={formData.year}
                fromDay={parseInt(formData.fromDay)}
                toDay={parseInt(formData.toDay)}
                onReset={() => setShowGenerator(false)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
