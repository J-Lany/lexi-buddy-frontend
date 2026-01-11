'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate, formatName } from '@/features/students/utils/helpers';
import type { StudentDashboard } from '@/features/students/utils/types';
import { AGE_SELECTORS, LEVELS } from '@/lib/consts';
import { Lock, Pencil, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Row,
  SectionLabel,
} from '@/features/students/student-details/components/additional-components';
import { Divider } from '@/components/ui/divider';
import { StudentAvatar } from '@/features/students/students-table/components/student-avatar';
import { AGE_ICONS } from '@/features/students/students-table/components/student-row';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { useUpdateStudentProfile } from '@/features/students/hooks/use-update-student-profile';
import { EAgeGroup, ELevel } from '@/lib/enums';
import { EditStudentNameModal } from '@/features/students/student-details/components/edit-student-name-modal';
import { ResponsiveSelect } from '@/components/ui/responsive-select';

type EditField = 'name' | 'level' | 'ageGroup';

export default function StudentHeaderCard({
  student,
  groups,
  stats,
  lessonsTotal,
}: {
  student: StudentDashboard['student'];
  groups: StudentDashboard['groups'];
  stats: StudentDashboard['stats'];
  lessonsTotal: number;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [editField, setEditField] = React.useState<EditField | null>(null);

  const title = formatName(student);
  const AgeIcon = student.ageGroup ? AGE_ICONS[student.ageGroup as EAgeGroup] : User;
  const updateMutation = useUpdateStudentProfile(student.id);

  const levelValue = student.level ?? '';
  const ageGroupValue = student.ageGroup ?? '';

  const onEdit = (field: EditField) => setEditField(field);
  const closeEdit = () => setEditField(null);

  const saveName = async (firstName: string, lastName: string) => {
    await updateMutation.mutateAsync({
      studentId: student.id,
      firstName,
      lastName,
    });
    closeEdit();
  };

  const hasAnyActivity =
    lessonsTotal > 0 ||
    stats.assignmentsTotal > 0 ||
    typeof stats.avgScore === 'number' ||
    !!stats.lastSubmittedAt ||
    stats.progressPercent > 0;

  const groupSurface = cn(
    'overflow-hidden',
    'rounded-2xl',
    'md:rounded-3xl md:border md:border-[color:var(--border-soft)]',
    'bg-[color:var(--surface)]',
  );

  return (
    <Card className={cn('ui-card-static ui-radius-card gap-0')}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-[22px] sm:text-[24px] font-semibold tracking-tight truncate">
                {title}
              </div>

              <button
                type="button"
                className={cn(
                  'ui-focus inline-flex items-center justify-center rounded-full h-9 w-9',
                  'text-muted-foreground hover:text-foreground transition-colors',
                )}
                aria-label="Edit name"
                onClick={() => onEdit('name')}
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>

            <div className="ui-meta mt-1">Student profile</div>
          </div>

          <div className="flex items-center">
            <StudentAvatar
              username={student.username ?? null}
              avatarUrl={student.avatarUrl ?? null}
              FallbackIcon={(props) => <AgeIcon {...props} />}
              size={isDesktop ? 44 : 32}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="!p-0">
        <div className="px-5 sm:px-6 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div className="min-w-0">
              <SectionLabel>About</SectionLabel>

              <div className={groupSurface}>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="text-[13px] text-muted-foreground">Level</div>

                  <div className="min-w-[170px] max-w-[220px]">
                    <ResponsiveSelect
                      value={levelValue}
                      onValueChange={(v) => {
                        if (v === levelValue) {
                          return;
                        }
                        updateMutation.mutate({
                          studentId: student.id,
                          level: v as ELevel,
                        });
                      }}
                      placeholder="—"
                      title="Choose level"
                      options={LEVELS}
                      triggerClassName="h-9 rounded-xl px-3"
                    />
                  </div>
                </div>
                <Divider />

                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="text-[13px] text-muted-foreground">Age group</div>

                  <div className="min-w-[170px] max-w-[260px]">
                    <ResponsiveSelect
                      value={ageGroupValue}
                      onValueChange={(v) => {
                        if (v === ageGroupValue) {
                          return;
                        }
                        updateMutation.mutate({
                          studentId: student.id,
                          ageGroup: v as EAgeGroup,
                        });
                      }}
                      placeholder="—"
                      title="Choose age group"
                      options={AGE_SELECTORS}
                      triggerClassName="h-9 rounded-xl px-3"
                    />
                  </div>
                </div>
                <Divider />

                <Row
                  label="Telegram"
                  value={`@${student.username ?? '—'}`}
                  icon={<Lock className="h-4 w-4" />}
                  valueTone="tint"
                />
                <Divider />

                <Row label="Last visit" value={formatDate(student.lastVisit) ?? '—'} />
              </div>
            </div>

            <div className="min-w-0 mt-6 md:mt-0">
              <SectionLabel>Activity</SectionLabel>

              <div className={groupSurface}>
                <Row label="Lessons" value={lessonsTotal} />
                <Divider />

                <Row
                  label="Assignments"
                  value={`${stats.assignmentsDone}/${stats.assignmentsTotal}`}
                />
                <Divider />

                <Row
                  label="Avg score"
                  value={typeof stats.avgScore === 'number' ? stats.avgScore.toFixed(2) : '—'}
                />
                <Divider />

                <Row label="Last submission" value={formatDate(stats.lastSubmittedAt) ?? '—'} />

                {stats.progressPercent > 0 ? (
                  <>
                    <Divider />
                    <Row label="Progress" value={`${stats.progressPercent}%`} valueTone="muted" />
                  </>
                ) : null}
              </div>

              {!hasAnyActivity ? <div className="ui-meta px-1 pt-3">No activity yet</div> : null}
            </div>
          </div>

          {groups.length ? (
            <div className="mt-6">
              <div className="ui-meta mb-2 px-1">Groups</div>
              <div className="flex flex-wrap gap-2">
                {groups.map((g) => (
                  <span
                    key={g.id}
                    className="ui-pill !h-7 !px-3 max-w-full truncate opacity-85"
                    title={g.name}
                  >
                    {g.name}
                    {g.level ? ` · ${g.level}` : ''}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
      <EditStudentNameModal
        open={editField === 'name'}
        onOpenChange={(open) => setEditField(open ? 'name' : null)}
        initial={{
          firstName: student.firstName,
          lastName: student.lastName,
        }}
        saving={updateMutation.isPending}
        onSave={({ firstName, lastName }) => saveName(firstName, lastName)}
      />
    </Card>
  );
}
