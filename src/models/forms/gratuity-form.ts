// models/GratuityForm.ts
import mongoose, { Schema, Document, model, models} from 'mongoose';

interface Nominee {
  name: string;
  relationship: string;
  age: number | null;
  proportion: number | null;
}

export interface IGratuityForm extends Document {
  name: string;
  noticedate: string;
  nominee: Nominee[];
  sex: string;
  religion: string;
  marriagestatus: string;
  department: string;
  post: string;
  dateofappointment: string;
  building: string;
  village: string;
  thana: string;
  subdivision: string;
  postoffice: string;
  district: string;
  state: string;
  place: string;
  date: string;
  witness1name: string;
  witness2name: string;
}

const NomineeSchema: Schema = new Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  age: { type: Number, default: null },
  proportion: { type: Number, default: null },
});

const GratuityFormSchema: Schema = new Schema({
  name: { type: String, required: true },
  noticedate: { type: String, required: true },
  nominee: { type: [NomineeSchema], required: true },
  sex: { type: String, required: true },
  religion: { type: String, required: true },
  marriagestatus: { type: String, required: true },
  department: { type: String, required: true },
  post: { type: String, required: true },
  dateofappointment: { type: String, required: true },
  building: { type: String, required: true },
  village: { type: String, required: true },
  thana: { type: String, required: true },
  subdivision: { type: String, required: true },
  postoffice: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  witness1name: { type: String, required: true },
  witness2name: { type: String, required: true },
});

const IGratuityFormModel =
  models.GratuityForm || mongoose.model<IGratuityForm>('GratuityForm', GratuityFormSchema);

export default IGratuityFormModel;
