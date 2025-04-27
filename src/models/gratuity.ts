// //page1

// // Define the Nominee interface
// export interface INominee {
//   name: string;
//   relationship: string;
//   age: number;
//   proportion: number;
// }

// // Define the GratuityForm interface
// export interface IGratuityForm extends Document {
//   name: string;
//   noticedate: Date;
//   nominee: INominee[];
// }

// const NomineeSchema: Schema = new Schema<INominee>({
//   name: { type: String, required: true },
//   relationship: { type: String, required: true },
//   age: { type: Number, required: true },
//   proportion: { type: Number, required: true },
// });

// const GratuityFormSchema: Schema = new Schema<IGratuityForm>({
//   name: { type: String, required: true },
//   noticedate: { type: Date, required: true },
//   nominee: { type: [NomineeSchema], required: true },
// }, {
//   timestamps: true,
// });

// const GratuityFormModel =
//   models.GratuityForm || mongoose.model<IGratuityForm>("GratuityForm", GratuityFormSchema);

// //page2


// // Define the GratuityForm2 interface
// export interface IGratuityForm2 extends Document {
//   name: string;
//   sex: string;
//   religion: string;
//   marriagestatus: string;
//   department: string;
//   post: string;
//   dateofappointment: Date;
//   village: string;
//   thana: string;
//   subdivision: string;
//   postoffice: string;
//   district: string;
//   state: string;
//   place: string;
//   currdate: Date;
//   witness1name: string;
//   witness2name: string;
//   employerReferenceNo: string;
//   employerSignature: string;
//   establishmentName: string;
//   acknowledgementDate: Date;
// }

// const GratuityForm2Schema: Schema = new Schema<IGratuityForm2>({
//   name: { type: String, required: true },
//   sex: { type: String, required: true },
//   religion: { type: String, required: true },
//   marriagestatus: { type: String, required: true },
//   department: { type: String, required: true },
//   post: { type: String, required: true },
//   dateofappointment: { type: Date, required: true },
//   village: { type: String, required: true },
//   thana: { type: String, required: true },
//   subdivision: { type: String, required: true },
//   postoffice: { type: String, required: true },
//   district: { type: String, required: true },
//   state: { type: String, required: true },
//   place: { type: String, required: true },
//   currdate: { type: Date, required: true },
//   witness1name: { type: String, required: true },
//   witness2name: { type: String, required: true },
//   employerReferenceNo: { type: String, required: false },
//   employerSignature: { type: String, required: true },
//   establishmentName: { type: String, required: true },
//   acknowledgementDate: { type: Date, required: true },
// }, {
//   timestamps: true,
// });

// const GratuityForm2Model =
//   models.GratuityForm2 || mongoose.model<IGratuityForm2>("GratuityForm2", GratuityForm2Schema);

// export default GratuityFormModel;





import mongoose, { Schema, Document, models } from "mongoose";

// Define the Nominee interface
export interface INominee {
  name: string;
  relationship: string;
  age: number;
  proportion: number;
}
// Define the Nominee interface
export interface INominee {
  name: string;
  relationship: string;
  age: number;
  proportion: number;
}

// Define the merged GratuityForm interface
export interface IMergedGratuityForm extends Document {
  // Personal Information (from GratuityForm2)
  name: string;
  sex: string;
  religion: string;
  marriagestatus: string;
  department: string;
  post: string;
  dateofappointment: Date;
  village: string;
  thana: string;
  subdivision: string;
  postoffice: string;
  district: string;
  state: string;
  place: string;
  currdate: Date;
  witness1name: string;
  witness2name: string;
  employerReferenceNo: string;
  employerSignature: string;
  establishmentName: string;
  acknowledgementDate: Date;

  // Nominee Information (from GratuityForm)
  noticedate: Date;
  nominee: INominee[];
}

const NomineeSchema: Schema = new Schema<INominee>({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  age: { type: Number, required: true },
  proportion: { type: Number, required: true },
});

// Define the merged GratuityForm schema
const MergedGratuityFormSchema: Schema = new Schema<IMergedGratuityForm>({
  // Personal Information (from GratuityForm2)
  name: { type: String, required: true },
  sex: { type: String, required: true },
  religion: { type: String, required: true },
  marriagestatus: { type: String, required: true },
  department: { type: String, required: true },
  post: { type: String, required: true },
  dateofappointment: { type: Date, required: true },
  village: { type: String, required: true },
  thana: { type: String, required: true },
  subdivision: { type: String, required: true },
  postoffice: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  place: { type: String, required: true },
  currdate: { type: Date, required: true },
  witness1name: { type: String, required: true },
  witness2name: { type: String, required: true },
  employerReferenceNo: { type: String, required: false },
  employerSignature: { type: String, required: true },
  establishmentName: { type: String, required: true },
  acknowledgementDate: { type: Date, required: true },

  // Nominee Information (from GratuityForm)
  noticedate: { type: Date, required: true },
  nominee: { type: [NomineeSchema], required: true },
}, {
  timestamps: true,
});

const MergedGratuityFormModel =
  models.MergedGratuityForm || mongoose.model<IMergedGratuityForm>("MergedGratuityForm", MergedGratuityFormSchema);

export default MergedGratuityFormModel;
