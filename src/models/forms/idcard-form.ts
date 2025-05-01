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
    name: { type: String, required: false },
    fatherName: { type: String, required: false },
    designation: { type: String, required: false },
    dob: { type: String, required: false },
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

const IdCardFormDataModel = models.IdCardFormData || model<IdCardFormData>('IdCardFormData', idCardFormDataSchema);

export default IdCardFormDataModel;
