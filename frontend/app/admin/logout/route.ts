import { NextResponse } from 'next/server';

export async function GET() {
    const response = NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'));

    // Clear the admin token cookie
    response.cookies.set('adminToken', '', {
        path: '/',
        maxAge: 0,
    });

    return response;
}
