import { Input } from '@/components/ui/input';
import { CreateLessonDraft } from '@/features/lessons/create-lesson-modal/types';
import { Textarea } from '@/components/ui/textarea';
import { ResponsiveSelect } from '@/components/ui/responsive-select';
import { AGE_SELECTORS, LEVELS } from '@/lib/consts';
import { EAgeGroup, ELevel } from '@/lib/enums';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
};

export function StepLessonMeta({ draft, onChange }: Props) {
  return (
    <div className="space-y-4">
      <Input
        name="title"
        placeholder="Lesson title*"
        value={draft.title}
        onChange={(e) => onChange({ title: e.target.value })}
      />
      <ResponsiveSelect
        value={draft.level}
        onValueChange={(v) => onChange({ level: v as ELevel })}
        placeholder="Lesson level"
        title="Lesson level"
        options={LEVELS}
      />
      <ResponsiveSelect
        value={draft.ageGroup}
        onValueChange={(v) => onChange({ ageGroup: v as EAgeGroup })}
        placeholder="Age group"
        title="Age group"
        options={AGE_SELECTORS}
      />

      <Textarea
        name="topic"
        placeholder="Lesson topic"
        value={draft.topic}
        onChange={(e) => onChange({ topic: e.target.value })}
      />
    </div>
  );
}
