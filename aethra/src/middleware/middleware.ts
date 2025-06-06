// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && token?.role !== 'isAdmin') {
    return NextResponse.redirect(new URL('/login', req.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};