import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    if (req.nextUrl.pathname.startsWith('/admin') && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};