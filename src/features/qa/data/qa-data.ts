import type { Locale } from '@/shared/i18n';

import { QA_DATA_EN } from './qa-data.en';
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

export function getQaData(locale: Locale): QaCategory[] {
  if (locale === 'ru') return QA_DATA_RU;
  return QA_DATA_EN;
}
