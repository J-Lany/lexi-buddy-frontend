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
  return (
    <div className="min-w-0 mt-6 md:mt-0">
      <SectionLabel>Activity</SectionLabel>

      <div className={detailsSectionSurface}>
        <DetailsRow label="Lessons" value={lessonsTotal} />
        <Divider />

        <DetailsRow label="Assignments" value={`${assignmentsDone}/${assignmentsTotal}`} />
        <Divider />

        <DetailsRow label="Avg score" value={avgScoreLabel} />
        <Divider />

        <DetailsRow label="Last submission" value={lastSubmissionLabel} />

        {progressLabel ? (
          <>
            <Divider />
            <DetailsRow label="Progress" value={progressLabel} valueTone="muted" />
          </>
        ) : null}
      </div>

      {!hasAnyActivity ? <div className="ui-meta px-1 pt-3">No activity yet</div> : null}
    </div>
  );
}
