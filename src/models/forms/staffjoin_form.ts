import mongoose, { Schema, Document, model, models, Types } from "mongoose";

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

export interface IEmpFormData {
    userId?: Types.ObjectId;
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
    name: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
});

const FamilyMemberSchema = new Schema<FamilyMember>({
    name: { type: String, required: false },
    relationship: { type: String, required: false },
    dob: { type: String, required: false },
    age: { type: String, required: false },
});

const NomineeSchema = new Schema<Nominee>({
    name: { type: String, required: false },
    relationship: { type: String, required: false },
    dob: { type: String, required: false },
    percentage: { type: String, required: false },
});

const MemberSchema = new Schema<Member>({
    name: { type: String, required: false },
    relationship: { type: String, required: false },
    dob: { type: String, required: false },
    age: { type: String, required: false },
    amount: { type: String, required: false },
});

const EmpFormDataSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: false },
    fatherName: { type: String, required: false },
    designation: { type: String, required: false },
    dob: { type: String, required: false },
    currAddress: { type: String, required: false },
    district: { type: String, required: false },
    state: { type: String, required: false },
    pincode: { type: String, required: false },
    perAddress: { type: String, required: false },
    perDistrict: { type: String, required: false },
    perState: { type: String, required: false },
    perPincode: { type: String, required: false },
    companyName: { type: String, required: false },
    companyAddress: { type: String, required: false },
    department: { type: String, required: false },
    bankName: { type: String, required: false },
    accountNumber: { type: String, required: false },
    ifsc: { type: String, required: false },
    dateOfJoining: { type: String, required: false },
    currstdcode: { type: String, required: false },
    currcontactNumber: { type: String, required: false },
    perstdcode: { type: String, required: false },
    percontactNumber: { type: String, required: false },
    companylocation: { type: String, required: false },
    date: { type: String, required: false },
    eCode: { type: String, required: false },
    pfNo: { type: String, required: false },
    function: { type: String, required: false },
    level: { type: String, required: false },
    firstName: { type: String, required: false },
    middleName: { type: String, required: false },
    surname: { type: String, required: false },
    familyMemberName: { type: String, required: false },
    familyMemberOccupation: { type: String, required: false },
    sex: { type: String, required: false },
    bloodGroup: { type: String, required: false },
    nationality: { type: String, required: false },
    maritalStatus: { type: String, required: false },
    spouseName: { type: String, required: false },
    spouseDob: { type: String, required: false },
    anniversaryDate: { type: String, required: false },
    spouseBloodGroup: { type: String, required: false },
    spouseEducation: { type: String, required: false },
    spouseWorking: { type: String, required: false },
    emergencyContactName: { type: String, required: false },
    emergencyContactPhone: { type: String, required: false },
    emergencyContactRelationship: { type: String, required: false },
    gratuityNominee1Percent: { type: String, required: false },
    gratuityNominee1Name: { type: String, required: false },
    gratuityNominee2Percent: { type: String, required: false },
    gratuityNominee2Name: { type: String, required: false },
    pfNominee1Percent: { type: String, required: false },
    pfNominee1Name: { type: String, required: false },
    pfNominee2Percent: { type: String, required: false },
    pfNominee2Name: { type: String, required: false },
    pfNominee3Percent: { type: String, required: false },
    pfNominee3Name: { type: String, required: false },
    education: {
        type: [[String]],
        required: false,
        default: Array.from({ length: 5 }, () => Array(6).fill(""))
    },
    employment: {
        type: [[String]],
        required: false,
        default: Array.from({ length: 4 }, () => Array(6).fill(""))
    },
    games: { type: String, required: false },
    ncc: { type: String, required: false },
    hobbies: { type: String, required: false },
    knowsSomeone: { type: String, required: false },
    references: {
        type: [ReferenceSchema],
        required: false,
        default: []
    },
    convictionDetails: { type: String, required: false },
    place: { type: String, required: false },
    familyMembers: {
        type: [FamilyMemberSchema],
        required: false,
        default: []
    },
    nominees: {
        type: [NomineeSchema],
        required: false,
        default: []
    },
    code: { type: String, required: false },
    grade: { type: String, required: false },
    members: {
        type: [MemberSchema],
        required: false,
        default: []
    },
},
    {
        timestamps: true,
    });

interface EmpFormDataDocument extends Document, IEmpFormData {}

const EmpJoinForm = models.EmpFormData || model<EmpFormDataDocument>("EmpFormData", EmpFormDataSchema);
export default EmpJoinForm;