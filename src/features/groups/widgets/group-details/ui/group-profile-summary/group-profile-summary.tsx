'use client';

import * as React from 'react';

import { GroupDashboardDto, GroupLesson } from '@/entities/groups/api/get-group-dashboard';
import { cn } from '@/shared/lib/cn';
import { Card, CardContent } from '@/shared/ui/card';

import { calcAvgCompletion, calcCompletedLessons } from './group-profile-summary.helpers';
import { AboutSection } from './sections/about-section';
import { ActivitySection } from './sections/activity-section';
import { HeaderSection } from './sections/header-section';

type Props = {
  group: GroupDashboardDto['group'];
  lessons: GroupLesson[];
};

export function GroupProfileSummary({ group, lessons }: Props) {
  const lessonsCount = lessons.length;
  const studentsCount = group.studentsCount ?? 0;

  const avgCompletion = React.useMemo(() => calcAvgCompletion(lessons), [lessons]);
  const completedLessons = React.useMemo(() => calcCompletedLessons(lessons), [lessons]);

  const title = group.name?.trim() || 'Untitled group';
  const levelLabel = group.level?.trim() ? group.level : null;

  const avgCompletionLabel = `${avgCompletion}%`;

  return (
    <Card className={cn('ui-card-static ui-radius-card gap-0')}>
      <HeaderSection title={title} levelLabel={levelLabel} studentsCount={studentsCount} />

      <CardContent className="!p-0">
        <div className="px-5 sm:px-6 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <AboutSection group={group} studentsCount={studentsCount} />
            <ActivitySection
              lessonsCount={lessonsCount}
              avgCompletionLabel={avgCompletionLabel}
              completedLessons={completedLessons}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
