import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// List of all supported languages
export const supportedLanguages = ['hr', 'en', 'fr', 'de']
 
export function middleware(request: NextRequest) {
  // Check if there is any supported language in the pathname
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname starts with a locale
  const pathnameHasLanguage = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  )

  if (pathnameHasLanguage) return

  // Redirect if there is no language in the pathname
  const language = 'hr' // Default language
  
  // e.g. incoming request is /posts
  // The new URL is now /hr/posts
  return NextResponse.redirect(
    new URL(`/${language}${pathname}`, request.url)
  )
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}