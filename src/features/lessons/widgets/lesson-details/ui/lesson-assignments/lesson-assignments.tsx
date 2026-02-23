'use client';

import { useEffect, useMemo, useState } from 'react';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { groupAssignmentsByType } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignments/lib/group-assignments-by-type';
import { AssignmentBlock } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignments/ui/assignment-block';
import { AssignmentTabs } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignments/ui/assignment-tabs';
import type { AssignmentType } from '@/shared/domain/assignment/assignment-type';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type Props = {
  assignments: LessonDashboardDto['assignments'];
};

export function LessonAssignments({ assignments }: Props) {
  const grouped = useMemo(() => groupAssignmentsByType(assignments), [assignments]);
  const types = useMemo(() => Array.from(grouped.keys()), [grouped]);

  const [activeType, setActiveType] = useState<AssignmentType | null>(types[0] ?? null);

  useEffect(() => {
    if (types.length === 0) {
      if (activeType !== null) setActiveType(null);
      return;
    }

    if (activeType === null || !grouped.has(activeType)) {
      setActiveType(types[0]);
    }
  }, [types, grouped, activeType]);

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
            {activeType && (
              <AssignmentTabs types={types} activeType={activeType} onChange={setActiveType} />
            )}

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
