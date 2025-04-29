// import mongoose, { Schema, Document, models } from "mongoose";

// export interface INominee {
//     name: string;
//     address: string;
//     relationship: string;
//     dob: Date;
//     share: string;
//     guardianName?: string;
//     guardianAddress?: string;
// }

// export interface IFamilyMember {
//     name: string;
//     address: string;
//     age: string;
//     relationship: string;
// }

// export interface IEPFNominationForm extends Document {
//     name: string;
//     fathersName: string;
//     surname: string;
//     dob: Date;
//     accountNo: string;
//     sex: "MALE" | "FEMALE";
//     maritalStatus: string;
//     address: string;
//     hasNoFamily: boolean;
//     hasDependentParents: boolean;
//     nominees: INominee[];
//     familyMembers: IFamilyMember[];
// }

// const NomineeSchema = new Schema<INominee>({
//     name: { type: String, required: true, trim: true },
//     address: { type: String, required: true, trim: true },
//     relationship: { type: String, required: true, trim: true },
//     dob: { type: Date, required: true },
//     share: { type: String, required: true },
//     guardianName: { type: String, trim: true },
//     guardianAddress: { type: String, trim: true },
// });

// const FamilyMemberSchema = new Schema<IFamilyMember>({
//     name: { type: String, required: true, trim: true },
//     address: { type: String, required: true, trim: true },
//     age: { type: String, required: true },
//     relationship: { type: String, required: true, trim: true },
// });

// const EPFNominationFormSchema: Schema = new Schema<IEPFNominationForm>({
//     name: { type: String, required: true, trim: true },
//     fathersName: { type: String, required: true, trim: true },
//     surname: { type: String, required: true, trim: true },
//     dob: { type: Date, required: true },
//     accountNo: { type: String, required: true, trim: true },
//     sex: { type: String, enum: ["MALE", "FEMALE"], required: true },
//     maritalStatus: { type: String, required: true, trim: true },
//     address: { type: String, required: true, trim: true },
//     hasNoFamily: { type: Boolean, default: false },
//     hasDependentParents: { type: Boolean, default: false },
//     nominees: { type: [NomineeSchema], default: [] },
//     familyMembers: { type: [FamilyMemberSchema], default: [] },
// }, {
//     timestamps: true,
// });

// const EPFModel = models.EPFNominationForm || mongoose.model<IEPFNominationForm>("EPFNominationForm", EPFNominationFormSchema);
// export default EPFModel;

// //page2


// export interface IWidowPensionNominee {
//     name: string;
//     address: string;
//     dob: Date;
//     relationship: string;
// }

// export interface IEPFNominationPart2Form extends Document {
//     hasNoFamily: boolean;
//     nominee: IWidowPensionNominee;
//     subscriberDate: Date;
//     employerName: string;
//     employerDate: Date;
//     establishmentDetails: string;
// }

// const WidowPensionNomineeSchema = new Schema<IWidowPensionNominee>({
//     name: { type: String, required: true, trim: true },
//     address: { type: String, required: true, trim: true },
//     dob: { type: Date, required: true },
//     relationship: { type: String, required: true, trim: true },
// });

// const EPFNominationPart2FormSchema: Schema = new Schema<IEPFNominationPart2Form>({
//     hasNoFamily: { type: Boolean, default: false },
//     nominee: { type: WidowPensionNomineeSchema, required: true },
//     subscriberDate: { type: Date, required: true },
//     employerName: { type: String, required: true, trim: true },
//     employerDate: { type: Date, required: true },
//     establishmentDetails: { type: String, required: true, trim: true },
// }, {
//     timestamps: true,
// });

// const EPFNominationPart2Model =
//     models.EPFNominationPart2Form || mongoose.model<IEPFNominationPart2Form>("EPFNominationPart2Form", EPFNominationPart2FormSchema);

// export default EPFNominationPart2Model;


import mongoose, { Schema, Document, models } from "mongoose";

// Nominee for Page 1
export interface INominee {
    name: string;
    address: string;
    relationship: string;
    dob: Date;
    share: string;
    guardianName?: string;
    guardianAddress?: string;
}

// Family Member for Page 1
export interface IFamilyMember {
    name: string;
    address: string;
    age: string;
    relationship: string;
}

// Widow Pension Nominee for Page 2
export interface IWidowPensionNominee {
    name: string;
    address: string;
    dob: Date;
    relationship: string;
}

// Final merged model
export interface IMergedEPFNominationForm extends Document {
    // Page 1
    name: string;
    fathersName: string;
    surname: string;
    dob: Date;
    accountNo: string;
    sex: "MALE" | "FEMALE";
    maritalStatus: string;
    address: string;
    hasNoFamily: boolean;
    hasDependentParents: boolean;
    nominees: INominee[];
    familyMembers: IFamilyMember[];

    // Page 2
    widowPensionNominee: IWidowPensionNominee;
    subscriberDate: Date;
    employerName: string;
    employerDate: Date;
    establishmentDetails: string;
}

// Subschemas
const NomineeSchema = new Schema<INominee>({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    relationship: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    share: { type: String, required: true },
    guardianName: { type: String, trim: true },
    guardianAddress: { type: String, trim: true },
});

const FamilyMemberSchema = new Schema<IFamilyMember>({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    age: { type: String, required: true },
    relationship: { type: String, required: true, trim: true },
});

const WidowPensionNomineeSchema = new Schema<IWidowPensionNominee>({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    relationship: { type: String, required: true, trim: true },
});

// Final merged schema
const MergedEPFNominationFormSchema = new Schema<IMergedEPFNominationForm>({
    name: { type: String, required: true, trim: true },
    fathersName: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    accountNo: { type: String, required: true, trim: true },
    sex: { type: String, enum: ["MALE", "FEMALE"], required: true },
    maritalStatus: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    hasNoFamily: { type: Boolean, default: false },
    hasDependentParents: { type: Boolean, default: false },
    nominees: { type: [NomineeSchema], default: [] },
    familyMembers: { type: [FamilyMemberSchema], default: [] },

    widowPensionNominee: { type: WidowPensionNomineeSchema, required: true },
    subscriberDate: { type: Date, required: true },
    employerName: { type: String, required: true, trim: true },
    employerDate: { type: Date, required: true },
    establishmentDetails: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});

const MergedEPFModel = models.MergedEPFNominationForm || mongoose.model<IMergedEPFNominationForm>(
    "MergedEPFNominationForm",
    MergedEPFNominationFormSchema
);

export default MergedEPFModel;


