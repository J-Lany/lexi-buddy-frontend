'use client';

import { LEVEL_OPTIONS } from '@/shared/catalogs/levels';
import type { Level } from '@/shared/domain/common';
import { Input } from '@/shared/ui/input';
import { ResponsiveSelect } from '@/shared/ui/responsive-select';
import { Textarea } from '@/shared/ui/textarea';

import type { CreateGroupDraft } from '../types';

type Props = {
  draft: CreateGroupDraft;
  onChange: (patch: Partial<CreateGroupDraft>) => void;
};

export function StepDetails({ draft, onChange }: Props) {
  return (
    <div className="grid gap-5">
      <Input
        name="name"
        placeholder="Group title*"
        value={draft.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />

      <ResponsiveSelect<Level>
        value={draft.level}
        onValueChange={(level) => onChange({ level })}
        placeholder="Group level"
        title="Group level"
        options={LEVEL_OPTIONS}
      />

      <Textarea
        name="description"
        placeholder="Group description"
        value={draft.description}
        minRows={2}
        onChange={(e) => onChange({ description: e.target.value })}
      />
    </div>
  );
}
