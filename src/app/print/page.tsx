'use client'

import { Button } from '@/components/ui/button'
import {
  DefaultBankMandateFormData,
  DefaultEmpFormData,
  DefaultGrauFormData,
  DefaultIdCardFormData,
  DefaultNominationForm1Data,
  DefaultNominationForm2Data,
  DefaultStaffFamilyFormData,
} from '@/hooks/defaultValue'
import { FileText } from 'lucide-react'

const formButtons = [
  { key: 'bankMandateFormData', label: 'Bank Mandate Form', data: DefaultBankMandateFormData, layout: 'portrait' },
  { key: 'grauFormData', label: 'Gratuity Form', data: DefaultGrauFormData, layout: 'portrait' },
  { key: 'idCardFormData', label: 'ID Card Form', data: DefaultIdCardFormData, layout: 'portrait' },
  { key: 'nominationForm1Data', label: 'Nomination Form 1', data: DefaultNominationForm1Data, layout: 'portrait' },
  { key: 'nominationForm2Data', label: 'Nomination Form 2', data: DefaultNominationForm2Data, layout: 'portrait' },
  { key: 'staffFamilyFormData', label: 'Staff Family Form', data: DefaultStaffFamilyFormData, layout: 'landscape' },
  { key: 'empFormData', label: 'Staff Joining Form', data: DefaultEmpFormData, layout: 'portrait' },
]

export default function DownloadBlankFormsPage() {
  const handleOpenAndPrint = (formKey: string, data: object, layout: string) => {
    const payload = {
      formKey,
      formData: data,
      layout,
      timestamp: Date.now(),
    }
    localStorage.setItem('printFormData', JSON.stringify(payload))
    const url = `/print/${formKey}`
    const printWindow = window.open(url, '_blank')
    if (printWindow) printWindow.focus()
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Download Blank Forms</h1>
        <p className="text-muted-foreground text-lg">
          Generate and print pre-filled form templates instantly.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {formButtons.map(({ key, label, data, layout }) => (
          <div
            key={key}
            className="bg-card/60 border border-border backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">{label}</h3>
            </div>
            <Button
              className="w-full text-sm font-medium cursor-pointer"
              onClick={() => handleOpenAndPrint(key, data, layout)}
            >
              Open & Print
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
