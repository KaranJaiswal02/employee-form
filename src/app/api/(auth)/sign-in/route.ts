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

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials',
                errors: ['Email or password is incorrect'],
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials',
                errors: ['Email or password is incorrect'],
            });
        }

        const token = signJwt({ id: user._id });

        return res.status(200).json({
            success: true,
            message: 'Signed in successfully',
            errors: [],
            data: {
                token,
                userId: user._id,
            },
        });
    } catch (error) {
        console.error('[Signin Error]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            errors: ['Something went wrong during signin'],
        });
    }
}