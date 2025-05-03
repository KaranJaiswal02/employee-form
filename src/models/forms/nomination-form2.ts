import { Schema, Document, model, models, Types } from 'mongoose';

interface CreditNominee {
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

interface PensionNominee {
  name: string;
  address: string;
  dob: string;
  relationship: string;
}

export interface NominationForm2Model  {
  userId?: Types.ObjectId;
  name: string;
  firstName: string;
  middleName: string;
  surname: string;
  fatherName: string;
  dob: string;
  accountNumber: string;
  sex: string;
  maritalStatus: string;
  address: string;
  hasNoFamily: boolean;
  hasDependentParents: boolean;
  credit_nominees: CreditNominee[];
  familyMembers: FamilyMember[];
  pension_nominee: PensionNominee;
  subscriberDate: Date | string;
  employerDate: Date | string;
  establishmentDetails: string;
  place: string;
  date: Date | string;
}

const CreditNomineeSchema = new Schema<CreditNominee>({
  name: { type: String, required: false },
  address: { type: String, required: false },
  relationship: { type: String, required: false },
  dob: { type: String, required: false },
  share: { type: String, required: false },
  guardianName: { type: String, required: false },
  guardianAddress: { type: String, required: false },
});

const FamilyMemberSchema = new Schema<FamilyMember>({
  name: { type: String, required: false },
  address: { type: String, required: false },
  age: { type: String, required: false },
  relationship: { type: String, required: false },
});

const PensionNomineeSchema = new Schema<PensionNominee>({
  name: { type: String, required: false },
  address: { type: String, required: false },
  dob: { type: String, required: false },
  relationship: { type: String, required: false },
});

const NominationForm2Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: false },
  firstName: { type: String, required: false },
  middleName: { type: String, required: false },
  surname: { type: String, required: false },
  fatherName: { type: String, required: false },
  dob: { type: String, required: false },
  accountNumber: { type: String, required: false },
  sex: { type: String, required: false },
  maritalStatus: { type: String, required: false },
  address: { type: String, required: false },
  hasNoFamily: { type: Boolean, required: false },
  hasDependentParents: { type: Boolean, required: false },
  credit_nominees: { type: [CreditNomineeSchema], required: false },
  familyMembers: { type: [FamilyMemberSchema], required: false },
  pension_nominee: { type: PensionNomineeSchema, required: false },
  subscriberDate: { type: Date, required: false },
  employerDate: { type: Date, required: false },
  establishmentDetails: { type: String, required: false },
  place: { type: String, required: false },
  date: { type: Date, required: false },
},
  {
    timestamps: true,
  });

interface NominationForm2Document extends Document, NominationForm2Model {}

const NominationForm2DataModel = models.NominationForm2 || model<NominationForm2Document>('NominationForm2', NominationForm2Schema);
export default NominationForm2DataModel;