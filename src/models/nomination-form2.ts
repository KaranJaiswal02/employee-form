import mongoose, { Schema, Document } from 'mongoose';

interface Nominee {
  name: string;
  address: string;
  relationship: string;
  dob: string;
  share: string;
  guardianName: string;
  guardianAddress: string;
}

interface FamilyMember {
  name: string;
  address: string;
  age: string;
  relationship: string;
}

interface SingleNominee {
  name: string;
  address: string;
  dob: string;
  relationship: string;
}

export interface INominationForm2 extends Document {
  name: string;
  fathersName: string;
  surname: string;
  dob: string;
  accountNo: string;
  sex: string;
  maritalStatus: string;
  address: string;
  hasNoFamily: boolean;
  hasDependentParents: boolean;
  nominees: Nominee[];
  familyMembers: FamilyMember[];
  nominee: SingleNominee;
  subscriberDate: string;
  employerName: string;
  employerDate: string;
  establishmentDetails: string;
  place: string;
  certificationDate: string;
}

const NomineeSchema = new Schema<Nominee>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  relationship: { type: String, required: true },
  dob: { type: String, required: true },
  share: { type: String, required: true },
  guardianName: { type: String, required: false },
  guardianAddress: { type: String, required: false }
});

const FamilyMemberSchema = new Schema<FamilyMember>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: String, required: true },
  relationship: { type: String, required: true }
});

const SingleNomineeSchema = new Schema<SingleNominee>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: String, required: true },
  relationship: { type: String, required: true }
});

const NominationForm2Schema = new Schema<INominationForm2>({
  name: { type: String, required: true },
  fathersName: { type: String, required: true },
  surname: { type: String, required: true },
  dob: { type: String, required: true },
  accountNo: { type: String, required: true },
  sex: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  address: { type: String, required: true },
  hasNoFamily: { type: Boolean, required: true },
  hasDependentParents: { type: Boolean, required: true },
  nominees: { type: [NomineeSchema], required: true },
  familyMembers: { type: [FamilyMemberSchema], required: true },
  nominee: { type: SingleNomineeSchema, required: true },
  subscriberDate: { type: String, required: true },
  employerName: { type: String, required: true },
  employerDate: { type: String, required: true },
  establishmentDetails: { type: String, required: true },
  place: { type: String, required: true },
  certificationDate: { type: String, required: true }
});

export default mongoose.model<INominationForm2>('NominationForm2', NominationForm2Schema);
