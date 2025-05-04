'use client'
import {
    DefaultBankMandateFormData,
    DefaultEmpFormData,
    DefaultGrauFormData,
    DefaultIdCardFormData,
    DefaultNominationForm1Data,
    DefaultNominationForm2Data,
    DefaultStaffFamilyFormData
} from '@/hooks/defaultValue'

const formButtons = [
    { key: 'bankMandate', label: 'Print Bank Mandate', data: DefaultBankMandateFormData, layout: 'portrait' },
    { key: 'gratuityForm', label: 'Print Gratuity Form', data: DefaultGrauFormData, layout: 'portrait' },
    { key: 'idCardForm', label: 'Print ID Card Form', data: DefaultIdCardFormData, layout: 'portrait' },
    { key: 'nominationForm1', label: 'Print Nomination Form 1', data: DefaultNominationForm1Data, layout: 'landscape' },
    { key: 'nominationForm2', label: 'Print Nomination Form 2', data: DefaultNominationForm2Data, layout: 'landscape' },
    { key: 'staffFamily', label: 'Print Staff Family', data: DefaultStaffFamilyFormData, layout: 'landscape' },
    { key: 'staffJoining', label: 'Print Staff Joining Form', data: DefaultEmpFormData, layout: 'portrait' },
]

export default function PrintPage() {
    const handleOpenAndPrint = (formKey: string, data: any, layout: string) => {
        const payload = {
            formKey,
            formData: data,
            layout,
            timestamp: Date.now(),
        };
        localStorage.setItem('printFormData', JSON.stringify(payload));
        const url = `/print/${formKey}`
        const printWindow = window.open(url, '_blank')
        if (printWindow) printWindow.focus()
    }

    return (
        <div className="p-6 space-y-4 max-w-xl mx-auto">
            {formButtons.map(({ key, label, data, layout }) => (
                <button
                    key={key}
                    onClick={() => handleOpenAndPrint(key, data, layout)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
