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
  name: { type: String, required: false },
  address: { type: String, required: false },
  relationship: { type: String, required: false },
  dob: { type: String, required: false },
  share: { type: String, required: false },
  guardian: { type: String, required: false },
});

const NominationForm1Schema: Schema = new Schema({
  name: { type: String, required: false },
  fathersName: { type: String, required: false },
  dob: { type: String, required: false },
  sex: { type: String, required: false },
  maritalStatus: { type: String, required: false },
  permanentAddress: { type: String, required: false },
  currentAddress: { type: String, required: false },
  nominees: { type: [NomineeSchema], required: false },
  place: { type: String, required: false },
  date: { type: String, required: false },
  establishmentAddress: { type: String, required: false },
});

const NominationForm1DataModel = models.NominationForm1 || model<NominationForm1Document>('NominationForm1', NominationForm1Schema);
export default NominationForm1DataModel