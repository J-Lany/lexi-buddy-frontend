import type { TableHeaderColumn } from '@/shared/ui/table-header';

export const GROUPS_TABLE_COLS = 'grid-cols-[2fr_140px_140px]' as const;

export const GROUPS_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Group' },
  { label: 'Level' },
  { label: 'Students', align: 'right' },
];
