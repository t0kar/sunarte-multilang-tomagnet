export const i18n = {
  languages: ['hr', 'en', 'fr', 'de'],
  defaultLanguage: 'hr',
} as const;

export type Language = typeof i18n.languages[number];