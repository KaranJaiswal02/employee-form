import { Schema, Document, model, models } from 'mongoose';

interface Nominee {
  name: string;
  address: string;
  relationship: string;
  dob: string;
  share: string;
  guardian: string;
}

export interface NominationForm1Document extends Document {
  name: string;
  fathersName: string;
  dob: string;
  sex: string;
  maritalStatus: string;
  permanentAddress: string;
  currentAddress: string;
  nominees: Nominee[];
  place: string;
  date: string;
  establishmentAddress: string;
}

const NomineeSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  relationship: { type: String, required: true },
  dob: { type: String, required: true },
  share: { type: String, required: true },
  guardian: { type: String, required: true },
});

const NominationForm1Schema: Schema = new Schema({
  name: { type: String, required: true },
  fathersName: { type: String, required: true },
  dob: { type: String, required: true },
  sex: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  currentAddress: { type: String, required: true },
  nominees: { type: [NomineeSchema], required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  establishmentAddress: { type: String, required: true },
});

const NominationForm1DataModel = models.NominationForm1 || model<NominationForm1Document>('NominationForm1', NominationForm1Schema);
export default NominationForm1DataModel