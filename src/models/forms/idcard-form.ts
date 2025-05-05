import { Document, Schema, Types, model, models } from "mongoose";
import { turborepoTraceAccess } from "next/dist/build/turborepo-access-trace";

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
  dateOfJoining: string| Date;
  contactnumber: string;
  photo: string | null;
  year: string;
}

const idCardFormDataSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    designation: { type: String, required: true },
    dob: { type: Date, required: true },
    currAddress: { type: String, required: true },
    empcode: { type: String, required: false },
    department: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    dateOfJoining: { type: String, required: true },
    contactnumber: { type: String, required: true },
    photo: { type: String, default: null , required: true },
    year: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

interface IdCardFormDataDocument extends Document, IdCardFormData {}

const IdCardFormDataModel = models.IdCardFormData || model<IdCardFormDataDocument>('IdCardFormData', idCardFormDataSchema);

export default IdCardFormDataModel;
