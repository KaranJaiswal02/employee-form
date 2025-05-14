// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
    const protectedRoutes = ['/api/forms', '/api/user'];

    const { pathname } = req.nextUrl;

    // Only run on protected routes
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        const authHeader = req.headers.get('authorization');
        const token = authHeader ? authHeader.split(' ')[1] : null;
        if (!authHeader || !authHeader.startsWith('Bearer ') || !token || token==="null") {
            return NextResponse.json(
                { success: false, message: 'Unauthorized', errors: ['Missing or invalid token'] },
                { status: 401 }
            );
        }

        const decoded = await verifyJwt(token);

        if (!decoded) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized', errors: ['Invalid or expired token'] },
                { status: 401 }
            );
        }

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('x-userId', decoded.id);
        requestHeaders.set('x-userRole', decoded.role);

        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/forms/:path*', '/api/user/:path*'],
};
