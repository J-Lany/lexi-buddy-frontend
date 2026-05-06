import type { Locale } from '@/shared/i18n';

import { QA_DATA_EN } from './qa-data.en';
import { QA_DATA_ES } from './qa-data.es';
import { QA_DATA_KZ } from './qa-data.kz';
import { QA_DATA_RU } from './qa-data.ru';

export type QaItem = {
  q: string;
  a: string;
};

export type QaCategory = {
  category: string;
  icon: string;
  items: QaItem[];
};

const DATA: Record<Locale, QaCategory[]> = {
  en: QA_DATA_EN,
  ru: QA_DATA_RU,
  kz: QA_DATA_KZ,
  es: QA_DATA_ES,
};

export function getQaData(locale: Locale): QaCategory[] {
  return DATA[locale] ?? QA_DATA_EN;
}
