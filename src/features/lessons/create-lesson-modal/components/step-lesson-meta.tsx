import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CreateLessonDraft, EAgeGroup, ELevel } from '@/features/lessons/create-lesson-modal/types';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
  onNext: () => void;
};

export function StepLessonMeta({ draft, onChange, onNext }: Props) {
  const canNext = draft.topic.trim().length > 0 && draft.title.trim().length > 0;
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
          <SelectTrigger className="rounded-full h-12">
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
          {' '}
          <SelectTrigger className="rounded-full h-12">
            {' '}
            <SelectValue placeholder="Lesson level*" />{' '}
          </SelectTrigger>{' '}
          <SelectContent>
            {' '}
            {Object.values(EAgeGroup).map((a) => (
              <SelectItem key={a} value={a}>
                {' '}
                {a}{' '}
              </SelectItem>
            ))}{' '}
          </SelectContent>
        </Select>
      </div>
      <Textarea
        name="topic"
        placeholder="Lesson topic*"
        value={draft.topic}
        onChange={(e) => onChange({ topic: e.target.value })}
      />
      <Button onClick={onNext} disabled={!canNext}>
        Next
      </Button>
    </div>
  );
}
