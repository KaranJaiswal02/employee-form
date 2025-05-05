import { Schema, Document, model, models, Types } from 'mongoose';

interface Nominee {
  name: string;
  address: string;
  relationship: string;
  dob: string| Date;
  share: string;
  guardian: string;
}

export interface NominationForm1Model {
  userId?: Types.ObjectId;
  name: string;
  fatherName: string;
  dob: string| Date;
  sex: string;
  maritalStatus: string;
  perAddress: string;
  currAddress: string;
  nominees: Nominee[];
  place: string;
  date: string| Date;
  establishmentAddress: string;
}

const NomineeSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  relationship: { type: String, required: true },
  dob: { type: Date, required: true },
  share: { type: String, required: true },
  guardian: { type: String, required: true },
});

const NominationForm1Schema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: Date, required: true },
  sex: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  perAddress: { type: String, required: true },
  currAddress: { type: String, required: true },
  nominees: { type: [NomineeSchema], required: true },
  place: { type: String, required: false },
  date: { type: Date, required: false },
  establishmentAddress: { type: String, required: false },
  // above 3 are the fields that have predefined values in the form and are not user input fields. 
},
  {
    timestamps: true,
  });

interface NominationForm1Document extends Document, NominationForm1Model {}
  
const NominationForm1DataModel = models.NominationForm1 || model<NominationForm1Document>('NominationForm1', NominationForm1Schema);
export default NominationForm1DataModel