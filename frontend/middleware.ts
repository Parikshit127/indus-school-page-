import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is an admin route (but not the login page)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        // Check for admin token in cookies
        const token = request.cookies.get('adminToken')?.value;

        if (!token) {
            // Redirect to login if no token
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: '/admin/:path*',
};
