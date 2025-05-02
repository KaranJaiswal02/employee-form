import { Schema, model, models, Document, Types } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role?: string;
    staffJoiningForm?: Types.ObjectId;
    idCardForm?: Types.ObjectId;
    familyDetailsForm?: Types.ObjectId;
    bankMandateForm?: Types.ObjectId;
    nominationForm1?: Types.ObjectId;
    gratuityForm?: Types.ObjectId;
    nominationForm2?: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        staffJoiningForm: { type: Schema.Types.ObjectId, ref: 'EmpFormData' },
        idCardForm: { type: Schema.Types.ObjectId, ref: 'IdCardFormData' },
        familyDetailsForm: { type: Schema.Types.ObjectId, ref: 'StaffFamilyFormData' },
        bankMandateForm: { type: Schema.Types.ObjectId, ref: 'BankMandateFormData' },
        nominationForm1: { type: Schema.Types.ObjectId, ref: 'NominationForm1' },
        gratuityForm: { type: Schema.Types.ObjectId, ref: 'GratuityForm' },
        nominationForm2: { type: Schema.Types.ObjectId, ref: 'NominationForm2' },
    },
    {
        timestamps: true,
    }
);

export const User = models.User || model<IUser>('User', userSchema);
