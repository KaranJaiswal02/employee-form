import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/user';
import { signJwt } from '@/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';
import IAPIResponse from '@/types/responseType';
import { comparePassword } from '@/lib/bcrypt';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (!email || !password) {
        const response: IAPIResponse = {
            success: false,
            message: 'Missing required fields',
            errors: ['Both email and password must be provided.'],
        };
        return NextResponse.json(response, { status: 400 });
    }

    try {
        await dbConnect();

        const user = await User.findOne({ email });

        if (!user || !(await comparePassword(password, user.password))) {
            const response: IAPIResponse = {
                success: false,
                message: 'Authentication failed',
                errors: ['The email or password you entered is incorrect.'],
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
                role : user.role,
                id : user._id,
                name: user.name,
                email: user.email,
            },
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error('[Signin Error]', error);

        const response: IAPIResponse = {
            success: false,
            message: 'Unexpected error occurred',
            errors: ['An error occurred while processing your request. Please try again later.'],
        };

        return NextResponse.json(response, { status: 500 });
    }
}
