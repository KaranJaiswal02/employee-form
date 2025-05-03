import { Document, Schema, Types, model, models } from "mongoose";

export interface IdCardFormData {
  userId?: Types.ObjectId;
  name: string;
  fatherName: string;
  designation: string;
  dob: Date | string;
  currAddress: string;
  empcode: string;
  department: string;
  bloodGroup: string;
  dateOfJoining: string;
  contactnumber: string;
  photo: string | null;
  year: string;
}

const idCardFormDataSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: false },
    fatherName: { type: String, required: false },
    designation: { type: String, required: false },
    dob: { type: Date, required: false },
    currAddress: { type: String, required: false },
    empcode: { type: String, required: false },
    department: { type: String, required: false },
    bloodGroup: { type: String, required: false },
    dateOfJoining: { type: String, required: false },
    contactnumber: { type: String, required: false },
    photo: { type: String, default: null },
    year: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

interface IdCardFormDataDocument extends Document, IdCardFormData {}

const IdCardFormDataModel = models.IdCardFormData || model<IdCardFormDataDocument>('IdCardFormData', idCardFormDataSchema);

export default IdCardFormDataModel;
