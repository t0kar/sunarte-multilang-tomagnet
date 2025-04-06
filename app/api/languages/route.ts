import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/lib/fetch';
import { i18n } from '@/config/i18n';

export async function GET(request: NextRequest) {
  try {
    // Create an array to store the results for each language
    const languageResults = await Promise.all(
      i18n.languages.map(async (lang) => {
        // Count posts for this language
        const count = await sanityFetch({
          query: `count(*[_type == "post" && language == $lang && defined(slug.current)])`,
          params: { lang },
        });

        return {
          language: lang,
          count: count as number,
        };
      })
    );

    // Filter to only include languages with posts
    const availableLanguages = languageResults
      .filter((result) => result.count > 0)
      .map((result) => result.language);

    return NextResponse.json({ availableLanguages });
  } catch (error) {
    console.error('Error fetching available languages:', error);
    // If there's an error, return all languages as available
    return NextResponse.json({ availableLanguages: i18n.languages });
  }
}
