'use client';

import { BookOpen } from 'lucide-react';

import { DetailsRow } from '@/shared/ui/details/details-row';
import { detailsSectionSurface } from '@/shared/ui/details/details-section-surface';
import { SectionLabel } from '@/shared/ui/details/section-label';
import { Divider } from '@/shared/ui/divider';

type Props = {
  lessonsCount: number;
  avgCompletionLabel: string;
  completedLessons: number;
};

export function ActivitySection({ lessonsCount, avgCompletionLabel, completedLessons }: Props) {
  return (
    <div className="min-w-0 mt-6 md:mt-0">
      <SectionLabel>Activity</SectionLabel>

      <div className={detailsSectionSurface}>
        <DetailsRow label="Lessons" value={lessonsCount} icon={<BookOpen className="h-4 w-4" />} />
        <Divider />

        <DetailsRow label="Avg progress" value={avgCompletionLabel} valueTone="muted" />
        <Divider />

        <DetailsRow label="Completed lessons" value={completedLessons} valueTone="muted" />
      </div>
    </div>
  );
}
