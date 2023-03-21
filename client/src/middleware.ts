import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    console.log('Hello from auth middleware')
  }
}

export const config = {
  matcher: '/auth/:path*',
}
