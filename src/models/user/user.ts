import { Schema, model, models, Document, Types } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    form1?: Types.ObjectId;
    form2?: Types.ObjectId;
    form3?: Types.ObjectId;
    form4?: Types.ObjectId;
    form5?: Types.ObjectId;
    form6?: Types.ObjectId;
    form7?: Types.ObjectId;
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
        form1: { type: Schema.Types.ObjectId, ref: 'Form1' },
        form2: { type: Schema.Types.ObjectId, ref: 'Form2' },
        form3: { type: Schema.Types.ObjectId, ref: 'Form3' },
        form4: { type: Schema.Types.ObjectId, ref: 'Form4' },
        form5: { type: Schema.Types.ObjectId, ref: 'Form5' },
        form6: { type: Schema.Types.ObjectId, ref: 'Form6' },
        form7: { type: Schema.Types.ObjectId, ref: 'Form7' },
    }
);

export const User = models.User || model<IUser>('User', userSchema);
