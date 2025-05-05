// models/GratuityForm.ts
import mongoose, { Schema, Document, model, models, Types } from 'mongoose';

interface Nominee {
  name: string;
  relationship: string;
  age: number | null;
  proportion: number | null;
}

export interface IGratuityForm {
  userId?: Types.ObjectId;
  name: string;
  noticedate: string| Date;
  nominee: Nominee[];
  sex: string;
  religion: string;
  marriagestatus: string;
  department: string;
  post: string;
  dateofappointment: string| Date;
  building: string;
  village: string;
  thana: string;
  subdivision: string;
  postoffice: string;
  district: string;
  state: string;
  place: string;
  date: string| Date;
  witness1name: string;
  witness2name: string;
  establishmentAddress: string;
  
}

const NomineeSchema: Schema = new Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  age: { type: Number, default: null, required: true},
  proportion: { type: Number, default: null, required: true },
});

const GratuityFormSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  noticedate: { type: Date, required: false },
  nominee: { type: [NomineeSchema], required: true },
  sex: { type: String, required: true },
  religion: { type: String, required: true },
  marriagestatus: { type: String, required: true },
  department: { type: String, required: true },
  post: { type: String, required: false },
  dateofappointment: { type: Date, required: true },
  building: { type: String, required: true },
  village: { type: String, required: false },
  thana: { type: String, required: true },
  subdivision: { type: String, required: false },
  postoffice: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Date, required: true },
  witness1name: { type: String, required: false },
  witness2name: { type: String, required: false },
  establishmentAddress: { type: String, required: true },
});

interface IGratuityFormModelDocument extends Document, IGratuityForm {}

const IGratuityFormModel = models.GratuityForm || mongoose.model<IGratuityFormModelDocument>('GratuityForm', GratuityFormSchema);

export default IGratuityFormModel;
