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
  name: { type: String, required: false },
  address: { type: String, required: false },
  relationship: { type: String, required: false },
  dob: { type: String, required: false },
  share: { type: String, required: false },
  guardianName: { type: String, required: false },
  guardianAddress: { type: String, required: false }
});

const FamilyMemberSchema = new Schema<FamilyMember>({
  name: { type: String, required: false },
  address: { type: String, required: false },
  age: { type: String, required: false },
  relationship: { type: String, required: false }
});

const SingleNomineeSchema = new Schema<SingleNominee>({
  name: { type: String, required: false },
  address: { type: String, required: false },
  dob: { type: String, required: false },
  relationship: { type: String, required: false }
});

const NominationForm2Schema = new Schema<INominationForm2>({
  name: { type: String, required: false },
  fathersName: { type: String, required: false },
  surname: { type: String, required: false },
  dob: { type: String, required: false },
  accountNo: { type: String, required: false },
  sex: { type: String, required: false },
  maritalStatus: { type: String, required: false },
  address: { type: String, required: false },
  hasNoFamily: { type: Boolean, required: false },
  hasDependentParents: { type: Boolean, required: false },
  nominees: { type: [NomineeSchema], required: false },
  familyMembers: { type: [FamilyMemberSchema], required: false },
  nominee: { type: SingleNomineeSchema, required: false },
  subscriberDate: { type: String, required: false },
  employerName: { type: String, required: false },
  employerDate: { type: String, required: false },
  establishmentDetails: { type: String, required: false },
  place: { type: String, required: false },
  certificationDate: { type: String, required: false }
});

export default mongoose.model<INominationForm2>('NominationForm2', NominationForm2Schema);
