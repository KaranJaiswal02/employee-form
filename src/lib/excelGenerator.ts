import * as XLSX from 'xlsx';
import { getReadableKeyName } from './readableKeys';

const flattenObject = (obj: any, parentKey = '', result: Record<string, any> = {}) => {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    flattenObject(item, `${newKey}[${index}]`, result);
                } else {
                    result[`${newKey}[${index}]`] = item;
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }
    return result;
};

export const convertToExcel = (
    formData: Record<string, any>,
    fileName: string = "form_data.xlsx"
) => {
    const workbook = XLSX.utils.book_new();
    const flatData = flattenObject(formData);

    const sheetData = Object.entries(flatData).map(([key, value]) => {
        const readableKey = getReadableKeyName(key);
        let displayValue = String(value);

        if (key === "photo") {
            displayValue = value ? "Present" : "Not Present";
        }

        return [readableKey, displayValue];
    });

    sheetData.unshift(["Key", "Value"]); // Add headers

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Apply bold style to keys (column A)
    const boldStyle = { font: { bold: true } };
    const range = XLSX.utils.decode_range(worksheet['!ref']!);

    for (let row = range.s.r + 1; row <= range.e.r; row++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 }); // Column A
        if (worksheet[cellAddress]) {
            worksheet[cellAddress].s = boldStyle;
        }
    }

    // Also bold the header row
    worksheet['A1'].s = boldStyle;
    worksheet['B1'].s = boldStyle;

    // Enable styles
    const workbookWithStyles: XLSX.WorkBook = {
        ...workbook,
        Sheets: {
            ...workbook.Sheets,
            "Form Data": worksheet
        }
    };

    XLSX.utils.book_append_sheet(workbookWithStyles, worksheet, "Form Data");

    const excelBuffer = XLSX.write(workbookWithStyles, {
        bookType: "xlsx",
        type: "array",
        cellStyles: true,
    });

    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
};
