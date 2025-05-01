import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/user/user';
import IAPIResponse from '@/types/responseType';
import { signJwt } from '@/lib/jwt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IAPIResponse>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed',
            errors: ['Only POST method is allowed'],
        });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: ['Email and password are required'],
        });
    }

    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
                errors: ['An account with this email already exists'],
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        const token = signJwt({ id: newUser._id });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            errors: [],
            data: {
                token,
            },
        });
    } catch (error) {
        console.error('[Signup Error]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            errors: ['Something went wrong during signup'],
        });
    }
}
