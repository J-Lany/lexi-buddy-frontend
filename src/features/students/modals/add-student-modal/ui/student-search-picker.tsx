'use client';

import { Check, Loader2, X } from 'lucide-react';
import * as React from 'react';

import type { StudentBySearchDto } from '@/entities/students/api/search-students';
import { useSearchStudentsQuery } from '@/entities/students/model/queries/search-students';
import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/shared/ui/command';

import { normalizeQuery } from '../lib/normalize-search-query';

type Props = {
  value: StudentBySearchDto | null;
  onChange: (v: StudentBySearchDto | null) => void;
};

export function StudentSearchPicker({ value, onChange }: Props) {
  const { t } = useI18n();
  const [q, setQ] = React.useState('');

  const normalized = normalizeQuery(q);
  const { data = [], isFetching, isError, error } = useSearchStudentsQuery(normalized);

  return (
    <div className="rounded-2xl border border-border/30 overflow-hidden">
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
            <div className="h-full flex items-center justify-center p-3 text-xs text-muted-foreground">
              {t('students.search.typeMore')}
            </div>
          ) : isFetching ? (
            <div className="h-full flex items-center justify-center gap-2 p-3 text-xs text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('students.search.searching')}
            </div>
          ) : isError ? (
            <div className="h-full flex items-center justify-center p-3 text-xs text-destructive">
              {error?.message || t('students.search.failed')}
            </div>
          ) : data.length === 0 ? (
            <div className="h-full flex items-center justify-center p-3 text-sm text-muted-foreground">
              {t('students.search.notFound')}
            </div>
          ) : (
            <CommandGroup heading={t('students.search.groupHeading')}>
              {data.map((s) => {
                const selected = value?.id === s.id;

                return (
                  <CommandItem
                    key={s.id}
                    value={`${s.username ?? ''} ${s.firstName} ${s.id}`}
                    onSelect={() => onChange(selected ? null : s)}
                    className="flex items-center gap-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {s.username ? `@${s.username}` : t('students.search.noUsername')}
                        {s.level ? (
                          <span className="ml-2 text-xs text-muted-foreground">{s.level}</span>
                        ) : null}
                      </span>
                      <span className="text-xs text-muted-foreground">{s.firstName}</span>
                    </div>

                    {selected && <Check className="ml-auto h-4 w-4 opacity-70" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
}
