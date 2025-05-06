import { Schema, Document, model, models, Types } from "mongoose";

interface Reference {
    name: string;
    address: string;
    phone: string;
}

interface FamilyMember {
    name: string;
    relationship: string;
    dob: string| Date;
    age: string;
}

interface Nominee {
    name: string;
    relationship: string;
    dob: string| Date;
    percentage: string;
}

interface Member {
    name: string;
    relationship: string;
    dob: string| Date;
    age: string;
    amount: string;
}

export interface IEmpFormData {
    userId?: Types.ObjectId;
    name: string;
    fatherName: string;
    designation: string;
    dob: string | Date;
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
    dateOfJoining: string| Date;
    currstdcode: string;
    currcontactNumber: string;
    perstdcode: string;
    percontactNumber: string;
    companylocation: string;
    date: string| Date;
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
    anniversaryDate: string| Date;
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
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    dob: { type:  Date, required: true},
    age: { type: String, required:true },
});

const NomineeSchema = new Schema<Nominee>({
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    dob: { type: Date, required: true },
    percentage: { type: String, required: true },
});

const MemberSchema = new Schema<Member>({
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    dob: { type: Date, required:    true },
    age: { type: String, required:  true },
    amount: { type: String, required: true },
});

const EmpFormDataSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    designation: { type: String, required:true },
    dob: { type: Date, required: true },
    currAddress: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    perAddress: { type: String, required: true },
    perDistrict: { type: String, required: true },
    perState: { type: String, required: true },
    perPincode: { type: String, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: false },
    department: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true

     },
    ifsc: { type: String, required: false },
    dateOfJoining: { type: Date, required: false },
    currstdcode: { type: String, required: true },
    currcontactNumber: { type: String, required: true },
    perstdcode: { type: String, required: false },
    percontactNumber: { type: String, required: true },
    companylocation: { type: String, required: true },
    date: { type: Date, required: true },
    eCode: { type: String, required: false },
    pfNo: { type: String, required: false },
    function: { type: String, required: false },
    level: { type: String, required: false },
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    surname: { type: String, required: true },
    familyMemberName: { type: String, required: false },
    familyMemberOccupation: { type: String, required: false },
    sex: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    nationality: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    spouseName: { type: String, required: false },
    spouseDob: { type: Date, required: false },
    anniversaryDate: { type: Date, required: false },
    spouseBloodGroup: { type: String, required: false },
    spouseEducation: { type: String, required: false },
    spouseWorking: { type: String, required: false },
    emergencyContactName: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
    emergencyContactRelationship: { type: String, required: true },
    gratuityNominee1Percent: { type: String, required: true },
    gratuityNominee1Name: { type: String, required: true },
    gratuityNominee2Percent: { type: String, required: false },
    gratuityNominee2Name: { type: String, required: false },
    pfNominee1Percent: { type: String, required: true },
    pfNominee1Name: { type: String, required: true },
    pfNominee2Percent: { type: String, required: false },
    pfNominee2Name: { type: String, required: false },
    pfNominee3Percent: { type: String, required: false },
    pfNominee3Name: { type: String, required: false },
    education: {
        type: [[String]],
        required: true,
        default: Array.from({ length: 5 }, () => Array(6).fill(""))
    },
    employment: {
        type: [[String]],
        required: false,
        default: Array.from({ length: 4 }, () => Array(6).fill(""))
    },
    games: { type: String, required: true },
    ncc: { type: String, required: true },
    hobbies: { type: String, required: true },
    knowsSomeone: { type: String, required: false },
    references: {
        type: [ReferenceSchema],
        required: false,
        default: []
    },
    convictionDetails: { type: String, required: true },
    place: { type: String, required: true },
    familyMembers: {
        type: [FamilyMemberSchema],
        required: true,
        default: []
    },
    nominees: {
        type: [NomineeSchema],
        required: true,
        default: []
    },
    code: { type: String, required: false },
    grade: { type: String, required: false },
    members: {
        type: [MemberSchema],
        required: true,
        default: []
    },
},
    {
        timestamps: true,
    });

interface EmpFormDataDocument extends Document, IEmpFormData {}

const EmpJoinForm = models.EmpFormData || model<EmpFormDataDocument>("EmpFormData", EmpFormDataSchema);
export default EmpJoinForm;