'use client';

import { Check, Loader2, X } from 'lucide-react';
import * as React from 'react';

import type { StudentBySearchDto } from '@/entities/students/api/search-students';
import { useSearchStudentsQuery } from '@/entities/students/model/queries/search-students';
import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/shared/ui/command';

import { normalizeQuery } from '../lib/normalize-search-query';

type Props = {
  value: StudentBySearchDto | null;
  onChange: (v: StudentBySearchDto | null) => void;
};

function StudentInitials({ name }: { name: string }) {
  const letter = (name?.[0] ?? '?').toUpperCase();
  return (
    <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
      <span className="text-xs font-semibold text-primary">{letter}</span>
    </div>
  );
}

export function StudentSearchPicker({ value, onChange }: Props) {
  const { t } = useI18n();
  const [q, setQ] = React.useState('');

  const normalized = normalizeQuery(q);
  const { data = [], isFetching, isError, error } = useSearchStudentsQuery(normalized);

  return (
    <div className="rounded-2xl border border-(--border-soft) overflow-hidden bg-background shadow-(--shadow-card)">
      <Command shouldFilter={false}>
        <div className="relative">
          <CommandInput
            value={q}
            onValueChange={setQ}
            placeholder={t('students.search.placeholder')}
          />

          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8"
              onClick={() => onChange(null)}
              title="Clear"
            >
              <X className="h-4 w-4 opacity-70" />
            </Button>
          )}
        </div>

        <CommandList className="h-auto overflow-y-auto">
          {normalized.length < 2 ? (
            value ? (
              <div className="flex items-center gap-3 px-4 py-3">
                <StudentInitials name={value.firstName || value.username || '?'} />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="ui-title truncate">{value.firstName || value.username}</span>
                  {value.username && (
                    <span className="ui-stat text-muted-foreground">@{value.username}</span>
                  )}
                </div>
                <Check className="h-4 w-4 text-primary shrink-0" />
              </div>
            ) : (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                {t('students.search.typeMore')}
              </div>
            )
          ) : isFetching ? (
            <div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('students.search.searching')}
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center p-4 text-sm text-destructive">
              {error?.message || t('students.search.failed')}
            </div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              {t('students.search.notFound')}
            </div>
          ) : (
            <div className="py-1">
              {data.map((s) => {
                const selected = value?.id === s.id;
                const displayName = s.firstName || s.username || '?';

                return (
                  <CommandItem
                    key={s.id}
                    value={`${s.username ?? ''} ${s.firstName} ${s.id}`}
                    onSelect={() => {
                      if (!selected) setQ('');
                      onChange(selected ? null : s);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 mx-1 rounded-xl cursor-pointer"
                  >
                    <StudentInitials name={displayName} />

                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="ui-title truncate">{displayName}</span>
                      <div className="flex items-center gap-1.5">
                        {s.username && (
                          <span className="ui-stat text-muted-foreground">@{s.username}</span>
                        )}
                        {s.level && (
                          <>
                            {s.username && (
                              <span className="ui-stat text-muted-foreground/40">·</span>
                            )}
                            <span className="ui-stat text-muted-foreground">{s.level}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {selected && <Check className="ml-auto h-4 w-4 text-primary shrink-0" />}
                  </CommandItem>
                );
              })}
            </div>
          )}
        </CommandList>
      </Command>
    </div>
  );
}
