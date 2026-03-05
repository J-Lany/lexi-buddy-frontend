'use client';

import * as React from 'react';

import type { StudentDto } from '@/entities/students/api/get-my-students';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';

import { StudentRow } from './student-row';

type Props = {
  students: readonly StudentDto[];
  value: readonly number[];
  onChange: (ids: number[]) => void;
};

export function StudentsPicker({ students, value, onChange }: Props) {
  const selected = React.useMemo(() => new Set(value), [value]);

  const toggle = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-background overflow-hidden">
      <Command shouldFilter>
        <div className="p-2">
          <CommandInput placeholder="Search students" className="h-11" />
        </div>

        <CommandList className="max-h-80 p-2">
          <CommandEmpty>No students found.</CommandEmpty>

          <CommandGroup
            heading={
              <div className="flex items-center justify-between w-full px-1">
                <span className="text-[13px] text-muted-foreground">Students</span>
                <span className="text-[13px] text-muted-foreground">{value.length} selected</span>
              </div>
            }
          >
            <div className="grid gap-1.5">
              {students.map((s) => {
                const isSelected = selected.has(s.id);

                return (
                  <CommandItem
                    key={s.id}
                    value={`${s.username ?? ''} ${s.name} ${s.id}`}
                    onSelect={() => toggle(s.id)}
                    className="p-0 aria-selected:bg-transparent data-[selected=true]:bg-transparent"
                  >
                    <StudentRow
                      icon={s.avatarUrl}
                      selected={isSelected}
                      primary={s.username}
                      secondary={s.name}
                    />
                  </CommandItem>
                );
              })}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
