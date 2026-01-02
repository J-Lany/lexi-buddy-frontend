'use client';

import { Button } from '@/components/ui/button';
import { getTypeLabel } from '@/features/lessons/create-lesson-modal/components/step-assignments/utils';
import {
  ASSIGNMENT_TYPES,
  CreateLessonDraft,
  EAssigmentType,
  TAssignment,
} from '@/features/lessons/create-lesson-modal/types';
import { AssignmentCard } from '@/features/lessons/create-lesson-modal/components/step-assignments/assignment-card';
import {
  Panel,
  StatusPill,
} from '@/features/lessons/create-lesson-modal/components/step-assignments/panels';
import { Divider } from '@/components/ui/divider';
import { cn } from '@/lib/utils';

type Props = {
  draft: CreateLessonDraft;

  generatedAssignments: Record<string, TAssignment[]>;
  expandedTypes: Record<string, boolean>;

  loadingType: EAssigmentType | null;
  isAnyLoading: boolean;

  errorMessage: string | null;

  onToggleExpanded: (type: EAssigmentType) => void;
  onGenerate: (type: EAssigmentType) => void;
  onAssignmentChange: (type: EAssigmentType, index: number, updated: TAssignment) => void;
};

export function StepAssignments({
  generatedAssignments,
  expandedTypes,
  loadingType,
  isAnyLoading,
  onToggleExpanded,
  onGenerate,
  onAssignmentChange,
  errorMessage,
}: Props) {
  return (
    <div className="space-y-4">
      {errorMessage ? (
        <div className="ui-panel rounded-3xl px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      {ASSIGNMENT_TYPES.map((type) => {
        const key = String(type);
        const assignments = generatedAssignments?.[key] ?? [];
        const count = assignments.length;

        const isExpanded = Boolean(expandedTypes?.[key]);
        const isLoading = loadingType === type;

        const canShow = count > 0;
        const primaryLabel = count > 0 ? 'Regenerate' : 'Generate';

        return (
          <Panel key={key} className="ui-radius-card">
            <div className="px-4 py-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="ui-title">{getTypeLabel(type)}</div>
                <div className="ui-meta">{count > 0 ? 'Ready to review' : 'Not generated'}</div>
              </div>

              <div className="flex items-center gap-2">
                <StatusPill loading={isLoading} count={count} />

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onGenerate(type)}
                  disabled={isAnyLoading}
                  className="h-9 rounded-full px-4"
                >
                  {primaryLabel}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleExpanded(type)}
                  disabled={!canShow && !isExpanded}
                  className={cn(
                    'h-9 rounded-full px-3',
                    canShow
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'text-muted-foreground/50',
                  )}
                >
                  {isExpanded ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>

            <Divider />

            <div className="px-4 py-4">
              {isExpanded ? (
                <div className="space-y-4">
                  {count > 0 ? (
                    assignments.map((assignment, index) => (
                      <div key={`${key}-${index}`} className="ui-row ui-radius-card p-3">
                        <AssignmentCard
                          assignment={assignment}
                          onChange={(updated) => onAssignmentChange(type, index, updated)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="ui-meta">Generate tasks first, then review them here.</div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="ui-meta">
                    {count > 0 ? 'Tap Show to edit tasks.' : 'Tap Generate to create tasks.'}
                  </div>
                  {count > 0 ? <div className="ui-stat">{count}</div> : null}
                </div>
              )}
            </div>
          </Panel>
        );
      })}
    </div>
  );
}
