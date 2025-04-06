'use client';

import { Suspense } from 'react';
import { getTranslation } from '@/config/translations';
import LanguageSelector from './language-selector';

export default function ClientLanguageSelector() {
  // Default to English for the loading text
  const defaultLang = 'en';

  return (
    <Suspense
      fallback={
        <div className='fixed top-0 right-0 z-50 m-4 flex space-x-2 bg-white/80 px-3 py-2 backdrop-blur'>
          <div className='px-2 py-1 text-sm text-gray-400'>
            {getTranslation('loading', defaultLang)}
          </div>
        </div>
      }
    >
      <LanguageSelector />
    </Suspense>
  );
}
