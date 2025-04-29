import { Schema, Document, model, models } from 'mongoose';

export interface BankMandateFormData extends Document {
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
  date: Date;
}

const BankMandateFormDataSchema: Schema = new Schema({
  name: { type: String, required: false },
  employeeCode: { type: String, required: false },
  category: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: false },
  pan: { type: String, required: false },
  bankName: { type: String, required: false },
  branchPlace: { type: String, required: false },
  branchCity: { type: String, required: false },
  pincode: { type: String, required: false },
  accountType: { type: String, required: false },
  accountNumber: { type: String, required: false },
  ifscCode: { type: String, required: false },
  place: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

const IbankMandateDataModel = models.BankMandateFormData || model<BankMandateFormData>('BankMandateFormData', BankMandateFormDataSchema);
export default IbankMandateDataModel