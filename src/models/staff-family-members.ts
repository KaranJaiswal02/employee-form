import mongoose, { Schema, Document, model, models } from 'mongoose';

interface Child {
  name: string;
  gender: string;
  dob: string;
}

export interface StaffFamilyFormData extends Document {
  empNo: string;
  name: string;
  department: string;
  dob: string;
  age: number;
  maritalStatus: string;
  spouseName: string;
  spouseDob: string;
  numOfChildren: string;
  children: Child[];
  fatherName: string;
  fatherDob: string;
  motherName: string;
  motherDob: string;
  mobileNumber: string;
  address: string;
  date: Date;
}

const ChildSchema: Schema = new Schema({
  name: { type: String, required: false, default: '' },
  gender: { type: String, required: false, default: '' },
  dob: { type: String, required: false, default: '' },
});

const StaffFamilyFormDataSchema: Schema = new Schema({
  empNo: { type: String, required: false },
  name: { type: String, required: false },
  department: { type: String, required: false },
  dob: { type: String, required: false },
  age: { type: Number, required: false },
  maritalStatus: { type: String, required: false },
  spouseName: { type: String, required: false },
  spouseDob: { type: String, required: false },
  numOfChildren: { type: String, required: false },
  children: { type: [ChildSchema], default: [] },
  fatherName: { type: String, required: false },
  fatherDob: { type: String, required: false },
  motherName: { type: String, required: false },
  motherDob: { type: String, required: false },
  mobileNumber: { type: String, required: false },
  address: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

const IempFamilyDataModel = models.StaffFamilyFormData || model<StaffFamilyFormData>('StaffFamilyFormData', StaffFamilyFormDataSchema);
export default IempFamilyDataModel;
