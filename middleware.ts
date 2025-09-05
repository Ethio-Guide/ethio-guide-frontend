import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Skip middleware for NextAuth routes and /auth/login
  if (pathname.startsWith('/api/auth') || pathname === '/auth/login') {
    return NextResponse.next();
  }

  // Allow everyone to access '/' on localhost
  const isLocalhost = origin.includes('localhost');
  if (pathname === '/' && isLocalhost) {
    return NextResponse.next();
  }

  // Define a type for the token to include user and role
  type TokenWithRole = {
    user?: {
      role?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };

  // Get the session token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET }) as TokenWithRole;

  // If no token (unauthenticated), redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', origin));
  }

  // Extract role
  const role = token.user?.role;
  if (!role) {
    return NextResponse.redirect(new URL('/auth/login', origin));
  }

  // Role-based redirect rules
  const redirects: { [key: string]: string } = {
    admin: '/admin/dashboard',
    user: '/user/home',
    org: '/organization/dashboard',
  };

  // Protected routes by role
  const protectedRoutes: { [key: string]: string[] } = {
    admin: ['/admin', '/admin/*'],
    user: ['/user', '/user/*'],
    org: ['/organization', '/organization/*'],
  };

  // Redirect authenticated users from root (non-localhost) to role-specific dashboard
  if (pathname === '/') {
    const redirectUrl = redirects[role] || redirects.user;
    return NextResponse.redirect(new URL(redirectUrl, origin));
  }

  // Restrict access to protected routes
  const isProtectedRoute = Object.entries(protectedRoutes).some(([r, paths]) =>
    paths.some((path) => path.endsWith('/*') ? pathname.startsWith(path.slice(0, -2)) : pathname === path)
  );

  if (isProtectedRoute) {
    const allowedPaths = protectedRoutes[role] || [];
    const isAllowed = allowedPaths.some((path) =>
      path.endsWith('/*') ? pathname.startsWith(path.slice(0, -2)) : pathname === path
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL(redirects[role] || '/auth/login', origin));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/user/:path*',
    '/organization/:path*',
  ],
};
