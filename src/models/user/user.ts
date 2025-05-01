import { Schema, model, models, Document, Types } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
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
        staffJoiningForm: { type: Schema.Types.ObjectId, ref: 'EmpFormData' },
        idCardForm: { type: Schema.Types.ObjectId, ref: 'IdCardFormData' },
        familyDetailsForm: { type: Schema.Types.ObjectId, ref: 'StaffFamilyFormData' },
        bankMandateForm: { type: Schema.Types.ObjectId, ref: 'BankMandateFormData' },
        nominationForm1: { type: Schema.Types.ObjectId, ref: 'NominationForm1' },
        gratuityForm: { type: Schema.Types.ObjectId, ref: 'GratuityForm' },
        nominationForm2: { type: Schema.Types.ObjectId, ref: 'NominationForm2' },
    }
);

export const User = models.User || model<IUser>('User', userSchema);
