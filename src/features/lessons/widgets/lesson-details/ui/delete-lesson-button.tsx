'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { DeleteLessonModal } from '@/features/lessons/modals/delete-lesson-modal/delete-lesson-modal';
import { DeleteLessonScope } from '@/shared/api/contracts/lesson';
import { Button } from '@/shared/ui/button';

type DeleteLessonButtonProps = {
  lessonId: number;
  onDeleted?: (scope: DeleteLessonScope) => void;
};

export function DeleteLessonButton({ lessonId, onDeleted }: DeleteLessonButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Delete lesson"
      >
        <Trash2 className="size-4" />
      </Button>

      <DeleteLessonModal
        lessonId={lessonId}
        open={isOpen}
        onOpenChange={setIsOpen}
        onDeleted={onDeleted}
      />
    </>
  );
}
