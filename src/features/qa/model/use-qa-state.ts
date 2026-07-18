'use client';

import * as React from 'react';

import { useI18n } from '@/shared/i18n';

import { getQaData } from '../data/qa-data';

export function useQaState() {
  const { locale } = useI18n();
  const data = React.useMemo(() => getQaData(locale), [locale]);

  const [openCategory, setOpenCategory] = React.useState<string | null>(null);
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState('');

  const filtered = React.useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return data
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.q.toLowerCase().includes(normalizedSearch) ||
            item.a.toLowerCase().includes(normalizedSearch),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search, data]);

  const totalQuestions = React.useMemo(
    () => data.reduce((sum, category) => sum + category.items.length, 0),
    [data],
  );

  const handleSearchChange = (nextSearch: string) => {
    setSearch(nextSearch);
    setOpenCategory(null);
    setOpenItem(null);
  };

  const toggleCategory = (category: string, isOpen: boolean) => {
    setOpenCategory(isOpen && !search ? null : category);
    setOpenItem(null);
  };

  const toggleItem = (itemKey: string, isOpen: boolean) => {
    setOpenItem(isOpen ? null : itemKey);
  };

  return {
    search,
    filtered,
    openCategory,
    openItem,
    totalQuestions,
    totalCategories: data.length,
    handleSearchChange,
    toggleCategory,
    toggleItem,
  };
}
