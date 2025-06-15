import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/user';
import { signJwt } from '@/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';
import IAPIResponse from '@/types/responseType';
import { hashPassword } from '@/lib/bcrypt';

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
        const response: IAPIResponse = {
            success: false,
            message: 'Missing required fields',
            errors: ['Email, password, and name are required'],
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

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = signJwt({ id: newUser._id, role: newUser.role }, '7d');

        const response: IAPIResponse = {
            success: true,
            message: 'User created successfully',
            errors: [],
            data: {
                token,
                user: {
                    role: newUser.role,
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
        };
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.log('[Signup Error]', error);

        const response: IAPIResponse = {
            success: false,
            message: 'Internal Server Error',
            errors: ['An error occurred while creating the user'],
        };
        return NextResponse.json(response, { status: 500 });
    }
}
