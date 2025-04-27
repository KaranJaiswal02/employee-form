import mongoose, { Schema, Document, models } from "mongoose";

export interface IIdCardForm extends Document {
  name: string;
  empcode: string;
  department: string;
  designation: string;
  dob: Date;
  dateOfJoining: Date;
  bloodGroup: string;
  fatherName: string;
  photo: string | null; // file path or base64
  currAddress: string;
  contactnumber: string;
  signature: string;
}

const IdCardFormSchema: Schema = new Schema<IIdCardForm>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  empcode: {
    type: String,
    required: [true, "Employee code is required"],
    trim: true,
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
    trim: true,
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
  dateOfJoining: {
    type: Date,
    required: [true, "Date of Joining is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    required: [true, "Blood group is required"],
  },
  fatherName: {
    type: String,
    required: [true, "Father's Name is required"],
    trim: true,
  },
  photo: {
    type: String,
    default: null, // could be base64 or stored file path
  },
  currAddress: {
    type: String,
    required: [true, "Current address is required"],
    trim: true,
  },
  contactnumber: {
    type: String,
    required: [true, "Contact number is required"],
    match: [/^[6-9][0-9]{9}$/, "Invalid contact number"],
  },
  signature: {
    type: String,
    required: [true, "Signature is required"],
  },
}, {
  timestamps: true,
});

const IdCardModel = models.IdCardForm || mongoose.model<IIdCardForm>("IdCardForm", IdCardFormSchema);
export default IdCardModel;
