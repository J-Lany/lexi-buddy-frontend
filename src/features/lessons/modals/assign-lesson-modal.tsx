'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAssignLessonMutation } from '@/entities/lessons/model/mutation/assign-lesson';
import { useAssigneesOptionsQuery } from '@/entities/lessons/model/query/assignees-options';
import { StudentsGroupsSelector } from '@/features/lessons/ui/students-groups-selector/students-groups-selector';
import { useI18n } from '@/shared/i18n';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { Button } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';
import { Skeleton } from '@/shared/ui/skeleton';

type Props = {
  lessonId: number;
  groupsIdsInLesson: number[];
  studentIdsInLesson: number[];
};

export function AssignLessonModal({ lessonId, groupsIdsInLesson, studentIdsInLesson }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [studentIds, setStudentIds] = useState<number[]>([]);
  const [groupIds, setGroupIds] = useState<number[]>([]);

  const { mutate, isPending } = useAssignLessonMutation();

  const { students, groups, isLoading, isError } = useAssigneesOptionsQuery({ enabled: open });

  const reset = () => {
    setStudentIds([]);
    setGroupIds([]);
  };

  const handleAssign = () => {
    mutate(
      { lessonId, studentIds, groupIds },
      {
        onSuccess: () => {
          toast.success(t('lessons.assignModal.successTitle'), {
            description: t('lessons.assignModal.successDesc'),
          });
          setOpen(false);
          reset();
        },
        onError: (e) => {
          toast.error(t('lessons.assignModal.errorTitle'), { description: getErrorMessage(e) });
        },
      },
    );
  };

  const nothingSelected = studentIds.length === 0 && groupIds.length === 0;
  const disabled = isPending || nothingSelected;

  return (
    <ResponsiveModal
      trigger={
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="h-4 w-4" />
          {t('lessons.assignModal.trigger')}
        </Button>
      }
      title={t('lessons.assignModal.title')}
      open={open}
      maxWidthClassName="sm:max-w-[640px]"
      className="sm:h-[90dvh] sm:w-[640px]"
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
      footer={
        <div className="flex gap-3.5">
          <Button
            variant="outline"
            type="button"
            className="flex-1 min-w-0"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            {t('lessons.assignModal.cancel')}
          </Button>

          <Button
            type="button"
            className="flex-1 min-w-0"
            onClick={handleAssign}
            disabled={disabled || isLoading || isError}
          >
            {isPending ? t('lessons.assignModal.assigning') : t('lessons.assignModal.assign')}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        )}

        {isError && !isLoading && (
          <div className="text-sm text-destructive">{t('lessons.assignModal.errorLoad')}</div>
        )}

        {!isLoading && !isError && (
          <StudentsGroupsSelector
            students={students}
            groups={groups}
            selectedStudentIds={studentIds}
            selectedGroupIds={groupIds}
            onChangeStudentIds={setStudentIds}
            onChangeGroupIds={setGroupIds}
            excludeStudentIds={studentIdsInLesson}
            excludeGroupIds={groupsIdsInLesson}
          />
        )}
      </div>
    </ResponsiveModal>
  );
}
