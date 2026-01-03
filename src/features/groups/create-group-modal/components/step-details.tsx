'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResponsiveSelect } from '@/components/ui/responsive-select';
import type { CreateGroupDraft } from '../types';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((v) => ({ value: v, label: v }));

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

      <ResponsiveSelect
        value={draft.level}
        onValueChange={(v) => onChange({ level: v })}
        placeholder="Group level"
        title="Group level"
        options={LEVELS}
      />

      <Textarea
        name="description"
        placeholder="Group description"
        value={draft.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />
    </div>
  );
}
