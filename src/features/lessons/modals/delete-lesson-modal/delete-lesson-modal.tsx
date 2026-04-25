'use client';

import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { useDeleteLesson } from '@/entities/lessons/model/mutation/delete-lesson';
import { DeleteLessonScope } from '@/shared/api/contracts/lesson';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

type DeleteLessonModalProps = {
  lessonId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: (scope: DeleteLessonScope) => void;
};

export function DeleteLessonModal({
  lessonId,
  open,
  onOpenChange,
  onDeleted,
}: DeleteLessonModalProps) {
  const deleteLessonMutation = useDeleteLesson();

  const isDeletingForMe =
    deleteLessonMutation.isPending &&
    deleteLessonMutation.variables?.scope === DeleteLessonScope.ME;

  const isDeletingForAll =
    deleteLessonMutation.isPending &&
    deleteLessonMutation.variables?.scope === DeleteLessonScope.ALL;

  const handleDelete = async (scope: DeleteLessonScope) => {
    try {
      await deleteLessonMutation.mutateAsync({ lessonId, scope });

      toast.success(
        scope === DeleteLessonScope.ALL
          ? 'Lesson deleted for everyone'
          : 'Lesson removed from your lessons',
      );

      onOpenChange(false);
      onDeleted?.(scope);
    } catch {
      toast.error('Failed to delete lesson');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-32px)] rounded-[28px] border-white/70 bg-background/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-[440px]">
        <div className="px-6 pb-6 pt-7 sm:px-7">
          <DialogHeader className="items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <Trash2 className="size-6" strokeWidth={1.8} />
            </div>

            <DialogTitle className="text-[22px] font-semibold tracking-tight">
              Delete lesson?
            </DialogTitle>

            <DialogDescription className="max-w-[360px] pt-2 text-[14px] leading-6 text-muted-foreground">
              Delete this lesson only from your workspace, or remove it for everyone with assignment
              results.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-7 grid gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => void handleDelete(DeleteLessonScope.ME)}
              disabled={deleteLessonMutation.isPending}
              className="h-12 rounded-2xl text-[15px] font-semibold active:scale-[0.98]"
            >
              {isDeletingForMe ? <Loader2 className="size-4 animate-spin" /> : null}
              Delete for me
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="lg"
              onClick={() => void handleDelete(DeleteLessonScope.ALL)}
              disabled={deleteLessonMutation.isPending}
              className="h-12 rounded-2xl text-[15px] font-semibold active:scale-[0.98]"
            >
              {isDeletingForAll ? <Loader2 className="size-4 animate-spin" /> : null}
              Delete for everyone
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => onOpenChange(false)}
              disabled={deleteLessonMutation.isPending}
              className="h-11 rounded-2xl text-[15px] font-medium text-muted-foreground hover:text-foreground active:scale-[0.98]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
