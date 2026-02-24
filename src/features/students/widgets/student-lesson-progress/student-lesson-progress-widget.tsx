'use client';

import { useMemo } from 'react';

import { useStudentLessonProgressQuery } from '@/entities/students/model/queries/get-student-lesson-progress';
import type { AssignmentType } from '@/shared/domain/assignment';
import { useActiveTab } from '@/shared/hooks/use-active-tab';
import { groupBy } from '@/shared/lib/group-by';
import { routes } from '@/shared/router/routes';
import { AssignmentTabs } from '@/shared/ui/assignment-tabs';
import { Card } from '@/shared/ui/card';
import { DetailsErrorCard } from '@/shared/ui/details/details-error-card';
import DetailsLayoutSkeleton from '@/shared/ui/details/details-layout-skeleton';
import { NavBack } from '@/shared/ui/nav-back';

import { AssignmentCard } from './ui/assignment-card';
import { SummaryCard } from './ui/summary-card';

type Props = {
  studentId: number;
  lessonId: number;
};

export default function StudentLessonProgressWidget({ studentId, lessonId }: Props) {
  const { data, isLoading, isError } = useStudentLessonProgressQuery(studentId, lessonId);

  const assignments = useMemo(() => data?.assignments ?? [], [data?.assignments]);
  const grouped = useMemo(() => groupBy(assignments, (a) => a.type.name), [assignments]);

  const types = useMemo(() => Array.from(grouped.keys()), [grouped]);

  const { active: activeType, setActive: setActiveType } = useActiveTab<AssignmentType>(types);

  const activeAssignments = activeType ? (grouped.get(activeType) ?? []) : [];

  if (isLoading) return <DetailsLayoutSkeleton />;

  if (isError || !data) {
    return (
      <DetailsErrorCard
        backHref={`${routes.students}/${studentId}`}
        backLabel="Student"
        title="Unable to load progress"
        description="The progress couldn’t be loaded. Please try again."
      />
    );
  }

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="pt-1">
        <NavBack href={`${routes.students}/${studentId}`} label="Student" />
      </div>

      <SummaryCard lessonTitle={data.lesson.title} student={data.student} overall={data.overall} />

      {activeType ? (
        <AssignmentTabs types={types} activeType={activeType} onChange={setActiveType} />
      ) : null}

      <section className="flex flex-col gap-4">
        {assignments.length === 0 ? (
          <Card className="ui-card ui-radius-card px-5 sm:px-6 py-4">
            <div className="ui-meta">No assignments in this lesson yet</div>
          </Card>
        ) : activeAssignments.length === 0 ? (
          <Card className="ui-card ui-radius-card px-5 sm:px-6 py-4">
            <div className="ui-meta">No assignments of this type</div>
          </Card>
        ) : (
          activeAssignments.map((a) => <AssignmentCard key={a.id} assignment={a} />)
        )}
      </section>
    </div>
  );
}
