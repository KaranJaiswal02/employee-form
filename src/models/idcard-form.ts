import { Document, Schema, model, models } from "mongoose";

export interface IdCardFormData extends Document {
  name: string;
  fatherName: string;
  designation: string;
  dob: string;
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
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    designation: { type: String, required: true },
    dob: { type: String, required: true },
    currAddress: { type: String, required: true },
    empcode: { type: String, required: true },
    department: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    dateOfJoining: { type: String, required: true },
    contactnumber: { type: String, required: true },
    photo: { type: String, default: null },
    year: { type: String, required: true },
  }
);

const IdCardFormDataModel = models.IdCardFormData || model<IdCardFormData>('IdCardFormData', idCardFormDataSchema);

export default IdCardFormDataModel;
