import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

export const signJwt = (payload: object, expiresIn: string = '36000'): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
};

export const verifyJwt = async (token: string): Promise<{ id: string; role: string } | null> => {
    try {
        const secretKey = new TextEncoder().encode(JWT_SECRET!);
        const { payload } = await jwtVerify(token, secretKey);
        return payload as { id: string; role: string };
    } catch (error) {
        console.error('JWT verification error:', error);
        return null;
    }
}
