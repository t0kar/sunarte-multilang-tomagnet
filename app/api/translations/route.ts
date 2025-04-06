import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/lib/fetch';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const lang = searchParams.get('lang');

  if (!slug || !lang) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    // Fetch the post with the given slug and language
    const post = await sanityFetch({
      query: `*[_type == "post" && slug.current == $slug && language == $lang][0]{
        _id,
        title,
        "slug": slug.current,
        language,
        "translations": translations[]->{
          "title": coalesce(title, "Untitled"),
          "slug": slug.current,
          "language": language
        }
      }`,
      params: { slug, lang },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // If the post has no translations, try to find posts with the same title in other languages
    if (!post.translations || post.translations.length === 0) {
      // First, check if this post is a translation of another post
      const parentPost = await sanityFetch({
        query: `*[_type == "post" && references($postId) && language != $lang][0]{
          _id,
          title,
          "slug": slug.current,
          language,
          "translations": translations[]->{
            "title": coalesce(title, "Untitled"),
            "slug": slug.current,
            "language": language
          }
        }`,
        params: { postId: post._id, lang: post.language },
      });

      if (parentPost) {
        // This post is a translation, return all translations including the parent
        const allTranslations = [
          {
            title: parentPost.title,
            slug: parentPost.slug,
            language: parentPost.language,
          },
          ...(parentPost.translations || []),
        ];

        // Filter out the current post from translations
        const filteredTranslations = allTranslations.filter(
          (t) => t.language !== post.language
        );

        return NextResponse.json({ translations: filteredTranslations });
      }

      // If not a translation, try to find posts with the same title in other languages
      const similarPosts = await sanityFetch({
        query: `*[_type == "post" && title == $title && language != $lang && defined(slug.current)]{
          "title": coalesce(title, "Untitled"),
          "slug": slug.current,
          "language": language
        }`,
        params: { title: post.title, lang: post.language },
      });

      if (similarPosts && similarPosts.length > 0) {
        return NextResponse.json({ translations: similarPosts });
      }

      // If no translations found, return empty array
      return NextResponse.json({ translations: [] });
    }

    return NextResponse.json({ translations: post.translations || [] });
  } catch (error) {
    console.error('Error fetching translations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
