'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { AssignmentBlock } from '@/features/lessons/lesson-details/components/lesson-assignments/components/assignment-block';
import { AssignmentTabs } from '@/features/lessons/lesson-details/components/lesson-assignments/components/assignment-tabs';

type Props = {
  assignments: LessonDetails['assignments'];
};

export default function LessonAssignmentsCard({ assignments }: Props) {
  const hasAssignments = assignments.length > 0;

  const grouped = useMemo(() => {
    const map = new Map<string, LessonDetails['assignments']>();

    for (const a of assignments) {
      const key = a.type.name;
      const existing = map.get(key) ?? [];
      existing.push(a);
      map.set(key, existing);
    }

    return map;
  }, [assignments]);

  const types = Array.from(grouped.keys());
  const [activeType, setActiveType] = useState<string | null>(types[0] ?? null);

  const activeAssignments = activeType != null ? (grouped.get(activeType) ?? []) : [];

  return (
    <Card className="ui-panel ui-radius-card">
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
      </CardHeader>

      <CardContent className="text-sm">
        {!hasAssignments ? (
          <div className="text-sm text-muted-foreground">No assignments</div>
        ) : (
          <>
            <AssignmentTabs types={types} activeType={activeType} onChange={setActiveType} />

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
