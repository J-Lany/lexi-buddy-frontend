'use client';

import { Button } from '@/components/ui/button';

export function CreateGroupFooter({
  step,
  canNext,
  canCreate,
  isCreating,
  onNext,
  onBack,
  onCreate,
}: {
  step: 1 | 2;
  canNext: boolean;
  canCreate: boolean;
  isCreating: boolean;
  onNext: () => void;
  onBack: () => void;
  onCreate: () => void;
}) {
  if (step === 1) {
    return (
      <div className="flex justify-end">
        <Button type="button" onClick={onNext} disabled={!canNext} className="w-full sm:w-auto">
          Next
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button type="button" variant="outline" onClick={onBack} className="flex-1 min-w-0">
        Back
      </Button>

      <Button type="button" onClick={onCreate} disabled={!canCreate} className="flex-1 min-w-0">
        {isCreating ? 'Creating…' : 'Create'}
      </Button>
    </div>
  );
}
