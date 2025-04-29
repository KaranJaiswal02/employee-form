import mongoose, { Schema, Document, models } from "mongoose";

// Define the Nominee interface
export interface INominee {
  name: string;
  address: string;
  relationship: string;
  dob: string;
  share: string;
  guardian: string;
}

// Define the Certification interface
export interface ICertification {
  personName: string;
  place: string;
  date: Date;
  factoryNameAndAddress: string;
  employerSignature: string;
}

// Define the DeclarationForm interface which combines both Nominee and Certification
export interface IDeclarationForm extends Document {
  personMakingNomination: string;
  fatherHusbandName: string;
  dob: Date;
  sex: "Male" | "Female" | "Other";
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  permanentAddress: string;
  temporaryAddress: string;
  nominees: INominee[];
  certification: ICertification;
}

const NomineeSchema: Schema = new Schema<INominee>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  relationship: { type: String, required: true },
  dob: { type: String, required: true },
  share: { type: String, required: true },
  guardian: { type: String, required: true },
});

const CertificationSchema: Schema = new Schema<ICertification>({
  personName: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Date, required: true },
  factoryNameAndAddress: { type: String, required: true },
  employerSignature: { type: String, required: true },
});

const DeclarationFormSchema: Schema = new Schema<IDeclarationForm>({
  personMakingNomination: { type: String, required: true },
  fatherHusbandName: { type: String, required: true },
  dob: { type: Date, required: true },
  sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
  maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], required: true },
  permanentAddress: { type: String, required: true },
  temporaryAddress: { type: String, required: true },
  nominees: { type: [NomineeSchema], required: true },
  certification: { type: CertificationSchema, required: true },
}, {
  timestamps: true,
});

const DeclarationFormModel =
  models.DeclarationForm || mongoose.model<IDeclarationForm>("DeclarationForm", DeclarationFormSchema);

export default DeclarationFormModel;





// import mongoose, { Schema, Document, models } from "mongoose";

// export interface INominee {
//   name: string;
//   address: string;
//   relationship: string;
//   dob: string;
//   share: string;
//   guardian: string;
// }

// export interface IDeclarationForm extends Document {
//   personMakingNomination: string;
//   fatherHusbandName: string;
//   dob: Date;
//   sex: "Male" | "Female" | "Other";
//   maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
//   permanentAddress: string;
//   temporaryAddress: string;
//   nominees: INominee[];
// }

// const NomineeSchema: Schema = new Schema<INominee>({
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   relationship: { type: String, required: true },
//   dob: { type: String, required: true },
//   share: { type: String, required: true },
//   guardian: { type: String, required: true },
// });

// const DeclarationFormSchema: Schema = new Schema<IDeclarationForm>({
//   personMakingNomination: { type: String, required: true },
//   fatherHusbandName: { type: String, required: true },
//   dob: { type: Date, required: true },
//   sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
//   maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], required: true },
//   permanentAddress: { type: String, required: true },
//   temporaryAddress: { type: String, required: true },
//   nominees: { type: [NomineeSchema], required: true },
// }, {
//   timestamps: true,
// });

// const DeclarationFormModel =
//   models.DeclarationForm || mongoose.model<IDeclarationForm>("DeclarationForm", DeclarationFormSchema);

// export default DeclarationFormModel;



// import mongoose, { Schema, Document, models } from "mongoose";

// export interface ICertification {
//   personName: string;
//   place: string;
//   date: Date;
//   factoryNameAndAddress: string;
//   employerSignature: string;
// }

// export interface IDeclarationForm extends Document {
//   certification: ICertification;
// }

// const CertificationSchema: Schema = new Schema<ICertification>({
//   personName: { type: String, required: true },
//   place: { type: String, required: true },
//   date: { type: Date, required: true },
//   factoryNameAndAddress: { type: String, required: true },
//   employerSignature: { type: String, required: true },
// });

// const DeclarationFormSchema: Schema = new Schema<IDeclarationForm>({
//   certification: { type: CertificationSchema, required: true },
// }, {
//   timestamps: true,
// });

// const DeclarationFormModel =
//   models.DeclarationForm || mongoose.model<IDeclarationForm>("DeclarationForm", DeclarationFormSchema);

// export default DeclarationFormModel;

