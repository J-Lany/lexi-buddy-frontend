'use client';

import { AssignmentPreviewDto } from '@/entities/lessons/api/create-assignments-preview';
import type { CreateLessonDraft } from '@/features/lessons/modals/create-lesson-modal/model/types';
import { AssignmentCard } from '@/features/lessons/modals/create-lesson-modal/ui/step-assignments/ui/assignment-card';
import {
  Panel,
  StatusPill,
} from '@/features/lessons/modals/create-lesson-modal/ui/step-assignments/ui/panels';
import { ASSIGNMENT_TYPE_LABELS } from '@/shared/catalogs/assignment';
import { ALL_ASSIGNMENT_TYPES, AssignmentType } from '@/shared/domain/assignment';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Divider } from '@/shared/ui/divider';

type Props = {
  draft: CreateLessonDraft;

  generatedAssignments: Partial<Record<AssignmentType, AssignmentPreviewDto[]>>;
  expandedTypes: Record<AssignmentType, boolean>;

  loadingType: AssignmentType | null;
  isAnyLoading: boolean;

  errorMessage: string | null;

  onToggleExpandedAction: (type: AssignmentType) => void;
  onGenerateAction: (type: AssignmentType) => void;
  onAssignmentChangeAction: (
    type: AssignmentType,
    index: number,
    updated: AssignmentPreviewDto,
  ) => void;
};

export function StepAssignments({
  generatedAssignments,
  expandedTypes,
  loadingType,
  isAnyLoading,
  onToggleExpandedAction,
  onGenerateAction,
  onAssignmentChangeAction,
  errorMessage,
}: Props) {
  return (
    <div className="space-y-5">
      {errorMessage ? (
        <div className="ui-panel rounded-3xl px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      {ALL_ASSIGNMENT_TYPES.map((type) => {
        const assignments = generatedAssignments[type] ?? [];
        const count = assignments.length;

        const isExpanded = expandedTypes[type];
        const isLoading = loadingType === type;

        const canShow = count > 0;
        const primaryLabel = count > 0 ? 'Regenerate' : 'Generate';

        return (
          <Panel key={type} className={cn('ui-radius-card', canShow && 'bg-info-soft!')}>
            <div className="px-4 py-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="ui-title">{ASSIGNMENT_TYPE_LABELS[type]}</div>
                <div className="ui-meta">{count > 0 ? 'Ready to review' : 'Not generated'}</div>
              </div>

              <div className="flex items-center gap-2">
                <StatusPill count={count} />

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onGenerateAction(type)}
                  disabled={isAnyLoading}
                  className="h-9 rounded-full px-4"
                >
                  {isLoading ? 'Generating…' : primaryLabel}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleExpandedAction(type)}
                  disabled={!canShow && !isExpanded}
                  className={cn(
                    'h-9 rounded-full px-3',
                    canShow ? 'text-primary hover:text-foreground' : 'text-muted-foreground/50',
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
                      <div key={`${type}-${index}`} className="ui-row ui-radius-card p-3">
                        <AssignmentCard
                          assignment={assignment}
                          onChange={(updated) => onAssignmentChangeAction(type, index, updated)}
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
