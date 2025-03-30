import mongoose, { Schema, Document, models } from "mongoose";

export interface IEmployeeJoinForm extends Document {
    name: string;
    fatherName: string;
    designation: string;
    dob: Date;
    currAddress: string;
    district: string;
    state: string;
    pincode: string;
    perAddress: string;
    perDistrict: string;
    perState: string;
    perPincode: string;
    companyName: string;
    companyAddress: string;
    department: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    dateOfJoining: Date;
    signature: string | null;
}

const EmployeeJoinFormSchema: Schema = new Schema<IEmployeeJoinForm>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        // match: [/^[a-zA-Z ]+$/, "Invalid Name"],
    },
    fatherName: {
        type: String,
        required: [true, "Father's Name is required"],
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
    currAddress: {
        type: String,
        required: [true, "Current Address is required"],
        trim: true,
    },
    district: {
        type: String,
        required: [true, "District is required"],
        trim: true,
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
    },
    pincode: {
        type: String,
        required: [true, "Pincode is required"],
        // match: [/^[0-9]{6}$/, "Invalid Pincode"],
    },
    perAddress: {
        type: String,
        required: [true, "Permanent Address is required"],
        trim: true,
    },
    perDistrict: {
        type: String,
        required: [true, "Permanent District is required"],
        trim: true,
    },
    perState: {
        type: String,
        required: [true, "Permanent State is required"],
        trim: true,
    },
    perPincode: {
        type: String,
        required: [true, "Permanent Pincode is required"],
        // match: [/^[0-9]{6}$/, "Invalid Permanent Pincode"],
    },
    companyName: {
        type: String,
        required: [true, "Company Name is required"],
        trim: true,
    },
    companyAddress: {
        type: String,
        required: [true, "Company Address is required"],
        trim: true,
    },
    department: {
        type: String,
        required: [true, "Department is required"],
        trim: true,
    },
    bankName: {
        type: String,
        required: [true, "Bank Name is required"],
        trim: true,
    },
    accountNumber: {
        type: String,
        required: [true, "Account Number is required"],
        // match: [/^[0-9]{9,18}$/, "Invalid Account Number"],
    },
    ifsc: {
        type: String,
        required: [true, "IFSC Code is required"],
        // match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"],
    },
    dateOfJoining: {
        type: Date,
        required: [true, "Date of Joining is required"],
    },
    signature: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

const EmpModel = models.EmployeeJoinForm || mongoose.model<IEmployeeJoinForm>("EmployeeJoinForm", EmployeeJoinFormSchema);
export default EmpModel;