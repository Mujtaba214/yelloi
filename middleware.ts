import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path === '/admin/login') {
    return NextResponse.next();
  }
  
  if (path.startsWith('/admin')) {
    const session = request.cookies.get('admin_session');
    
    if (!session || session.value !== 'true') {
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