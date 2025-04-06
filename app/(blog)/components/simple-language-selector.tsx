'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/config/i18n';
import { getTranslation } from '@/config/translations';
import { useEffect, useState } from 'react';

const languageNames = {
  hr: 'HR',
  en: 'EN',
  fr: 'FR',
  de: 'DE',
};

export default function SimpleLanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [translations, setTranslations] = useState<any[]>([]);
  const [paths, setPaths] = useState<Array<{ lang: string; path: string }>>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch available languages
  useEffect(() => {
    fetch('/api/languages')
      .then((response) => response.json())
      .then((data) => {
        if (data.availableLanguages) {
          setAvailableLanguages(data.availableLanguages);
        } else {
          // If API fails, assume all languages are available
          setAvailableLanguages([...i18n.languages]);
        }
      })
      .catch((error) => {
        console.error('Error fetching available languages:', error);
        // If API fails, assume all languages are available
        setAvailableLanguages([...i18n.languages]);
      });
  }, []);

  // Get current language from pathname
  const currentLang = pathname ? pathname.split('/')[1] : '';

  // Check if we're on a post page
  const isPostPage = pathname?.includes('/posts/');
  const slug = isPostPage && pathname ? pathname.split('/posts/')[1] : null;

  // Fetch translations for post pages
  useEffect(() => {
    if (!isPostPage || !slug || !currentLang) {
      // For non-post pages, just create basic paths
      const basicPaths = availableLanguages.map((lang) => {
        const pathParts = pathname ? pathname.split('/') : [];
        if (pathParts.length > 1) {
          pathParts[1] = lang;
        }
        return {
          lang,
          path: pathParts.length > 1 ? pathParts.join('/') : `/${lang}`,
        };
      });
      setPaths(basicPaths);
      return;
    }

    // For post pages, fetch translations
    fetch(`/api/translations?slug=${slug}&lang=${currentLang}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.translations && data.translations.length > 0) {
          setTranslations(data.translations);

          // Create paths with translation slugs
          const translationPaths = availableLanguages.map((lang) => {
            const translation = data.translations.find(
              (t: any) => t.language === lang
            );
            if (translation) {
              return {
                lang,
                path: `/${lang}/posts/${translation.slug}`,
              };
            }

            // If no translation exists, redirect to language root
            return {
              lang,
              path: `/${lang}`,
            };
          });

          setPaths(translationPaths);
        } else {
          // If no translations, use basic paths with language root fallback
          const basicPaths = availableLanguages.map((lang) => {
            return {
              lang,
              path: `/${lang}`,
            };
          });
          setPaths(basicPaths);
        }
      })
      .catch((error) => {
        console.error('Error fetching translations:', error);
        // On error, use basic paths with language root fallback
        const basicPaths = availableLanguages.map((lang) => {
          return {
            lang,
            path: `/${lang}`,
          };
        });
        setPaths(basicPaths);
      });
  }, [pathname, isPostPage, slug, currentLang, availableLanguages]);

  // Handle language change
  const handleLanguageChange = (path: string) => {
    router.push(path);
    setIsModalOpen(false);
  };

  // Get translated "Select Language" text
  const selectLanguageText = getTranslation('selectLanguage', currentLang);

  // Don't render anything until component is mounted
  if (!mounted) {
    return null;
  }

  // Don't render if no languages are available
  if (availableLanguages.length === 0) {
    return null;
  }

  return (
    <>
      {/* Language selector for desktop */}
      <div className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur shadow-sm'>
        <div className='container mx-auto px-4 py-2 flex justify-end'>
          {/* Mobile language button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className='md:hidden px-3 py-1 text-sm rounded-md bg-blue-50 text-blue-600 font-medium'
          >
            {languageNames[currentLang as keyof typeof languageNames] ||
              'Language'}
          </button>

          {/* Desktop language selector */}
          <ul className='hidden md:flex space-x-2'>
            {paths.map(({ lang, path }) => (
              <li key={lang}>
                <button
                  onClick={() => handleLanguageChange(path)}
                  className={`px-2 py-1 text-sm rounded-md transition-colors ${
                    currentLang === lang
                      ? 'font-bold text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {languageNames[lang as keyof typeof languageNames]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Language selection modal for mobile */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-medium'>{selectLanguageText}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-gray-500 hover:text-gray-700'
                aria-label='Close language selection'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <ul className='space-y-2'>
              {paths.map(({ lang, path }) => (
                <li key={lang}>
                  <button
                    onClick={() => handleLanguageChange(path)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                      currentLang === lang
                        ? 'font-bold text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {languageNames[lang as keyof typeof languageNames]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
