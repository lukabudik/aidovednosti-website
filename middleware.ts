import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from './utils/auth';

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin section
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Check if the user is authenticated
    const authenticated = await isAuthenticated(request);
    
    if (!authenticated) {
      // Redirect to the login page
      const loginUrl = new URL('/admin/login', request.url);
      
      // Add the original URL as a query parameter for redirection after login
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Check if the request is for the API
  if (request.nextUrl.pathname.startsWith('/api/codes')) {
    // Skip the login API
    if (request.nextUrl.pathname === '/api/auth/login') {
      return NextResponse.next();
    }
    
    // Check if the user is authenticated
    const authenticated = await isAuthenticated(request);
    
    if (!authenticated) {
      // Return unauthorized response
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/codes/:path*'],
};
