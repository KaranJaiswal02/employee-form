const readableMap: Record<string, string> = {
    name: "Full Name",
    employeeCode: "Employee Code",
    category: "Category",
    address: "Address",
    email: "Email",
    pan: "PAN Number",
    bankName: "Bank Name",
    branchPlace: "Branch Place",
    branchCity: "Branch City",
    pincode: "Pincode",
    accountType: "Account Type",
    accountNumber: "Account Number",
    ifscCode: "IFSC Code",
    ifsc: "IFSC Code",
    place: "Place",
    date: "Submission Date",
    noticedate: "Notice Date",
    sex: "Gender",
    religion: "Religion",
    marriagestatus: "Marital Status",
    maritalStatus: "Marital Status",
    department: "Department",
    post: "Post",
    designation: "Designation",
    dateofappointment: "Appointment Date",
    dateOfJoining: "Date of Joining",
    dob: "Date of Birth",
    building: "Building Name",
    village: "Village",
    thana: "Thana",
    subdivision: "Subdivision",
    postoffice: "Post Office",
    district: "District",
    state: "State",
    witness1name: "Witness 1 Name",
    witness2name: "Witness 2 Name",
    fatherName: "Father's Name",
    fatherDob: "Father's Date of Birth",
    motherName: "Mother's Name",
    motherDob: "Mother's Date of Birth",
    currAddress: "Current Address",
    currcontactNumber: "Current Contact Number",
    currstdcode: "Current STD Code",
    empcode: "Employee Code",
    empNo: "Employee Number",
    mobileNumber: "Mobile Number",
    photo: "Photograph",
    year: "Year",
    perAddress: "Permanent Address",
    perDistrict: "Permanent District",
    perState: "Permanent State",
    perPincode: "Permanent Pincode",
    perstdcode: "Permanent STD Code",
    percontactNumber: "Permanent Contact Number",
    companyName: "Company Name",
    companyAddress: "Company Address",
    companylocation: "Company Location",
    eCode: "Employee Code",
    pfNo: "PF Number",
    function: "Function/Role",
    level: "Level",
    nationality: "Nationality",
    anniversaryDate: "Anniversary Date",
    spouseName: "Spouse Name",
    spouseDob: "Spouse DOB",
    spouseBloodGroup: "Spouse Blood Group",
    spouseEducation: "Spouse Education",
    spouseWorking: "Spouse Working",
    emergencyContactName: "Emergency Contact Name",
    emergencyContactPhone: "Emergency Contact Phone",
    emergencyContactRelationship: "Emergency Contact Relationship",
    gratuityNominee1Name: "Gratuity Nominee 1 Name",
    gratuityNominee1Percent: "Gratuity Nominee 1 % Share",
    gratuityNominee2Name: "Gratuity Nominee 2 Name",
    gratuityNominee2Percent: "Gratuity Nominee 2 % Share",
    pfNominee1Name: "PF Nominee 1 Name",
    pfNominee1Percent: "PF Nominee 1 % Share",
    pfNominee2Name: "PF Nominee 2 Name",
    pfNominee2Percent: "PF Nominee 2 % Share",
    pfNominee3Name: "PF Nominee 3 Name",
    pfNominee3Percent: "PF Nominee 3 % Share",
    hasNoFamily: "Has No Family?",
    hasDependentParents: "Has Dependent Parents?",
    education: "Education",
    employment: "Employment",
    games: "Games",
    ncc: "NCC Participation",
    hobbies: "Hobbies",
    knowsSomeone: "Knows Someone in Company?",
    convictionDetails: "Conviction Details",
    code: "Employee Code",
    grade: "Grade",
    familyMemberName: "Family Member Name",
    familyMemberOccupation: "Family Member Occupation",
    familyAddress: "Family Address",
    establishmentAddress: "Establishment Address",
    establishmentDetails: "Establishment Details",
    firstName: "First Name",
    middleName: "Middle Name",
    surname: "Surname",
    age: "Age",
    subscriberDate: "Subscriber Date",
    employerDate: "Employer Date",
    contactnumber: "Contact Number",
};

const arrayKeyLabelReplacements: Record<string, string> = {
    "nominee": "Nominee",
    "nominees": "Nominee",
    "credit_nominees": "Credit Nominee",
    "familyMembers": "Family Member",
    "children": "Child",
    "pension_nominee": "Pension Nominee",
    "references": "Reference",
    "members": "Member",
    "education": "Education Entry",
    "employment": "Employment Entry",
};

export const getReadableKeyName = (key: string): string => {
    if (readableMap[key]) return readableMap[key];

    const arrayKeyMatch = key.match(/^([a-zA-Z_]+)\[(\d+)](?:\.(\w+))?/);
    const objectKeyMatch = key.match(/^([a-zA-Z_]+)\.(\w+)$/);

    if (arrayKeyMatch) {
        const [, baseKey, index, subKey] = arrayKeyMatch;
        const label = arrayKeyLabelReplacements[baseKey] || baseKey;
        return `${label} ${+index + 1}${subKey ? ` - ${subKey[0].toUpperCase() + subKey.slice(1)}` : ''}`;
    }

    if (objectKeyMatch) {
        const [, baseKey, subKey] = objectKeyMatch;
        const label = arrayKeyLabelReplacements[baseKey] || baseKey;
        return `${label} - ${subKey[0].toUpperCase() + subKey.slice(1)}`;
    }

    return key
        .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase -> camel Case
        .replace(/_/g, ' ')                 // snake_case -> snake case
        .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize
};
