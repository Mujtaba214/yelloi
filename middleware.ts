// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip login page itself
  if (path === '/admin/login') {
    return NextResponse.next();
  }
  
  // Check if trying to access admin routes
  if (path.startsWith('/admin')) {
    const isAdmin = request.cookies.get('admin_session');
    
    if (!isAdmin) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};