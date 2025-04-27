import mongoose, { Schema, Document, model, models } from "mongoose";

interface Reference {
    name: string;
    address: string;
    phone: string;
}

interface FamilyMember {
    name: string;
    relationship: string;
    dob: string;
    age: string;
}

interface Nominee {
    name: string;
    relationship: string;
    dob: string;
    percentage: string;
}

interface Member {
    name: string;
    relationship: string;
    dob: string;
    age: string;
    amount: string;
}

export interface IEmpFormData extends Document {
    name: string;
    fatherName: string;
    designation: string;
    dob: string;
    currAddress: string;
    district: string;
    state: string;
    pincode: string;
    perAddress: string;
    perDistrict: string;
    perState: string;
    perPincode: string;
    companyName: string;
    companyAddress: string;
    department: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    dateOfJoining: string;
    currstdcode: string;
    currcontactNumber: string;
    perstdcode: string;
    percontactNumber: string;
    companylocation: string;
    date: string;
    eCode: string;
    pfNo: string;
    function: string;
    level: string;
    firstName: string;
    middleName: string;
    surname: string;
    familyMemberName: string;
    familyMemberOccupation: string;
    sex: string;
    bloodGroup: string;
    nationality: string;
    maritalStatus: string;
    spouseName: string;
    spouseDob: string;
    anniversaryDate: string;
    spouseBloodGroup: string;
    spouseEducation: string;
    spouseWorking: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelationship: string;
    gratuityNominee1Percent: string;
    gratuityNominee1Name: string;
    gratuityNominee2Percent: string;
    gratuityNominee2Name: string;
    pfNominee1Percent: string;
    pfNominee1Name: string;
    pfNominee2Percent: string;
    pfNominee2Name: string;
    pfNominee3Percent: string;
    pfNominee3Name: string;
    education: string[][];
    employment: string[][];
    games: string;
    ncc: string;
    hobbies: string;
    knowsSomeone: string;
    references: Reference[];
    convictionDetails: string;
    place: string;
    familyMembers: FamilyMember[];
    nominees: Nominee[];
    code: string;
    grade: string;
    members: Member[];
}

const ReferenceSchema = new Schema<Reference>({
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
});

const FamilyMemberSchema = new Schema<FamilyMember>({
    name: { type: String, default: "" },
    relationship: { type: String, default: "" },
    dob: { type: String, default: "" },
    age: { type: String, default: "" },
});

const NomineeSchema = new Schema<Nominee>({
    name: { type: String, default: "" },
    relationship: { type: String, default: "" },
    dob: { type: String, default: "" },
    percentage: { type: String, default: "" },
});

const MemberSchema = new Schema<Member>({
    name: { type: String, default: "" },
    relationship: { type: String, default: "SELF" },
    dob: { type: String, default: "" },
    age: { type: String, default: "" },
    amount: { type: String, default: "" },
});

const EmpFormDataSchema = new Schema<IEmpFormData>({
    name: String,
    fatherName: String,
    designation: String,
    dob: String,
    currAddress: String,
    district: String,
    state: String,
    pincode: String,
    perAddress: String,
    perDistrict: String,
    perState: String,
    perPincode: String,
    companyName: String,
    companyAddress: String,
    department: String,
    bankName: String,
    accountNumber: String,
    ifsc: String,
    dateOfJoining: String,
    currstdcode: String,
    currcontactNumber: String,
    perstdcode: String,
    percontactNumber: String,
    companylocation: String,
    date: String,
    eCode: String,
    pfNo: String,
    function: String,
    level: String,
    firstName: String,
    middleName: String,
    surname: String,
    familyMemberName: String,
    familyMemberOccupation: String,
    sex: String,
    bloodGroup: String,
    nationality: String,
    maritalStatus: String,
    spouseName: String,
    spouseDob: String,
    anniversaryDate: String,
    spouseBloodGroup: String,
    spouseEducation: String,
    spouseWorking: String,
    emergencyContactName: String,
    emergencyContactPhone: String,
    emergencyContactRelationship: String,
    gratuityNominee1Percent: String,
    gratuityNominee1Name: String,
    gratuityNominee2Percent: String,
    gratuityNominee2Name: String,
    pfNominee1Percent: String,
    pfNominee1Name: String,
    pfNominee2Percent: String,
    pfNominee2Name: String,
    pfNominee3Percent: String,
    pfNominee3Name: String,
    education: { type: [[String]], default: Array.from({ length: 5 }, () => Array(6).fill("")) },
    employment: { type: [[String]], default: Array.from({ length: 4 }, () => Array(6).fill("")) },
    games: String,
    ncc: String,
    hobbies: String,
    knowsSomeone: String,
    references: { type: [ReferenceSchema], default: [] },
    convictionDetails: String,
    place: String,
    familyMembers: { type: [FamilyMemberSchema], default: [] },
    nominees: { type: [NomineeSchema], default: [] },
    code: String,
    grade: String,
    members: { type: [MemberSchema], default: [] },
});

const EmpJoinForm = models.EmpFormData || model<IEmpFormData>("EmpFormData", EmpFormDataSchema); 
export default EmpJoinForm;