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
  name: { type: String, required: false },
  noticedate: { type: String, required: false },
  nominee: { type: [NomineeSchema], required: false },
  sex: { type: String, required: false },
  religion: { type: String, required: false },
  marriagestatus: { type: String, required: false },
  department: { type: String, required: false },
  post: { type: String, required: false },
  dateofappointment: { type: String, required: false },
  building: { type: String, required: false },
  village: { type: String, required: false },
  thana: { type: String, required: false },
  subdivision: { type: String, required: false },
  postoffice: { type: String, required: false },
  district: { type: String, required: false },
  state: { type: String, required: false },
  place: { type: String, required: false },
  date: { type: String, required: false },
  witness1name: { type: String, required: false },
  witness2name: { type: String, required: false },
});

const IGratuityFormModel = models.GratuityForm || mongoose.model<IGratuityForm>('GratuityForm', GratuityFormSchema);

export default IGratuityFormModel;
