export const language = {
  english: 'english',
  spanish: 'spanish',
  french: 'french',
  german: 'german',
  italian: 'italian',
  chinese: 'chinese',
  japanese: 'japanese',
  korean: 'korean',
  turkish: 'turkish',
  kazakh: 'kazakh',
  russian: 'russian',
} as const;

export type Language = (typeof language)[keyof typeof language];

export const ALL_LANGUAGES = Object.values(language) as Language[];
