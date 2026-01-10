'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { GroupDashboard, GroupLesson } from '@/features/groups/utils/types';
import {
  Row,
  SectionLabel,
} from '@/features/students/student-details/components/additional-components';
import { Divider } from '@/components/ui/divider';
import { BookOpen, Users, GraduationCap, Info } from 'lucide-react';

export default function GroupHeaderCard({
  group,
  lessons,
}: {
  group: GroupDashboard['group'];
  lessons: GroupLesson[];
}) {
  const lessonsCount = lessons.length;
  const studentsCount = group.studentsCount ?? 0;

  const avgCompletion =
    lessonsCount > 0
      ? Math.round(lessons.reduce((a, l) => a + l.progress.percentDone, 0) / lessonsCount)
      : 0;

  const completedLessons = lessons.filter((l) => l.progress.studentsDone > 0).length;

  const groupSurface = cn(
    'overflow-hidden',
    'rounded-2xl',
    'md:rounded-3xl md:border md:border-[color:var(--border-soft)]',
    'bg-[color:var(--surface)]',
  );

  return (
    <Card className={cn('ui-card-static ui-radius-card gap-0')}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="text-[22px] sm:text-[24px] font-semibold tracking-tight truncate">
                {group.name}
              </div>

              {group.level ? (
                <span className="ui-pill !h-7 !px-3 opacity-90 shrink-0">{group.level}</span>
              ) : null}
            </div>

            <div className="ui-meta mt-1">Group overview</div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="ui-meta tabular-nums">{studentsCount}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="!p-0">
        <div className="px-5 sm:px-6 pb-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div className="min-w-0">
              <SectionLabel>About</SectionLabel>

              <div className={groupSurface}>
                <Row
                  label="Level"
                  value={group.level ?? '—'}
                  icon={<GraduationCap className="h-4 w-4" />}
                />
                <Divider />

                <Row label="Students" value={studentsCount} icon={<Users className="h-4 w-4" />} />
                {group.description?.trim() ? (
                  <>
                    <Divider />
                    <Row
                      label="Description"
                      value={group.description}
                      icon={<Info className="h-4 w-4" />}
                      valueTone="muted"
                    />
                  </>
                ) : null}
              </div>
            </div>

            <div className="min-w-0 mt-6 md:mt-0">
              <SectionLabel>Activity</SectionLabel>

              <div className={groupSurface}>
                <Row label="Lessons" value={lessonsCount} icon={<BookOpen className="h-4 w-4" />} />
                <Divider />

                <Row label="Avg progress" value={`${avgCompletion}%`} valueTone="muted" />
                <Divider />

                <Row label="Completed lessons" value={completedLessons} valueTone="muted" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
