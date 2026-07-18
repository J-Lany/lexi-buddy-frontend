'use client';

import { X } from 'lucide-react';

import type { StudentBySearchDto } from '@/entities/students/api/search-students';
import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

import { NameAvatar } from './name-avatar';

type Props = {
  student: StudentBySearchDto;
  onClear: () => void;
};

export function SelectedStudentCard({ student, onClear }: Props) {
  const { t } = useI18n();
  const displayName = student.firstName || student.username || '?';

  return (
    <div
      className="flex items-center gap-3 rounded-2xl border px-4 py-3"
      style={{
        background: 'color-mix(in oklch, var(--primary) 5%, white 95%)',
        borderColor: 'color-mix(in oklch, var(--primary) 20%, white 80%)',
      }}
    >
      <NameAvatar name={displayName} avatarUrl={student.avatarUrl} size="md" />

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-semibold leading-snug">{displayName}</span>
        {student.username && (
          <span className="truncate text-[13px] leading-snug text-muted-foreground">
            @{student.username}
          </span>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 text-muted-foreground hover:bg-background hover:text-foreground"
        onClick={onClear}
        aria-label={t('students.invite.changeStudent')}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
