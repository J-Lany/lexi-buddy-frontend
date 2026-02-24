'use client';

import { useMemo } from 'react';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { AssignmentBlock } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignments/ui/assignment-block';
import type { AssignmentType } from '@/shared/domain/assignment/assignment-type';
import { useActiveTab } from '@/shared/hooks/use-active-tab';
import { groupBy } from '@/shared/lib/group-by';
import { AssignmentTabs } from '@/shared/ui/assignment-tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type Props = {
  assignments: LessonDashboardDto['assignments'];
};

export function LessonAssignments({ assignments }: Props) {
  const grouped = useMemo(() => groupBy(assignments, (a) => a.type.name), [assignments]);
  const types = useMemo(() => Array.from(grouped.keys()), [grouped]);

  const { active: activeType, setActive: setActiveType } = useActiveTab<AssignmentType>(types);

  const activeAssignments = activeType ? (grouped.get(activeType) ?? []) : [];

  return (
    <Card className="ui-panel ui-radius-card">
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
      </CardHeader>

      <CardContent className="text-sm">
        {assignments.length === 0 ? (
          <div className="text-muted-foreground">No assignments</div>
        ) : (
          <>
            {activeType ? (
              <AssignmentTabs types={types} activeType={activeType} onChange={setActiveType} />
            ) : null}

            {activeAssignments.length === 0 ? (
              <div className="mt-4 text-xs text-muted-foreground">No assignments of this type</div>
            ) : (
              <div className="mt-4 space-y-3">
                {activeAssignments.map((assignment) => (
                  <AssignmentBlock key={assignment.id} assignment={assignment} />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
