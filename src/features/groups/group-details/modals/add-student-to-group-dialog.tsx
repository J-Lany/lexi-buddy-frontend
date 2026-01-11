'use client';

import * as React from 'react';
import { ResponsiveModal } from '@/components/ui/responsive-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StudentAvatar } from '@/features/students/students-table/components/student-avatar';
import { AGE_ICONS } from '@/features/students/students-table/components/student-row';
import { User, Plus } from 'lucide-react';

import { useGetStudents } from '@/features/students/hooks/use-get-students';
import { useAddStudent } from '@/features/groups/hooks/use-add-student';
import { GroupStudent } from '@/features/groups/utils/types';

export function AddStudentToGroupDialog({
  groupId,
  existingStudentIds,
  title = 'Add student',
  open,
  onOpenChange,
}: {
  groupId: string;
  existingStudentIds: number[];
  title?: string;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [q, setQ] = React.useState('');

  const isControlled = typeof open === 'boolean' && !!onOpenChange;
  const actualOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const { data: allStudents = [], isLoading } = useGetStudents();
  const addMutation = useAddStudent(groupId);

  const available = React.useMemo(() => {
    const blocked = new Set(existingStudentIds);
    const query = q.trim().toLowerCase();

    return (allStudents as GroupStudent[])
      .filter((s) => !blocked.has(s.id))
      .filter((s) => {
        if (!query) return true;
        return (
          String(s.name ?? '')
            .toLowerCase()
            .includes(query) ||
          String(s.username ?? '')
            .toLowerCase()
            .includes(query) ||
          String(s.telegramValue ?? '')
            .toLowerCase()
            .includes(query) ||
          String(s.level ?? '')
            .toLowerCase()
            .includes(query)
        );
      });
  }, [allStudents, existingStudentIds, q]);

  const onPick = (studentId: number) => {
    addMutation.mutate(studentId, {
      onSuccess: () => {
        setOpen(false);
        setQ('');
      },
    });
  };

  return (
    <ResponsiveModal
      open={actualOpen}
      onOpenChange={setOpen}
      trigger={
        <Button
          type="button"
          variant="outline"
          className="w-full whitespace-nowrap rounded-full px-5 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add student
        </Button>
      }
      title={title}
    >
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name / username / telegram / level..."
        className="mb-3"
        autoFocus
      />

      {isLoading ? (
        <div className="ui-meta py-6">Loading…</div>
      ) : available.length === 0 ? (
        <div className="ui-meta py-6">No available students</div>
      ) : (
        <div className="flex flex-col gap-2">
          {available.map((s: GroupStudent) => {
            const AgeIcon = AGE_ICONS[s.ageGroup] ?? User;
            const telegram = s.username?.trim() ? `@${s.username.trim()}` : '—';
            const level = s.level?.trim() ? s.level.trim() : '—';

            const pending = addMutation.isPending && addMutation.variables === s.id;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onPick(s.id)}
                disabled={pending}
                className={cn('ui-inset-x ui-list-row px-4', 'text-left', pending && 'opacity-60')}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <StudentAvatar
                    username={s.username ?? null}
                    avatarUrl={s.avatarUrl ?? null}
                    FallbackIcon={(props) => <AgeIcon {...props} />}
                    size={36}
                  />

                  <div className="min-w-0">
                    <div className="ui-title truncate">{s.name}</div>
                    <div className="ui-meta truncate">{telegram}</div>
                  </div>
                </div>

                <div className="shrink-0 ml-4 flex items-center gap-2">
                  <span className={cn('ui-pill', level === '—' && 'opacity-70')}>{level}</span>
                  {pending ? <span className="ui-meta">Adding…</span> : null}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </ResponsiveModal>
  );
}
