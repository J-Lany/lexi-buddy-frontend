'use client';

import { Loader2, Search } from 'lucide-react';
import * as React from 'react';

import type { StudentBySearchDto } from '@/entities/students/api/search-students';
import { useSearchStudentsQuery } from '@/entities/students/model/queries/search-students';
import { useI18n } from '@/shared/i18n';
import { Input } from '@/shared/ui/input';

import { normalizeQuery } from '../lib/normalize-search-query';
import { NameAvatar } from './name-avatar';
import { SelectedStudentCard } from './selected-student-card';

type Props = {
  value: StudentBySearchDto | null;
  onChange: (v: StudentBySearchDto | null) => void;
};

export function StudentSearchPicker({ value, onChange }: Props) {
  const { t } = useI18n();
  const [q, setQ] = React.useState('');

  const normalized = normalizeQuery(q);
  const { data = [], isFetching, isError, error } = useSearchStudentsQuery(value ? '' : normalized);

  const handleClear = () => {
    onChange(null);
    setQ('');
  };

  return (
    <div>
      <p className="mb-2 text-[14px] font-semibold text-foreground">
        {t('students.invite.findStudent')}
      </p>

      {!value && (
        <>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              style={{ left: '16px' }}
              aria-hidden
            />
            <Input
              type="text"
              placeholder={t('students.search.placeholder')}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus={false}
              style={{
                paddingLeft: '2.75rem',
                paddingRight: '1rem',
                height: '48px',
                fontSize: '14px',
              }}
            />
          </div>

          <p className="mt-2 px-1 text-[12px] leading-snug text-muted-foreground">
            {t('students.invite.searchHint')}
          </p>

          {normalized.length >= 2 && (
            <div className="mt-3">
              {isFetching ? (
                <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('students.search.searching')}
                </div>
              ) : isError ? (
                <div className="py-4 text-center text-sm text-destructive">
                  {error?.message || t('students.search.failed')}
                </div>
              ) : data.length === 0 ? (
                <div className="flex flex-col items-center gap-1 py-6 text-center">
                  <p className="text-[14px] font-medium">{t('students.search.notFound')}</p>
                  <p className="max-w-[36ch] text-[12.5px] text-muted-foreground">
                    {t('students.search.notFoundDesc')}
                  </p>
                </div>
              ) : (
                <div>
                  {data.map((s) => {
                    const displayName = s.firstName || s.username || '?';
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setQ('');
                          onChange(s);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent/60"
                      >
                        <NameAvatar name={displayName} avatarUrl={s.avatarUrl} size="sm" />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-[14px] font-medium leading-snug">
                            {displayName}
                          </span>
                          {s.username && (
                            <span className="truncate text-[12.5px] leading-snug text-muted-foreground">
                              @{s.username}
                              {s.level ? ` · ${s.level}` : ''}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {value && <SelectedStudentCard student={value} onClear={handleClear} />}
    </div>
  );
}
