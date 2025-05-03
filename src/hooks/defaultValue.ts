import { BankMandateFormData } from "@/models/forms/bank-mandate";
import { IGratuityForm } from "@/models/forms/gratuity-form";
import { IdCardFormData } from "@/models/forms/idcard-form";
import { NominationForm1Model } from "@/models/forms/nomination-form1";
import { NominationForm2Model } from "@/models/forms/nomination-form2";
import { StaffFamilyFormData } from "@/models/forms/staff-family-members";
import { IEmpFormData } from "@/models/forms/staffjoin_form";

const currentDate = new Date().toISOString().split('T')[0];

export const DefaultEmpFormData: IEmpFormData = {
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
    currstdcode: "",
    currcontactNumber: "",
    perstdcode: "",
    percontactNumber: "",
    companylocation: "",
    date: currentDate,
    eCode: '',
    pfNo: '',
    function: '',
    level: '',
    firstName: '',
    middleName: '',
    surname: '',
    familyMemberName: '',
    familyMemberOccupation: '',
    sex: '',
    bloodGroup: '',
    nationality: '',
    maritalStatus: '',
    spouseName: '',
    spouseDob: '',
    anniversaryDate: '',
    spouseBloodGroup: '',
    spouseEducation: '',
    spouseWorking: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    gratuityNominee1Percent: '',
    gratuityNominee1Name: '',
    gratuityNominee2Percent: '',
    gratuityNominee2Name: '',
    pfNominee1Percent: '',
    pfNominee1Name: '',
    pfNominee2Percent: '',
    pfNominee2Name: '',
    pfNominee3Percent: '',
    pfNominee3Name: '',
    education: Array.from({ length: 1 }, () => Array(6).fill("")),
    employment: Array.from({ length: 1 }, () => Array(6).fill("")),
    games: "",
    ncc: "",
    hobbies: "",
    knowsSomeone: "",
    references: [
        { name: "", address: "", phone: "" },
        { name: "", address: "", phone: "" }
    ],
    convictionDetails: "",
    place: "",
    familyMembers: [{ name: "", relationship: "", dob: "", age: "" }],
    nominees: [{ name: "", relationship: "", dob: "", percentage: "" }],
    code: "",
    grade: "",
    members: [
        {
            name: "",
            relationship: "SELF",
            dob: "",
            age: "",
            amount: "",
        },
    ],
}

export const DefaultGrauFormData: IGratuityForm = {
    name: "",
    noticedate: "",
    nominee: [
        {
            name: "",
            relationship: "",
            age: null,
            proportion: null,
        },
    ],
    sex: "",
    religion: "",
    marriagestatus: "",
    department: "",
    post: "",
    dateofappointment: "",
    building: "",
    village: "",
    thana: "",
    subdivision: "",
    postoffice: "",
    district: "",
    state: "",
    place: "Bengaluru",
    date: currentDate,
    witness1name: "",
    witness2name: "",
    establishmentAddress: "SL AP Private Limited\n Brigade Opus, 4th Floor\n Municipal No. 70/401, Survey No. 44/1 and 44/4 Kodigehalli Main Road, Hebbal,\n Bengaluru Urban, Karnataka 560092",
}

export const DefaultNominationForm1Data: NominationForm1Model = {
    name: "",
    fatherName: "",
    dob: "",
    sex: "",
    maritalStatus: "",
    perAddress: "",
    currAddress: "",
    nominees: [
        { name: "", address: "", relationship: "", dob: "", share: "", guardian: "" },
    ],
    place: "Bengaluru",
    date: currentDate,
    establishmentAddress: "SL AP Private Limited\n Brigade Opus, 4th Floor\n Municipal No. 70/401, Survey No. 44/1 and 44/4 Kodigehalli Main Road, Hebbal,\n Bengaluru Urban, Karnataka 560092"
};

export const DefaultNominationForm2Data: NominationForm2Model = {
    name: '',
    firstName: '',
    middleName: '',
    surname: '',
    fatherName: '',
    dob: '',
    accountNumber: '',
    sex: '',
    maritalStatus: '',
    address: '',
    hasNoFamily: false,
    hasDependentParents: false,
    credit_nominees: [
        { name: '', address: '', relationship: '', dob: '', share: '', guardianName: '', guardianAddress: '' },
    ],
    familyMembers: [
        { name: '', address: '', age: '', relationship: '' },
    ],
    pension_nominee: {
        name: '',
        address: '',
        dob: '',
        relationship: ''
    },
    subscriberDate: currentDate,
    employerDate: currentDate,
    establishmentDetails: "SL AP Private Limited\n Brigade Opus, 4th Floor\n Municipal No. 70/401, Survey No. 44/1 and 44/4 Kodigehalli Main Road, Hebbal,\n Bengaluru Urban, Karnataka 560092",
    place: 'Bengaluru',
    date: currentDate,
}

export const DefaultBankMandateFormData: BankMandateFormData = {
    name: '',
    employeeCode: '',
    category: '',
    address: '',
    email: '',
    pan: '',
    bankName: '',
    branchPlace: '',
    branchCity: '',
    pincode: '',
    accountType: '',
    accountNumber: '',
    ifscCode: '',
    place: 'Bengaluru',
    date: currentDate
}

export const DefaultIdCardFormData: IdCardFormData = {
    name: "",
    fatherName: "",
    designation: "",
    dob: "",
    currAddress: "",
    empcode: "",
    department: "",
    bloodGroup: "",
    dateOfJoining: "",
    contactnumber: "",
    photo: null as string | null,
    year: new Date().getFullYear().toString(),
}

export const DefaultStaffFamilyFormData: StaffFamilyFormData = {
    empNo: '',
    name: '',
    department: '',
    dob: '',
    age: 0,
    maritalStatus: '',
    spouseName: '',
    spouseDob: '',
    numOfChildren: '',
    children: [
        { name: '', gender: '', dob: '' },
        { name: '', gender: '', dob: '' }
    ],
    fatherName: '',
    fatherDob: '',
    motherName: '',
    motherDob: '',
    mobileNumber: '',
    familyAddress: '',
    date: currentDate
}

export const DefaultFormStatusus = {
    staff_joining: {
        name: "Staff Joining Form",
        url: "/staff-joining",
        status: "pending",
    },
    id_card: {
        name: "ID Card Form",
        url: "/idcard-form",
        status: "pending",
    },
    staff_family_members: {
        name: "Family Members Details",
        url: "/staff-family-members",
        status: "pending",
    },
    bank_mandate: {
        name: "Bank Mandate Form",
        url: "/bank-mandate",
        status: "pending",
    },
    nomination_declaration_form1: {
        name: "Form 1 Nomination & declaration",
        url: "/nomination-declaration-form1",
        status: "pending",
    },
    gratuity_form: {
        name: "Gratuity Form",
        url: "/gratuity-form",
        status: "pending",
    },
    nomination_declaration_form2: {
        name: "Form 2 Nomination & declaration",
        url: "/nomination-declaration-form2",
        status: "pending",
    },
}