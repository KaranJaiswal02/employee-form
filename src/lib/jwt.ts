import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
import { AuthenticatedNextApiRequest } from '@/types/requestType';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

export const signJwt = (payload: object, expiresIn: string | number = '7d'): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
};

const withAuth = (handler: NextApiHandler) => {
    return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
                errors: ['No token provided'],
            });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
            req.userId = decoded.id;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
                errors: ['Invalid or expired token'],
            });
        }
    };
};

export default withAuth;
