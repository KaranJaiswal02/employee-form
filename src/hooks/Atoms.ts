import { atom } from 'jotai';

export const empFormData = atom({
    name: "",
    fatherName: "",
    designation: "",
    dob: "",
    currAddress: "",
    district: "",
    state: "",
    pincode: "",
    perAddress: "",
    perDistrict: "",
    perState: "",
    perPincode: "",
    companyName: "",
    companyAddress: "",
    department: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    dateOfJoining: "",
    signature: null as string | ArrayBuffer | null,
})

export const decFormData = atom({
    
})