'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { CreateGroupDraft } from './types';

export function StepDetails({
  draft,
  onChange,
  onNext,
}: {
  draft: CreateGroupDraft;
  onChange: (patch: Partial<CreateGroupDraft>) => void;
  onNext: () => void;
}) {
  const canNext = draft.name.trim().length > 0 && draft.level.trim().length > 0;

  return (
    <div className="grid gap-4">
      <Input
        name="name"
        placeholder="Group title*"
        value={draft.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />

      <Select value={draft.level} onValueChange={(v) => onChange({ level: v })}>
        <SelectTrigger className="rounded-full h-12">
          <SelectValue placeholder="Group level*" />
        </SelectTrigger>
        <SelectContent>
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        name="description"
        placeholder="Group description"
        value={draft.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={onNext} disabled={!canNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
