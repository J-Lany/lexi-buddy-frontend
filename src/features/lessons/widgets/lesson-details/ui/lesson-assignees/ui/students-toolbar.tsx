'use client';

import { Search } from 'lucide-react';

import { AssigneesFilterKey } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/lib/filter-assignees-students';
import { SegmentedControl } from '@/shared/ui/segmented-control';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

export const STUDENT_FILTERS = [
  { value: 'ALL', label: 'All' },
  { value: 'NOT_STARTED', label: 'Not started' },
  { value: 'PENDING', label: 'In progress' },
  { value: 'COMPLETED', label: 'Completed' },
] as const satisfies ReadonlyArray<{ value: AssigneesFilterKey; label: string }>;

type Option = (typeof STUDENT_FILTERS)[number];

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
  const activeLabel = options.find((o) => o.value === filter)?.label ?? 'All';

  return (
    <div
      className="rounded-2xl p-3"
      style={{ background: 'color-mix(in oklch, var(--background) 92%, white 8%)' }}
    >
      <div className="flex flex-col gap-3 lg:hidden">
        <Select value={filter} onValueChange={(v) => onFilterChange(v as AssigneesFilterKey)}>
          <SelectTrigger aria-label="Student status filter" className="h-10 rounded-2xl">
            <SelectValue placeholder="Filter">{activeLabel}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <SearchInput value={query} onChange={onQueryChange} />
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <div className="min-w-0 flex-1">
          <SegmentedControl<AssigneesFilterKey>
            value={filter}
            onChange={onFilterChange}
            options={options}
            className="w-full"
          />
        </div>

        <div className="w-[340px]">
          <SearchInput value={query} onChange={onQueryChange} />
        </div>
      </div>
    </div>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div
      className="flex items-center gap-2 rounded-2xl border px-3 py-2"
      style={{
        background: 'color-mix(in oklch, var(--background) 92%, white 8%)',
        borderColor: 'var(--border-soft)',
      }}
    >
      <Search className="h-4 w-4 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search student"
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
