'use client';

import { useEffect, useMemo } from 'react';

import type { StudentLessonProgressAssignmentDto } from '@/entities/students/api/get-student-lesson-progress';
import { useActiveTab } from '@/shared/hooks/use-active-tab';
import { Card } from '@/shared/ui/card';

import { AttemptSegmented } from './attempt-segmented';
import { QuestionRow } from './question-row';

export function AssignmentCard({ assignment }: { assignment: StudentLessonProgressAssignmentDto }) {
  const attempts = useMemo(() => assignment.attempts ?? [], [assignment.attempts]);
  const attemptNos = useMemo(() => attempts.map((a) => a.attemptNo), [attempts]);

  const { active: activeAttemptNo, setActive: setActiveAttemptNo } =
    useActiveTab<number>(attemptNos);

  useEffect(() => {
    if (attemptNos.length === 0) return;

    const last = attemptNos.at(-1)!;

    if (activeAttemptNo === null || !attemptNos.includes(activeAttemptNo)) {
      setActiveAttemptNo(last);
    }
  }, [attemptNos, activeAttemptNo, setActiveAttemptNo]);

  const activeAttempt =
    attempts.find((a) => a.attemptNo === activeAttemptNo) ?? attempts.at(-1) ?? null;

  if (attemptNos.length === 0 || !activeAttempt) {
    return (
      <Card className="ui-card ui-radius-card px-5 sm:px-6 py-5">
        <div className="ui-meta mt-2">No attempts yet</div>
      </Card>
    );
  }

  return (
    <Card className="ui-card-static ui-radius-card px-5 sm:px-6 py-5">
      {attemptNos.length > 1 ? (
        <div className="mt-4">
          <AttemptSegmented
            attempts={attemptNos}
            value={activeAttempt.attemptNo}
            onChange={setActiveAttemptNo}
          />
        </div>
      ) : null}

      <div className="mt-4 space-y-3">
        {activeAttempt.questions.map((q) => (
          <QuestionRow key={q.id} q={q} />
        ))}
      </div>
    </Card>
  );
}
