'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/config/i18n';
import { useEffect, useState } from 'react';

const languageNames = {
  hr: 'HR',
  en: 'EN',
  fr: 'FR',
  de: 'DE',
};

export default function LanguageSelector() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState('');
  const [translations, setTranslations] = useState<any[]>([]);
  const [paths, setPaths] = useState<Array<{ lang: string; path: string }>>([]);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize currentLang and paths on client-side only
  useEffect(() => {
    if (!pathname) return;

    const lang = pathname.split('/')[1];
    setCurrentLang(lang);

    // Create basic paths for each language
    const newPaths = i18n.languages.map((lang) => {
      const pathParts = pathname.split('/');
      pathParts[1] = lang;
      return {
        lang,
        path: pathParts.join('/'),
      };
    });

    setPaths(newPaths);

    // Check if we're on a post page
    const isPostPage = pathname.includes('/posts/');
    const slug = isPostPage ? pathname.split('/posts/')[1] : null;

    if (isPostPage && slug) {
      // Fetch translations for post pages
      fetch(`/api/translations?slug=${slug}&lang=${lang}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.translations && data.translations.length > 0) {
            setTranslations(data.translations);

            // Update paths with translation slugs
            const updatedPaths = i18n.languages.map((lang) => {
              const translation = data.translations.find(
                (t: any) => t.language === lang
              );
              if (translation) {
                return {
                  lang,
                  path: `/${lang}/posts/${translation.slug}`,
                };
              }

              // Fallback to basic path
              const pathParts = pathname.split('/');
              pathParts[1] = lang;
              return {
                lang,
                path: pathParts.join('/'),
              };
            });

            setPaths(updatedPaths);
          }
        })
        .catch((error) => {
          console.error('Error fetching translations:', error);
        });
    }
  }, [pathname]);

  // Don't render anything until component is mounted
  if (!mounted) {
    return null;
  }

  return (
    <ul className='fixed top-0 right-0 z-50 m-4 flex space-x-2 bg-white/80 px-3 py-2 backdrop-blur'>
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
