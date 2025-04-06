import { defineQuery } from 'next-sanity';
import type { Metadata, ResolvingMetadata } from 'next';
import { type PortableTextBlock } from 'next-sanity';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import * as demo from '@/sanity/lib/demo';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  postQuery,
  settingsQuery,
  moreStoriesCountQuery,
} from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import Avatar from '@/app/(blog)/avatar';
import CoverImage from '@/app/(blog)/cover-image';
import DateComponent from '@/app/(blog)/date';
import MoreStories from '@/app/(blog)/more-stories';
import CustomPortableText from '@/app/(blog)/portable-text';
import { i18n } from '@/config/i18n';
import { getTranslation } from '@/config/translations';

const postSlugsForStaticParams = defineQuery(
  `*[_type == "post" && defined(slug.current) && defined(language)]{
    "slug": slug.current,
    "lang": language
  }`
);

export async function generateStaticParams() {
  const posts = await sanityFetch({
    query: postSlugsForStaticParams,
    perspective: 'published',
    stega: false,
  });

  return posts.map((post: any) => ({ slug: post.slug, lang: post.lang }));
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch({
    query: postQuery,
    params: { slug: params.slug, lang: params.lang },
    stega: false,
  });

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: any) {
  // Validate language parameter
  if (!i18n.languages.includes(params.lang)) {
    notFound();
  }

  // First fetch the post
  const post = await sanityFetch({
    query: postQuery,
    params: { slug: params.slug, lang: params.lang },
  });

  if (!post?._id) {
    // If post not found, redirect to the language root path
    redirect(`/${params.lang}`);
  }

  // Check if this post is a translation of another post
  // If the requested language doesn't match the post's language, look for a translation
  if (
    post.language !== params.lang &&
    post.translations &&
    post.translations.length > 0
  ) {
    const translation = post.translations.find(
      (t: any) => t.language === params.lang
    );
    if (translation) {
      // Redirect to the translation
      redirect(`/${params.lang}/posts/${translation.slug}`);
    } else {
      // If no translation found, redirect to the language root path
      redirect(`/${params.lang}`);
    }
  }

  // Get available translations for this post
  const availableTranslations = post.translations || [];

  // Add the current post to the translations list if it's not already there
  const allTranslations = [
    {
      title: post.title,
      slug: post.slug,
      language: post.language,
    },
    ...availableTranslations.filter((t: any) => t.language !== post.language),
  ];

  // Fetch settings and count of more stories
  const [settings, moreStoriesCount] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({
      query: moreStoriesCountQuery,
      params: { skip: post._id, lang: params.lang },
    }),
  ]);

  return (
    <div className='container mx-auto px-5'>
      <h2 className='mb-10 mt-16 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter'>
        <Link href={`/${params.lang}`} className='hover:underline'>
          {settings?.title || demo.title}
        </Link>
      </h2>
      <article>
        <h1 className='text-balance mb-12 text-6xl font-bold leading-tight tracking-tighter md:text-7xl md:leading-none lg:text-8xl'>
          {post.title}
        </h1>
        <div className='hidden md:mb-12 md:block'>
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
        </div>
        <div className='mb-8 sm:mx-0 md:mb-16'>
          <CoverImage image={post.coverImage} priority />
        </div>
        <div className='mx-auto max-w-2xl'>
          <div className='mb-6 block md:hidden'>
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className='mb-6 text-lg'>
            <div className='mb-4 text-lg'>
              <DateComponent dateString={post.date} />
            </div>

            {/* Display available translations */}
            {allTranslations.length > 1 && (
              <div className='mt-4 flex flex-wrap gap-2'>
                <span className='text-gray-600'>
                  {getTranslation('availableIn', params.lang)}:
                </span>
                {allTranslations.map((translation: any) => (
                  <Link
                    key={translation.language}
                    href={`/${translation.language}/posts/${translation.slug}`}
                    className={`rounded bg-gray-100 px-2 py-1 text-sm ${
                      translation.language === params.lang
                        ? 'bg-blue-100 font-medium text-blue-700'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {translation.language.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {post.content?.length && (
          <CustomPortableText
            className='mx-auto max-w-2xl'
            value={post.content as PortableTextBlock[]}
          />
        )}
      </article>
      <aside>
        <hr className='border-accent-2 mb-8 mt-16' />
        {moreStoriesCount > 0 && (
          <>
            <h2 className='mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-5xl'>
              {getTranslation('moreStories', params.lang)}
            </h2>
            <Suspense>
              <MoreStories skip={post._id} limit={2} language={params.lang} />
            </Suspense>
          </>
        )}
      </aside>
    </div>
  );
}
