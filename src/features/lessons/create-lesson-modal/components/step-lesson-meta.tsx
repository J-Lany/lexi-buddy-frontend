import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AGE_LABELS,
  AGE_SHORT_LABELS,
  CreateLessonDraft,
  EAgeGroup,
  ELevel,
} from '@/features/lessons/create-lesson-modal/types';
import { Textarea } from '@/components/ui/textarea';

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
      <div className="flex gap-4">
        <Select value={draft.level} onValueChange={(v) => onChange({ level: v as ELevel })}>
          <SelectTrigger className="rounded-xl h-12">
            <SelectValue placeholder="Lesson level*" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ELevel).map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={draft.ageGroup}
          onValueChange={(v) => onChange({ ageGroup: v as EAgeGroup })}
        >
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue placeholder="Age group*" />
          </SelectTrigger>

          <SelectContent>
            {Object.values(EAgeGroup).map((a) => (
              <SelectItem key={a} value={a}>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium leading-snug">
                    {AGE_SHORT_LABELS[a] ?? a}
                  </span>
                  <span className="ui-meta">{AGE_LABELS[a] ?? a}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Textarea
        name="topic"
        placeholder="Lesson topic*"
        value={draft.topic}
        onChange={(e) => onChange({ topic: e.target.value })}
      />
    </div>
  );
}
