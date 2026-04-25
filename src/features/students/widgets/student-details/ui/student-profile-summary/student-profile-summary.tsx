'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { StudentDashboardDto } from '@/entities/students/api/get-student-dashboard';
import { useRemoveStudentRelationshipMutation } from '@/entities/students/model/mutation/remove-student-relationship';
import { useUpdateStudentProfileMutation } from '@/entities/students/model/mutation/update-student-profile';
import { formatDate, formatName } from '@/features/students/lib/helpers';
import { RemoveStudentRelationshipConfirm } from '@/features/students/modals/remove-student-relationship-confirm';
import { EditStudentNameModal } from '@/features/students/widgets/student-details/ui/student-profile-summary/modals/edit-student-name-modal';
import { AgeGroup, Level } from '@/shared/domain/common';
import { useMediaQuery } from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/cn';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { routes } from '@/shared/router/routes';
import { Card, CardContent } from '@/shared/ui/card';

import { AboutSection } from './sections/about-section';
import { ActivitySection } from './sections/activity-section';
import { GroupsSection } from './sections/groups-section';
import { HeaderSection } from './sections/header-section';

export default function StudentProfileSummary({
  student,
  groups,
  stats,
  lessonsTotal,
}: {
  student: StudentDashboardDto['student'];
  groups: StudentDashboardDto['groups'];
  stats: StudentDashboardDto['stats'];
  lessonsTotal: number;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isEditNameOpen, setIsEditNameOpen] = React.useState(false);

  const removeRelationshipMutation = useRemoveStudentRelationshipMutation();
  const router = useRouter();

  const title = formatName(student);
  const updateMutation = useUpdateStudentProfileMutation();

  const levelValue = student.level ?? '';
  const ageGroupValue = student.ageGroup ?? '';

  const telegramLabel = student.username?.trim() ? `@${student.username}` : '—';
  const lastVisitLabel = formatDate(student.lastVisit) ?? '—';

  const avgScoreLabel = typeof stats.avgScore === 'number' ? stats.avgScore.toFixed(2) : '—';
  const lastSubmissionLabel = formatDate(stats.lastSubmittedAt) ?? '—';
  const progressLabel = stats.progressPercent > 0 ? `${stats.progressPercent}%` : undefined;

  const hasAnyActivity =
    lessonsTotal > 0 ||
    stats.assignmentsTotal > 0 ||
    typeof stats.avgScore === 'number' ||
    !!stats.lastSubmittedAt ||
    stats.progressPercent > 0;

  const saveName = async (firstName: string, lastName: string) => {
    await updateMutation.mutateAsync({
      studentId: student.id,
      firstName,
      lastName,
    });
    setIsEditNameOpen(false);
  };

  const handleLevelUpdate = (v: Level) => {
    if (v === levelValue) return;

    updateMutation.mutate({
      studentId: student.id,
      level: v,
    });
  };

  const handleAgeGroupUpdate = (v: AgeGroup) => {
    if (v === ageGroupValue) return;

    updateMutation.mutate({
      studentId: student.id,
      ageGroup: v,
    });
  };

  const handleRemoveStudent = async () => {
    try {
      const result = await removeRelationshipMutation.mutateAsync({
        studentId: student.id,
      });

      toast.success('Student removed', {
        description:
          result.revokedAssignments > 0
            ? `Revoked ${result.revokedAssignments} active assignments.`
            : 'You no longer teach this student.',
      });

      router.push(routes.students);
    } catch (error) {
      toast.error('Failed to remove student', {
        description: getErrorMessage(error),
      });

      throw error;
    }
  };

  return (
    <Card className={cn('ui-card-static ui-radius-card gap-0')}>
      <HeaderSection
        title={title}
        avatar={{
          username: student.username ?? null,
          avatarUrl: student.avatarUrl ?? null,
          size: isDesktop ? 44 : 32,
        }}
        onEditName={() => setIsEditNameOpen(true)}
      />

      <CardContent className="!p-0">
        <div className="px-5 sm:px-6 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <AboutSection
              levelValue={levelValue}
              ageGroupValue={ageGroupValue}
              telegramLabel={telegramLabel}
              lastVisitLabel={lastVisitLabel}
              onChangeLevel={handleLevelUpdate}
              onChangeAgeGroup={handleAgeGroupUpdate}
            />

            <ActivitySection
              lessonsTotal={lessonsTotal}
              assignmentsDone={stats.assignmentsDone}
              assignmentsTotal={stats.assignmentsTotal}
              avgScoreLabel={avgScoreLabel}
              lastSubmissionLabel={lastSubmissionLabel}
              progressLabel={progressLabel}
              hasAnyActivity={hasAnyActivity}
            />
          </div>

          <GroupsSection groups={groups} />
          <div className="mt-6 flex justify-end border-t border-border/60 pt-4">
            <RemoveStudentRelationshipConfirm
              studentName={title}
              pending={removeRelationshipMutation.isPending}
              onConfirm={handleRemoveStudent}
            />
          </div>
        </div>
      </CardContent>
      <EditStudentNameModal
        open={isEditNameOpen}
        onOpenChange={setIsEditNameOpen}
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
