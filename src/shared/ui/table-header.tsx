'use client';

import { cn } from '@/shared/lib/cn';

export type TableHeaderColumn = {
  label: string;
  align?: 'left' | 'right';
};

type Props = {
  colsClassName: string;
  columns: TableHeaderColumn[];
};

export function TableHeader({ colsClassName, columns }: Props) {
  return (
    <div className={cn('grid items-center gap-4', colsClassName)}>
      {columns.map((col) => (
        <div
          key={col.label}
          className={cn('ui-stat font-medium', col.align === 'right' && 'text-right')}
        >
          {col.label}
        </div>
      ))}
    </div>
  );
}
