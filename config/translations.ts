import { i18n } from './i18n';

// Define the type for translation keys
export type TranslationKey =
  | 'moreStories'
  | 'readMore'
  | 'backToHome'
  | 'loading'
  | 'availableIn'
  | 'selectLanguage';

type Translations = {
  [key in TranslationKey]: {
    [lang in (typeof i18n.languages)[number]]: string;
  };
};

// Define translations for fixed UI text
export const translations: Translations = {
  moreStories: {
    hr: 'Više priča',
    en: 'More Stories',
    fr: "Plus d'histoires",
    de: 'Weitere Geschichten',
  },
  readMore: {
    hr: 'Pročitaj više',
    en: 'Read More',
    fr: 'Lire la suite',
    de: 'Weiterlesen',
  },
  backToHome: {
    hr: 'Natrag na početnu',
    en: 'Back to Home',
    fr: "Retour à l'accueil",
    de: 'Zurück zur Startseite',
  },
  loading: {
    hr: 'Učitavanje...',
    en: 'Loading...',
    fr: 'Chargement...',
    de: 'Laden...',
  },
  availableIn: {
    hr: 'Dostupno na',
    en: 'Available in',
    fr: 'Disponible en',
    de: 'Verfügbar in',
  },
  selectLanguage: {
    hr: 'Odaberi jezik',
    en: 'Select Language',
    fr: 'Sélectionner la langue',
    de: 'Sprache auswählen',
  },
};

export function getTranslation(key: TranslationKey, lang: string): string {
  // Default to English if the language is not found
  const language = i18n.languages.includes(lang as any) ? lang : 'en';
  return translations[key][language as (typeof i18n.languages)[number]];
}
