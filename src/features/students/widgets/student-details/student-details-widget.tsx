'use client';

import { useStudentDashboardQuery } from '@/entities/students/model/queries/get-student-dashboard';
import StudentProfileSummary from '@/features/students/widgets/student-details/ui/student-profile-summary/student-profile-summary';
import { useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';
import { DetailsErrorCard } from '@/shared/ui/details/details-error-card';
import DetailsLayoutSkeleton from '@/shared/ui/details/details-layout-skeleton';
import { NavBack } from '@/shared/ui/nav-back';

import { StudentLessonsList } from './ui/student-lessons-list/student-lessons-list';

export default function StudentDetailsWidget({ studentId }: { studentId: number }) {
  const { t } = useI18n();
  const { data, isLoading, isError } = useStudentDashboardQuery(studentId);

  if (isLoading) return <DetailsLayoutSkeleton />;

  if (isError || !data)
    return (
      <DetailsErrorCard
        backHref={routes.students}
        backLabel={t('students.details.backLabel')}
        title={t('students.details.error')}
        description={t('students.details.errorDesc')}
      />
    );

  const { stats, student, groups, lessons } = data;

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="pt-1">
        <NavBack href={routes.students} label={t('students.details.backLabel')} />
      </div>
      <StudentProfileSummary
        student={student}
        groups={groups}
        stats={stats}
        lessonsTotal={lessons.length}
      />
      <StudentLessonsList lessons={lessons} studentId={student.id} />
    </div>
  );
}
