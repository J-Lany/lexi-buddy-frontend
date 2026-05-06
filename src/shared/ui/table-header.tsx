'use client';

import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';

export type TableHeaderColumn = {
  label: string;
  labelKey?: string;
  align?: 'left' | 'right';
};

type Props = {
  colsClassName: string;
  columns: TableHeaderColumn[];
};

export function TableHeader({ colsClassName, columns }: Props) {
  const { t } = useI18n();

  return (
    <div className={cn('grid items-center gap-4', colsClassName)}>
      {columns.map((col) => (
        <div
          key={col.labelKey ?? col.label}
          className={cn('ui-stat font-medium', col.align === 'right' && 'text-right')}
        >
          {col.labelKey ? t(col.labelKey) : col.label}
        </div>
      ))}
    </div>
  );
}
