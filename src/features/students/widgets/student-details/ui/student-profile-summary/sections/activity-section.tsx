'use client';

import { useI18n } from '@/shared/i18n';
import { DetailsRow } from '@/shared/ui/details/details-row';
import { detailsSectionSurface } from '@/shared/ui/details/details-section-surface';
import { SectionLabel } from '@/shared/ui/details/section-label';
import { Divider } from '@/shared/ui/divider';

type Props = {
  lessonsTotal: number;
  assignmentsDone: number;
  assignmentsTotal: number;
  avgScoreLabel: string;
  lastSubmissionLabel: string;
  progressLabel?: string;
  hasAnyActivity: boolean;
};

export function ActivitySection({
  lessonsTotal,
  assignmentsDone,
  assignmentsTotal,
  avgScoreLabel,
  lastSubmissionLabel,
  progressLabel,
  hasAnyActivity,
}: Props) {
  const { t } = useI18n();

  return (
    <div className="min-w-0 mt-6 md:mt-0">
      <SectionLabel>{t('students.activity.title')}</SectionLabel>

      <div className={detailsSectionSurface}>
        <DetailsRow label={t('students.activity.lessons')} value={lessonsTotal} />
        <Divider />

        <DetailsRow
          label={t('students.activity.assignments')}
          value={`${assignmentsDone}/${assignmentsTotal}`}
        />
        <Divider />

        <DetailsRow label={t('students.activity.avgScore')} value={avgScoreLabel} />
        <Divider />

        <DetailsRow label={t('students.activity.lastSubmission')} value={lastSubmissionLabel} />

        {progressLabel ? (
          <>
            <Divider />
            <DetailsRow
              label={t('students.activity.progress')}
              value={progressLabel}
              valueTone="muted"
            />
          </>
        ) : null}
      </div>

      {!hasAnyActivity ? (
        <div className="ui-meta px-1 pt-3">{t('students.activity.noActivity')}</div>
      ) : null}
    </div>
  );
}
