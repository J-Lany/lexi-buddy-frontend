'use client';

import { Search } from 'lucide-react';
import { useMemo } from 'react';

import { AssigneesFilterKey } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/lib/filter-assignees-students';
import { useI18n } from '@/shared/i18n';
import { SegmentedControl } from '@/shared/ui/segmented-control';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

export const STUDENT_FILTERS = [
  { value: 'ALL' },
  { value: 'NOT_STARTED' },
  { value: 'PENDING' },
  { value: 'COMPLETED' },
] as const satisfies ReadonlyArray<{ value: AssigneesFilterKey }>;

type Option = { value: AssigneesFilterKey };

type Props = {
  query: string;
  onQueryChange: (next: string) => void;
  filter: AssigneesFilterKey;
  onFilterChange: (next: AssigneesFilterKey) => void;
  options: readonly Option[];
};

export function AssigneesStudentsToolbar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  options,
}: Props) {
  const { t } = useI18n();

  const filterLabels = useMemo<Record<AssigneesFilterKey, string>>(
    () => ({
      ALL: t('lessons.details.all'),
      NOT_STARTED: t('lessons.details.notStarted'),
      PENDING: t('lessons.details.inProgress'),
      COMPLETED: t('lessons.details.completed'),
    }),
    [t],
  );

  const translatedOptions = useMemo(
    () => options.map((o) => ({ value: o.value, label: filterLabels[o.value] })),
    [options, filterLabels],
  );

  const activeLabel = filterLabels[filter];

  return (
    <div>
      <div className="flex flex-col gap-3 lg:hidden">
        <Select value={filter} onValueChange={(v) => onFilterChange(v as AssigneesFilterKey)}>
          <SelectTrigger aria-label="Student status filter" className="h-10 rounded-2xl">
            <SelectValue placeholder={t('lessons.details.all')}>{activeLabel}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            {translatedOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <SearchInput
          value={query}
          onChange={onQueryChange}
          placeholder={t('lessons.details.searchStudent')}
        />
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <SegmentedControl<AssigneesFilterKey>
          value={filter}
          onChange={onFilterChange}
          options={translatedOptions}
        />

        <div className="h-5 w-px bg-border/60 shrink-0" />

        <div className="flex-1 min-w-0">
          <SearchInput
            value={query}
            onChange={onQueryChange}
            placeholder={t('lessons.details.searchStudent')}
          />
        </div>
      </div>
    </div>
  );
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-(--border-soft) bg-(--surface) px-3 py-2">
      <Search className="h-4 w-4 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
