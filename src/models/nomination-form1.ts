import { Schema, model, Document } from 'mongoose';

// Interface for Nominee
interface INominee {
  name: string;
  address: string;
  relationship: string;
  dob: string;
  share: string;
  guardian: string;
}

// Interface for the main document
interface INominationForm1 extends Document {
  name: string;
  fathersName: string;
  dob: string;
  sex: string;
  maritalStatus: string;
  permanentAddress: string;
  currentAddress: string;
  nominees: INominee[];
  place: string;
  date: string;
  establishmentAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Nominee subdocument schema
const nomineeSchema = new Schema<INominee>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  relationship: { type: String, required: true },
  dob: { type: String, required: true },
  share: { type: String, required: true },
  guardian: { type: String, required: false } // Optional if nominee is not minor
});

// Main schema
const nominationForm1Schema = new Schema<INominationForm1>({
  name: { type: String, required: true },
  fathersName: { type: String, required: true },
  dob: { type: String, required: true },
  sex: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  maritalStatus: { 
    type: String, 
    required: true,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'] 
  },
  permanentAddress: { type: String, required: true },
  currentAddress: { type: String, required: true },
  nominees: [nomineeSchema],
  place: { type: String, required: true },
  date: { type: String, required: true, default: new Date().toISOString().split('T')[0] },
  establishmentAddress: { type: String, required: true }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create and export the model
export const NominationForm1 = model<INominationForm1>('NominationForm1', nominationForm1Schema);