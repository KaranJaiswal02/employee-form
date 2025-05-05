import mongoose, { Schema, Document, model, models, Types } from 'mongoose';

interface Child {
  name: string;
  gender: string;
  dob: string| Date;
}

export interface StaffFamilyFormData {
  userId?: Types.ObjectId;
  empNo: string;
  name: string;
  department: string;
  dob: string| Date;
  age: number;
  maritalStatus: string;
  spouseName: string;
  spouseDob: string|  Date;
  numOfChildren: string;
  children: Child[];
  fatherName: string;
  fatherDob: string| Date;
  motherName: string;
  motherDob: string| Date;
  mobileNumber: string;
  familyAddress: string;
  date: Date | string;
}

const ChildSchema: Schema = new Schema({
  name: { type: String, required: false, default: '' },
  gender: { type: String, required: false, default: '' },
  dob: { type: Date, required: false, default: '' },
});

const StaffFamilyFormDataSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  empNo: { type: String, required: false },
  name: { type: String, required: true },
  department: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  maritalStatus: { type: String, required: true },
  spouseName: { type: String, required: false },
  spouseDob: { type: Date, required: false },
  numOfChildren: { type: String, required: false },
  children: { type: [ChildSchema], default: [] },
  fatherName: { type: String, required: true },
  fatherDob: { type: Date, required: true },
  motherName: { type: String, required: true },
  motherDob: { type: Date, required: true },
  mobileNumber: { type: String, required: true },
  familyAddress: { type: String, required: true },
  date: { type: Date, default: Date.now },
},
  {
    timestamps: true,
  });

interface StaffFamilyFormDataDocument extends Document, StaffFamilyFormData {}

const IempFamilyDataModel = models.StaffFamilyFormData || model<StaffFamilyFormDataDocument>('StaffFamilyFormData', StaffFamilyFormDataSchema);
export default IempFamilyDataModel;
