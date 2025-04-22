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

export const grauFormData = atom({
  name: "",
  noticedate: "",
  nominee: [
    {
      name: "",
      relationship: "",
      age: 0,
      proportion: 0,
    },
    {
      name: "",
      relationship: "",
      age: 0,
      proportion: 0,
    },
    {
      name: "",
      relationship: "",
      age: 0,
      proportion: 0,
    }
  ],
  sex: "",
  religion: "",
  marriagestatus: "",
  department: "",
  post: "",
  dateofappointment: "",
  village: "",
  thana: "",
  subdivision: "",
  postoffice: "",
  district: "",
  state: "",
  place: "",
  date: "",
  witness1name: "",
  witness2name: "",
  currdate: "",
})

export const nominationFormData = atom({
  name: '',
  fathersName: '',
  surname: '',
  dob: '',
  accountNo: '',
  sex: '',
  maritalStatus: '',
  address: '',
  hasNoFamily: false,
  hasDependentParents: false,
  nominees: [{
    name: '',
    address: '',
    relationship: '',
    dob: '',
    share: '',
    guardianName: '',
    guardianAddress: ''
  }],
  familyMembers: [{
    name: '',
    address: '',
    age: '',
    relationship: ''
  }],

  nominee: {
    name: '',
    address: '',
    dob: '',
    relationship: ''
  },
  subscriberDate: '',
  employerName: '',
  employerDate: '',
  establishmentDetails: '',
  place: '',
  certificationDate: ''
});

export const bankMandateFormData = atom({
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
  place: '',
  date: '',
})

export const idCardFormData = atom({
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
  signature: "",
})

export const staffFamilyFormData = atom({
  empNo: '',
  empName: '',
  department: '',
  dob: '',
  age: '',
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
  address: '',
  date: ''
})