'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/config/i18n';

const languageNames = {
  hr: 'HR',
  en: 'EN',
  fr: 'FR',
  de: 'DE',
};

export default function LanguageSelector() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1];

  // Create paths for each language while maintaining the current route
  const paths = i18n.languages.map(lang => {
    const pathParts = pathname.split('/');
    pathParts[1] = lang;
    return {
      lang,
      path: pathParts.join('/'),
    };
  });

  return (
    <ul className="fixed top-0 right-0 z-50 m-4 flex space-x-2 bg-white/80 px-3 py-2 backdrop-blur">
      {paths.map(({ lang, path }) => (
        <li key={lang}>
          <Link
            href={path}
            className={`px-2 py-1 text-sm ${
              currentLang === lang 
                ? 'font-bold text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {languageNames[lang as keyof typeof languageNames]}
          </Link>
        </li>
      ))}
    </ul>
  );
}