/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from 'next-sanity';
import Image from 'next/image';
import { urlForImage } from '../../sanity/lib/image';

type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
};

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  console.log('post', value);
  const components: PortableTextComponents = {
    types: {
      image: ({ value }: { value: SanityImage }) => {
        if (!value?.asset?._ref) {
          return null;
        }

        const imageUrl = urlForImage(value)?.url();
        if (!imageUrl) {
          return null;
        }

        return (
          <figure className='my-6'>
            <div className='relative aspect-video overflow-hidden rounded-lg'>
              <Image
                src={imageUrl}
                alt={value.alt || ''}
                fill
                className='object-cover'
                sizes='(max-width: 800px) 100vw, 800px'
              />
            </div>
            {value.caption && (
              <figcaption className='mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400'>
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    block: {
      h5: ({ children }) => (
        <h5 className='mb-2 text-sm font-semibold'>{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className='mb-1 text-xs font-semibold'>{children}</h6>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a href={value?.href} rel='noreferrer noopener'>
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className={['prose', className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  );
}
