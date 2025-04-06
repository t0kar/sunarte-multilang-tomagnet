'use client';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { type PortableTextBlock } from 'next-sanity';

import AlertBanner from '../alert-banner';
import PortableText from '../portable-text';
import ClientLanguageSelector from './client-language-selector';

interface ClientBodyProps {
  children: React.ReactNode;
  isDraftMode: boolean;
  footer: PortableTextBlock[];
}

export default function ClientBody({
  children,
  isDraftMode,
  footer,
}: ClientBodyProps) {
  return (
    <body>
      <section className='min-h-screen'>
        {isDraftMode && <AlertBanner />}
        <ClientLanguageSelector />

        <main>{children}</main>
        <footer className='bg-accent-1 border-accent-2 border-t'>
          <div className='container mx-auto px-5'>
            <div className='flex flex-col items-center py-8 text-center'>
              <p className='text-sm text-gray-600'>
                Powered by{' '}
                <a
                  href='https://sunarte.hr'
                  className='font-medium text-blue-600 hover:underline'
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
  );
}
