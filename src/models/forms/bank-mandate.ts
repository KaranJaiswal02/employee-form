import { Schema, Document, model, models, Types } from 'mongoose';

export interface BankMandateFormData {
  userId?: Types.ObjectId;
  name: string;
  employeeCode: string;
  category: string;
  address: string;
  email: string;
  pan: string;
  bankName: string;
  branchPlace: string;
  branchCity: string;
  pincode: string;
  accountType: string;
  accountNumber: string;
  ifscCode: string;
  place: string;
  date: Date | string;
}

const BankMandateFormDataSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  employeeCode: { type: String, required: false },
  category: { type: String, required: false },
  address: { type: String, required: true },
  email: { type: String, required: true },
  pan: { type: String, required: true },
  bankName: { type: String, required: true },
  branchPlace: { type: String, required: true },
  branchCity: { type: String, required: true },
  pincode: { type: String, required: true },
  accountType: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Date, default: Date.now },
},
  {
    timestamps: true,
  });

interface BankMandateFormDataDocument extends Document, BankMandateFormData {}

const IbankMandateDataModel = models.BankMandateFormData || model<BankMandateFormDataDocument>('BankMandateFormData', BankMandateFormDataSchema);
export default IbankMandateDataModel