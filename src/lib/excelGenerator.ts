import * as XLSX from 'xlsx';

// Define the type for the data
type Data = { [key: string]: string | number | Date | Array<object> | object };

// Function to convert JS Object to Excel File (returns a Blob)
function convertToExcel(data: Data): Blob {
    const wb = XLSX.utils.book_new(); // Create a new workbook

    // Iterate over the object to create sheets
    Object.keys(data).forEach((key) => {
        const value = data[key];

        // If value is an array of objects, convert it to a worksheet
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            const worksheet = XLSX.utils.json_to_sheet(value);
            XLSX.utils.book_append_sheet(wb, worksheet, key);
        }
        // If value is an object (but not an array), handle it like an array of objects
        else if (typeof value === 'object') {
            const objectArray = [value]; // Wrap the object in an array
            const worksheet = XLSX.utils.json_to_sheet(objectArray);
            XLSX.utils.book_append_sheet(wb, worksheet, key);
        }
        // If it's a simple value (string, number, date), create a worksheet with a single cell
        else {
            const worksheet = XLSX.utils.aoa_to_sheet([[value]]);
            XLSX.utils.book_append_sheet(wb, worksheet, key);
        }
    });

    // Write the workbook to a binary string
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Convert the binary string to a buffer
    const buffer = new ArrayBuffer(excelFile.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelFile.length; i++) {
        view[i] = excelFile.charCodeAt(i) & 0xff;
    }
    
    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    // Return the Blob representing the Excel file
    return blob;
}

// Example usage:
const data = {
    userInfo: { name: 'John Doe', age: 30, joined: new Date('2021-07-15') },
    orders: [
        { orderId: 1, date: new Date('2022-02-01'), amount: 100 },
        { orderId: 2, date: new Date('2022-02-05'), amount: 150 },
    ],
};

const excelBlob = convertToExcel(data);

// The `excelBlob` can now be used, for example, to trigger a download
