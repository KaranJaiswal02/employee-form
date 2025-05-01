import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/user/user';
import { signJwt } from '@/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';
import IAPIResponse from '@/types/responseType';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (!email || !password) {
        const response: IAPIResponse = {
            success: false,
            message: 'Validation Error',
            errors: ['Email and password are required'],
        };
        return NextResponse.json(response, { status: 400 });
    }

    try {
        await dbConnect();

        const user = await User.findOne({ email })
            .populate('idCardForm')
            .populate('familyDetailsForm')
            .populate('bankMandateForm')
            .populate('nominationForm1')
            .populate('gratuityForm')
            .populate('nominationForm2');

        if (!user) {
            const response: IAPIResponse = {
                success: false,
                message: 'Invalid Credentials',
                errors: ['Email or password is incorrect'],
            };
            return NextResponse.json(response, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const response: IAPIResponse = {
                success: false,
                message: 'Invalid Credentials',
                errors: ['Email or password is incorrect'],
            };
            return NextResponse.json(response, { status: 401 });
        }

        const token = signJwt({ id: user._id, role: user.role }, '7d');

        const response: IAPIResponse = {
            success: true,
            message: 'Signed in successfully',
            errors: [],
            data: {
                token,
                email: user.email,
                forms: {
                    idCardForm: user.idCardForm,
                    familyDetailsForm: user.familyDetailsForm,
                    bankMandateForm: user.bankMandateForm,
                    nominationForm1: user.nominationForm1,
                    gratuityForm: user.gratuityForm,
                    nominationForm2: user.nominationForm2,
                },
            },
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error('[Signin Error]', error);

        const response: IAPIResponse = {
            success: false,
            message: 'Internal Server Error',
            errors: ['Something went wrong during signin'],
        };

        return NextResponse.json(response, { status: 500 });
    }
}
