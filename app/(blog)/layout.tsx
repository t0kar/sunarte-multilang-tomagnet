import '../globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { toPlainText } from 'next-sanity';
import { Inter } from 'next/font/google';
import { draftMode } from 'next/headers';

import AlertBanner from './alert-banner';

import * as demo from '@/sanity/lib/demo';
import { sanityFetch } from '@/sanity/lib/fetch';
import { settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import SimpleLanguageSelector from './components/simple-language-selector';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: { template: `%s | ${title}`, default: title },
    description: toPlainText(description),
    openGraph: { images: ogImage ? [ogImage] : [] },
  };
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  console.log('footer', data);

  return (
    <html lang='en' className={`${inter.variable} bg-white text-black`}>
      <body>
        <section className='min-h-screen'>
          {isDraftMode && <AlertBanner />}
          <SimpleLanguageSelector />

          <main>{children}</main>
          <footer className='bg-accent-1 border-accent-2 border-t'>
            <div className='container mx-auto px-5'>
              <div className='flex flex-col items-center py-4 text-center'>
                <p className='text-sm text-gray-600'>
                  Powered by{' '}
                  <a
                    href='https://sunarte.hr'
                    className='font-semibold text-blue-600 hover:underline'
                  >
                    sunarte.hr
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </section>
        <SpeedInsights />
      </body>
    </html>
  );
}
