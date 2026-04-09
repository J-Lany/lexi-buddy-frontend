import type { TableHeaderColumn } from '@/shared/ui/table-header';

export const TYPE_BREAKDOWN_COLS = 'grid-cols-[1fr_110px_110px_90px]';

export const TYPE_BREAKDOWN_COLUMNS: TableHeaderColumn[] = [
  { label: 'TYPE', align: 'left' },
  { label: 'STARTED', align: 'right' },
  { label: 'COMPLETED', align: 'right' },
  { label: 'RATE', align: 'right' },
];
