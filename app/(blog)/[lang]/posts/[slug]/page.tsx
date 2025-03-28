import { defineQuery } from 'next-sanity';
import type { Metadata, ResolvingMetadata } from 'next';
import { type PortableTextBlock } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import * as demo from '@/sanity/lib/demo';
import { sanityFetch } from '@/sanity/lib/fetch';
import { postQuery, settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import Avatar from '@/app/(blog)/avatar';
import CoverImage from '@/app/(blog)/cover-image';
import DateComponent from '@/app/(blog)/date';
import MoreStories from '@/app/(blog)/more-stories';
import CustomPortableText from '@/app/(blog)/portable-text';
import { i18n } from '@/config/i18n';

type Props = { params: { slug: string; lang: any } };

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current) && defined(language)]{
    "slug": slug.current,
    "lang": language
  }`
);

export async function generateStaticParams() {
  const posts = await sanityFetch({
    query: postSlugs,
    perspective: 'published',
    stega: false,
  });

  return posts.map((post: any) => ({ slug: post.slug, lang: post.lang }));
}

export async function generateMetadata(
  { params }: Props,
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

export default async function PostPage({ params }: Props) {
  // Validate language parameter
  if (!i18n.languages.includes(params.lang)) {
    notFound();
  }

  const [post, settings] = await Promise.all([
    sanityFetch({
      query: postQuery,
      params: { slug: params.slug, lang: params.lang },
    }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!post?._id) {
    notFound();
  }

  return (
    <div className='container mx-auto px-5'>
      <h2 className='mb-16 mt-10 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter'>
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
        <hr className='border-accent-2 mb-24 mt-28' />
        <h2 className='mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl'>
          Recent Stories
        </h2>
        <Suspense>
          <MoreStories skip={post._id} limit={2} language={params.lang} />
        </Suspense>
      </aside>
    </div>
  );
}
