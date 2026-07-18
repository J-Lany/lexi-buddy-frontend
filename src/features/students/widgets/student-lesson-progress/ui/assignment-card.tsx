'use client';

import { useEffect, useMemo } from 'react';

import type { StudentLessonProgressAssignmentDto } from '@/entities/students/api/get-student-lesson-progress';
import { useActiveTab } from '@/shared/hooks/use-active-tab';

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
    return <div className="ui-meta mt-4 pl-1">No attempts yet</div>;
  }

  return (
    <div className="py-5">
      {attemptNos.length > 1 ? (
        <div className="mt-4">
          <AttemptSegmented
            attempts={attemptNos}
            value={activeAttempt.attemptNo}
            onChange={setActiveAttemptNo}
          />
        </div>
      ) : null}

      <div className="space-y-3">
        {activeAttempt.questions.map((q) => (
          <QuestionRow key={q.id} q={q} />
        ))}
      </div>
    </div>
  );
}
