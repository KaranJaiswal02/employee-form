import mongoose, { Schema, Document, models } from "mongoose";

export interface IBankMandateForm extends Document {
  name: string;
  employeecode: string;
  category: string;
  address: string;
  email: string;
  pan: string;
  bankName: string;
  branchPlace: string;
  branchCity: string;
  pincode: string;
  accountType: "Savings" | "Current";
  accountNumber: string;
  ifscCode: string;
  place: string;
  date: Date; 
}

const BankMandateFormSchema: Schema = new Schema<IBankMandateForm>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    employeecode: {
      type: String,
      required: [true, "Employee Code is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    pan: {
      type: String,
      required: [true, "PAN is required"],
      trim: true,
    },
    bankName: {
      type: String,
      required: [true, "Bank Name is required"],
      trim: true,
    },
    branchPlace: {
      type: String,
      required: [true, "Branch Place is required"],
      trim: true,
    },
    branchCity: {
      type: String,
      required: [true, "Branch City is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      // match: [/^[0-9]{6}$/, "Invalid Pincode"],
    },
    accountType: {
      type: String,
      enum: ["Savings", "Current"],
      required: [true, "Account Type is required"],
    },
    accountNumber: {
      type: String,
      required: [true, "Account Number is required"],
      // match: [/^[0-9]{9,18}$/, "Invalid Account Number"],
    },
    ifscCode: {
      type: String,
      required: [true, "IFSC Code is required"],
      // match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"],
    },
    place: {
      type: String,
      required: [true, "Place is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      
    },
  },
  {
    timestamps: true,
  }
);

const BankMandateModel =
  models.BankMandateForm ||
  mongoose.model<IBankMandateForm>("BankMandateForm", BankMandateFormSchema);

export default BankMandateModel;
