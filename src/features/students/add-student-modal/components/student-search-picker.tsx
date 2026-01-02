'use client';

import * as React from 'react';
import { Check, Loader2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  useSearchStudents,
  type StudentSearchItem,
} from '@/features/students/hooks/use-search-students';

export function StudentSearchPicker({
  value,
  onChange,
}: {
  value: StudentSearchItem | null;
  onChange: (v: StudentSearchItem | null) => void;
}) {
  const [q, setQ] = React.useState('');

  const normalized = q.trim().replace(/^@+/, '');
  const { data = [], isFetching, isError, error } = useSearchStudents(normalized);

  return (
    <div className="rounded-2xl border border-border/30 bg-muted/[0.15] overflow-hidden">
      <Command shouldFilter={false}>
        <div className="relative">
          <CommandInput
            value={q}
            onValueChange={setQ}
            placeholder="Search student by telegram username…"
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

        <CommandList className="h-[260px] overflow-y-auto">
          {normalized.length < 2 ? (
            <div className="h-full flex items-center justify-center p-3 text-xs text-muted-foreground">
              Type at least 2 characters to search
            </div>
          ) : isFetching ? (
            <div className="h-full flex items-center justify-center gap-2 p-3 text-xs text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching…
            </div>
          ) : isError ? (
            <div className="h-full flex items-center justify-center p-3 text-xs text-destructive">
              {(error as Error)?.message || 'Search failed'}
            </div>
          ) : data.length === 0 ? (
            <div className="h-full flex items-center justify-center p-3 text-sm text-muted-foreground">
              No students found.
            </div>
          ) : (
            <CommandGroup heading="Students">
              {data.map((s) => {
                const selected = value?.id === s.id;

                return (
                  <CommandItem
                    key={s.id}
                    value={`${s.username ?? ''} ${s.name} ${s.id}`}
                    onSelect={() => onChange(selected ? null : s)}
                    className="flex items-center gap-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {s.username ? `@${s.username}` : '(no username)'}
                        {s.level ? (
                          <span className="ml-2 text-xs text-muted-foreground">{s.level}</span>
                        ) : null}
                      </span>
                      <span className="text-xs text-muted-foreground">{s.name}</span>
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
