import mongoose, { Schema, Document, models } from "mongoose";

interface IChild {
  name: string;
  gender: "Male" | "Female";
  dob: Date;
}

export interface IMedicalInsuranceForm extends Document {
  empNo: string;
  empName: string;
  department: string;
  dob: Date;
  age: string;
  maritalStatus: string;
  spouseName?: string;
  spouseDob: Date;
  numOfChildren: string;
  children: IChild[];
  fatherName: string;
  fatherDob: Date;
  motherName: string;
  motherDob: Date;
  mobileNumber: string;
  address: string;
  date: Date;
}

const ChildSchema: Schema = new Schema<IChild>({
  name: {
    type: String,
    required: [true, "Child name is required"],
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: [true, "Child gender is required"],
  },
  dob: {
    type: Date,
    required: [true, "Child DOB is required"],
  },
});

const MedicalInsuranceFormSchema: Schema = new Schema<IMedicalInsuranceForm>(
  {
    empNo: {
      type: String,
      required: [true, "Employee number is required"],
      trim: true,
    },
    empName: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    age: {
      type: String,
      required: [true, "Age is required"],
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
    },
    spouseName: {
      type: String,
      trim: true,
    },
    spouseDob: {
      type: Date,
    },
    numOfChildren: {
      type: String,
    },
    children: {
      type: [ChildSchema],
      default: [],
    },
    fatherName: {
      type: String,
      trim: true,
    },
    fatherDob: {
      type: Date,
    },
    motherName: {
      type: String,
      trim: true,
    },
    motherDob: {
      type: Date,
    },
    mobileNumber: {
      type: String,
      trim: true,
      // match: [/^[0-9]{10}$/, "Invalid mobile number"],
    },
    address: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Form date is required"],
    },
  },
  {
    timestamps: true,
  }
);

const MedicalInsuranceModel = models.MedicalInsuranceForm || mongoose.model<IMedicalInsuranceForm>( "MedicalInsuranceForm", MedicalInsuranceFormSchema);

export default MedicalInsuranceModel;
