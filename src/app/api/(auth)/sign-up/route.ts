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

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const response: IAPIResponse = {
                success: false,
                message: 'User already exists',
                errors: ['Email is already registered'],
            };
            return NextResponse.json(response, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        const token = signJwt({ id: newUser._id ,role : newUser.role}, '7d');

        const response: IAPIResponse = {
            success: true,
            message: 'User created successfully',
            errors: [],
            data: {
                token,
            },
        };
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('[Signup Error]', error);

        const response: IAPIResponse = {
            success: false,
            message: 'Internal Server Error',
            errors: ['An error occurred while creating the user'],
        };
        return NextResponse.json(response, { status: 500 });
    }
}
