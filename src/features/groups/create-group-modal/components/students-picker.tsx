'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
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
    <div className="rounded-xl border overflow-hidden">
      <Command shouldFilter>
        <CommandInput placeholder="Type a command or search..." />
        <CommandSeparator />
        <CommandList className="max-h-[320px]">
          <CommandEmpty>No students found.</CommandEmpty>

          <CommandGroup
            heading={
              <div className="flex items-center justify-between w-full">
                <span>Students</span>
                <span className="text-xs text-muted-foreground">{value.length} selected</span>
              </div>
            }
          >
            {students.map((s) => {
              const checked = value.includes(s.id);

              return (
                <CommandItem
                  key={s.id}
                  value={`${s.username} ${s.name} ${s.id}`}
                  onSelect={() => toggle(s.id)}
                  className="flex items-center gap-3"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggle(s.id)}
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="flex flex-col">
                    <span className="text-sm">{s.username}</span>
                    <span className="text-xs text-muted-foreground">{s.name}</span>
                  </div>

                  {checked && <Check className="ml-auto h-4 w-4 opacity-70" />}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
