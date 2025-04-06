import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sanityFetch } from './sanity/lib/fetch';
import { redirectsQuery } from './sanity/lib/queries';

// List of all supported languages
export const supportedLanguages = ['hr', 'en', 'fr', 'de'];

// Define the redirect type
interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

// List of paths to exclude from redirects
const excludedPaths = ['/studio'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get the pathname from the request
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, API routes, and excluded paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    excludedPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    )
  ) {
    return NextResponse.next();
  }

  try {
    // Fetch redirects from Sanity
    const redirects = (await sanityFetch({
      query: redirectsQuery,
      perspective: 'published',
      stega: false,
    })) as Redirect[];

    console.log('Middleware: Fetched redirects:', redirects);
    console.log('Middleware: Current pathname:', pathname);

    // Check if the current path matches any redirect source
    const redirect = redirects.find(
      (r: Redirect) => r.source === pathname || r.source === `${pathname}/`
    );

    if (redirect) {
      console.log(
        `Middleware: Redirecting ${pathname} to ${redirect.destination}`
      );

      // Create a new URL for the redirect
      const url = new URL(redirect.destination, request.url);

      // Return a redirect response
      return NextResponse.redirect(url, {
        status: redirect.permanent ? 308 : 307,
      });
    }

    // Check if the pathname starts with a locale
    const pathnameHasLanguage = supportedLanguages.some(
      (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
    );

    // If the pathname doesn't have a language prefix, add the default language
    if (!pathnameHasLanguage) {
      const language = 'hr'; // Default language
      console.log(`Middleware: Adding language prefix to ${pathname}`);

      // Create a new URL with the language prefix
      const url = new URL(`/${language}${pathname}`, request.url);

      // Return a redirect response
      return NextResponse.redirect(url, {
        status: 307, // Temporary redirect
      });
    }

    // No redirect found, continue with the request
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware: Error fetching redirects:', error);

    // If there's an error, redirect to the root
    console.log('Middleware: Redirecting to root due to error');
    return NextResponse.redirect(new URL('/', request.url), {
      status: 307, // Temporary redirect
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
