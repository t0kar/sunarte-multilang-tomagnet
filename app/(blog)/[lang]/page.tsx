import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { i18n } from '@/config/i18n';
import { getTranslation } from '@/config/translations';
import * as demo from '@/sanity/lib/demo';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  heroQueryByLang,
  settingsQuery,
  moreStoriesCountQuery,
} from '@/sanity/lib/queries';
import CoverImage from '../cover-image';
import DateComponent from '../date';
import Avatar from '../avatar';
import Onboarding from '../onboarding';
import MoreStories from '../more-stories';
import CustomPortableText from '../portable-text';

function Intro(props: any) {
  const title = props?.title || demo.title;
  const description = props?.description?.length
    ? props?.description
    : demo.description;
  return (
    <section className='mt-16 mb-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between'>
      <h1 className='text-balance text-6xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-8xl'>
        {title || demo.title}
      </h1>
      <h2 className='text-pretty mt-5 text-center text-lg lg:pl-8 lg:text-left'>
        <CustomPortableText
          className='prose-lg'
          value={description?.length ? description : demo.description}
        />
      </h2>
    </section>
  );
}

function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
  language,
}: any) {
  return (
    <article>
      <Link
        className='group mb-8 block md:mb-16'
        href={`/${language}/posts/${slug}`}
      >
        <CoverImage image={coverImage} priority />
      </Link>
      <div className='mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8'>
        <div>
          <h3 className='text-pretty mb-4 text-4xl leading-tight lg:text-6xl'>
            <Link
              href={`/${language}/posts/${slug}`}
              className='hover:underline'
            >
              {title}
            </Link>
          </h3>
          <div className='mb-4 text-lg md:mb-0'>
            <DateComponent dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && (
            <p className='text-pretty mb-4 text-lg leading-relaxed'>
              {excerpt}
            </p>
          )}
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </article>
  );
}

export default async function Page(props: any) {
  const { params } = props;
  // Validate language parameter
  if (!i18n.languages.includes(params.lang)) {
    notFound();
  }

  // First fetch the hero post
  const heroPost = await sanityFetch({
    query: heroQueryByLang,
    params: { lang: params.lang },
  });

  // Then fetch settings and count of more stories
  const [settings, moreStoriesCount] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({
      query: moreStoriesCountQuery,
      params: { skip: heroPost?._id || '', lang: params.lang },
    }),
  ]);

  return (
    <div className='container mx-auto px-5'>
      <Intro title={settings?.title} description={settings?.description} />
      {heroPost ? (
        <HeroPost
          title={heroPost.title}
          slug={heroPost.slug}
          coverImage={heroPost.coverImage}
          excerpt={heroPost.excerpt}
          date={heroPost.date}
          author={heroPost.author}
          language={heroPost.language}
        />
      ) : (
        <Onboarding />
      )}
      {heroPost?._id && moreStoriesCount > 0 && (
        <aside>
          <h2 className='mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-5xl'>
            {getTranslation('moreStories', params?.lang)}
          </h2>
          <Suspense>
            <MoreStories
              skip={heroPost._id}
              limit={100}
              language={params?.lang}
            />
          </Suspense>
        </aside>
      )}
    </div>
  );
}
