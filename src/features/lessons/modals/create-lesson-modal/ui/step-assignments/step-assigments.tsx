'use client';

import { Trash2 } from 'lucide-react';

import { AssignmentPreviewDto } from '@/entities/lessons/api/create-assignments-preview';
import type { CreateLessonDraft } from '@/features/lessons/modals/create-lesson-modal/model/types';
import { AssignmentCard } from '@/features/lessons/modals/create-lesson-modal/ui/step-assignments/ui/assignment-card';
import {
  Panel,
  StatusPill,
} from '@/features/lessons/modals/create-lesson-modal/ui/step-assignments/ui/panels';
import { ASSIGNMENT_TYPE_LABELS } from '@/shared/catalogs/assignment';
import { ALL_ASSIGNMENT_TYPES, AssignmentType } from '@/shared/domain/assignment';
import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Divider } from '@/shared/ui/divider';

type Props = {
  draft: CreateLessonDraft;

  generatedAssignments: Partial<Record<AssignmentType, AssignmentPreviewDto[]>>;
  expandedTypes: Record<AssignmentType, boolean>;

  loadingType: AssignmentType | null;
  isAnyLoading: boolean;
  generateDisabled?: boolean;

  errorMessage: string | null;

  onDeleteAction: (type: AssignmentType) => void;
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
  generateDisabled = false,
  onToggleExpandedAction,
  onGenerateAction,
  onDeleteAction,
  onAssignmentChangeAction,
  errorMessage,
}: Props) {
  const { t } = useI18n();

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
        const primaryLabel =
          count > 0 ? t('lessons.assignments.regenerate') : t('lessons.assignments.generate');

        return (
          <Panel
            key={type}
            className={cn(
              'ui-radius-card',
              canShow && 'bg-info-soft!',
              isLoading && 'ring-2 ring-primary/40 animate-pulse',
            )}
          >
            <div className="px-4 py-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="ui-title">{ASSIGNMENT_TYPE_LABELS[type]}</div>
                <div className="ui-meta">
                  {count > 0
                    ? t('lessons.assignments.readyToReview')
                    : t('lessons.assignments.notGenerated')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusPill count={count} />

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onGenerateAction(type)}
                  disabled={isAnyLoading || generateDisabled}
                  className="h-9 rounded-full px-4"
                >
                  {isLoading ? t('lessons.assignments.generating') : primaryLabel}
                </Button>

                {count > 0 ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteAction(type)}
                    disabled={isAnyLoading}
                    className="h-9 w-9 rounded-full p-0 text-muted-foreground hover:text-destructive"
                    aria-label={`Delete ${ASSIGNMENT_TYPE_LABELS[type]} assignments`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : null}

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
                  {isExpanded ? t('lessons.assignments.hide') : t('lessons.assignments.show')}
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
                    <div className="ui-meta">{t('lessons.assignments.reviewHint')}</div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="ui-meta">
                    {count > 0
                      ? t('lessons.assignments.editHint')
                      : t('lessons.assignments.generateHint')}
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
