import {
  CreateLessonDraft,
  DraftPatch,
} from '@/features/lessons/modals/create-lesson-modal/model/types';
import { AGE_GROUP_OPTIONS } from '@/shared/catalogs/age';
import { LEVEL_OPTIONS } from '@/shared/catalogs/levels';
import { Input } from '@/shared/ui/input';
import { ResponsiveSelect } from '@/shared/ui/responsive-select';
import { Textarea } from '@/shared/ui/textarea';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: DraftPatch) => void;
};

export function StepLessonMeta({ draft, onChange }: Props) {
  return (
    <div className="space-y-5">
      <Input
        name="title"
        placeholder="Lesson title*"
        value={draft.title}
        onChange={(e) => onChange({ title: e.target.value })}
      />
      <ResponsiveSelect
        value={draft.level}
        onValueChange={(v) => onChange({ level: v })}
        placeholder="Lesson level"
        title="Lesson level"
        options={LEVEL_OPTIONS}
      />
      <ResponsiveSelect
        value={draft.ageCategory}
        onValueChange={(v) => onChange({ ageCategory: v })}
        placeholder="Age group"
        title="Age group"
        options={AGE_GROUP_OPTIONS}
      />

      <Textarea
        name="topic"
        minRows={5}
        placeholder="Lesson topic"
        value={draft.topic}
        onChange={(e) => onChange({ topic: e.target.value })}
      />
    </div>
  );
}
