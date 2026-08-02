import { ageGroup } from '@/shared/domain/common';
import { en, es, kz, ru } from '@/shared/i18n/locales';

import { getLocalizedAgeGroupOptions } from '../options';

function translator(dictionary: object) {
  return (key: string) => {
    const value = key.split('.').reduce<unknown>((current, segment) => {
      if (current && typeof current === 'object') {
        return (current as Record<string, unknown>)[segment];
      }
      return undefined;
    }, dictionary);

    if (typeof value !== 'string') throw new Error(`Missing translation: ${key}`);
    return value;
  };
}

describe('getLocalizedAgeGroupOptions', () => {
  it.each([
    ['en', en, ['Children', 'Teenagers', 'Adults']],
    ['ru', ru, ['Дети', 'Подростки', 'Взрослые']],
    ['es', es, ['Niños', 'Adolescentes', 'Adultos']],
    ['kz', kz, ['Балалар', 'Жасөспірімдер', 'Ересектер']],
  ] as const)('maps every API age group to its %s label', (_locale, dictionary, labels) => {
    expect(getLocalizedAgeGroupOptions(translator(dictionary))).toEqual([
      { value: ageGroup.CHILD, label: labels[0] },
      { value: ageGroup.TEENAGER, label: labels[1] },
      { value: ageGroup.ADULT, label: labels[2] },
    ]);
  });
});
