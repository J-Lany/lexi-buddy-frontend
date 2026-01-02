'use client';

import * as React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import type { Student } from '../types';
import { StudentRow } from './student-row';

export function StudentsPicker({
  students,
  value,
  onChange,
}: {
  students: Student[];
  value: number[];
  onChange: (ids: number[]) => void;
}) {
  const toggle = (id: number) => {
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-background overflow-hidden">
      <Command shouldFilter>
        <div className="p-2">
          <CommandInput placeholder="Search students" className="h-11" />
        </div>
        <CommandList className="max-h-[320px] p-2">
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
                const selected = value.includes(s.id);

                return (
                  <CommandItem
                    key={s.id}
                    value={`${s.username} ${s.name} ${s.id}`}
                    onSelect={() => toggle(s.id)}
                    // снимаем “командные” стили, оставляем только поведение
                    className="p-0 aria-selected:bg-transparent data-[selected=true]:bg-transparent"
                  >
                    <StudentRow
                      selected={selected}
                      primary={s.username}
                      secondary={s.name}
                      onToggle={() => toggle(s.id)}
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
