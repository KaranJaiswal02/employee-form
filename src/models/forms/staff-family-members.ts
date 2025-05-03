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
  name: { type: String, required: false },
  department: { type: String, required: false },
  dob: { type: Date, required: false },
  age: { type: Number, required: false },
  maritalStatus: { type: String, required: false },
  spouseName: { type: String, required: false },
  spouseDob: { type: Date, required: false },
  numOfChildren: { type: String, required: false },
  children: { type: [ChildSchema], default: [] },
  fatherName: { type: String, required: false },
  fatherDob: { type: Date, required: false },
  motherName: { type: String, required: false },
  motherDob: { type: Date, required: false },
  mobileNumber: { type: String, required: false },
  familyAddress: { type: String, required: false },
  date: { type: Date, default: Date.now },
},
  {
    timestamps: true,
  });

interface StaffFamilyFormDataDocument extends Document, StaffFamilyFormData {}

const IempFamilyDataModel = models.StaffFamilyFormData || model<StaffFamilyFormDataDocument>('StaffFamilyFormData', StaffFamilyFormDataSchema);
export default IempFamilyDataModel;
