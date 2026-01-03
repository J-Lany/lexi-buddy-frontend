'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { CreateGroupDraft } from '../types';

export function StepDetails({
  draft,
  onChange,
}: {
  draft: CreateGroupDraft;
  onChange: (patch: Partial<CreateGroupDraft>) => void;
}) {
  return (
    <div className="grid gap-4">
      <Input
        name="name"
        placeholder="Group title*"
        value={draft.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />

      <Select value={draft.level} onValueChange={(v) => onChange({ level: v })}>
        <SelectTrigger>
          <SelectValue placeholder="Group level" />
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
    </div>
  );
}
