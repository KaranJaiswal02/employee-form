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

        const user = await User.findOne({ email });
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

        const token = signJwt({ id: user._id });

        const response: IAPIResponse = {
            success: true,
            message: 'Signed in successfully',
            errors: [],
            data: {
                token,
                userId: user._id,
            },
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('[Signin Error]', error);

        let errorMessage = 'Internal Server Error';
        let statusCode = 500;

        if (error instanceof SyntaxError) {
            errorMessage = 'Invalid JSON format';
            statusCode = 400;
        }

        const response: IAPIResponse = {
            success: false,
            message: errorMessage,
            errors: ['Something went wrong during signin'],
        };
        return NextResponse.json(response, { status: statusCode });
    }
}
