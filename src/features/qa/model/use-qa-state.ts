'use client';

import * as React from 'react';

import { QA_DATA } from '../data/qa-data';

export function useQaState() {
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState('');

  const filtered = React.useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return QA_DATA.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        return (
          item.q.toLowerCase().includes(normalizedSearch) ||
          item.a.toLowerCase().includes(normalizedSearch)
        );
      }),
    })).filter((cat) => cat.items.length > 0);
  }, [search]);

  const totalQuestions = React.useMemo(() => {
    return QA_DATA.reduce((sum, category) => sum + category.items.length, 0);
  }, []);

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
    totalCategories: QA_DATA.length,
    handleSearchChange,
    toggleCategory,
    toggleItem,
  };
}
