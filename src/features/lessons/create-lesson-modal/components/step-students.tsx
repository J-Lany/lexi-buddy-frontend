'use client';

import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function StepStudents({ draft, onChange, onNext, onBack }) {
  console.log(draft);
  return (
    <div className="space-y-4">
      <Select value={draft.students} onValueChange={(v) => onChange({ students: v })}></Select>
      <div className="flex justify-between gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext}>
          Finalize Lesson
        </Button>
      </div>
    </div>
  );
}
