'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { AssignLessonModal } from '@/features/lessons/lesson-details/components/assign-lesson-modal';
import { EmptyState } from '@/features/lessons/lesson-details/components/lesson-assignees/components/empty-state';
import { GroupsSection } from '@/features/lessons/lesson-details/components/lesson-assignees/components/group-section';
import { StudentsSection } from '@/features/lessons/lesson-details/components/lesson-assignees/components/student-section';
import { SegmentedControl } from '@/components/ui/segmented-control';

type Props = {
  lesson: LessonDetails;
};

const STUDENT_FILTERS = [
  { value: 'ALL', label: 'All' },
  { value: 'NOT_STARTED', label: 'Not started' },
  { value: 'PENDING', label: 'In progress' },
  { value: 'COMPLETED', label: 'Completed' },
] as const;

type FilterKey = (typeof STUDENT_FILTERS)[number]['value'];

export function LessonAssigneesCard({ lesson }: Props) {
  const groups = lesson.groups ?? [];
  const students = lesson.students ?? [];
  const hasAnything = groups.length > 0 || students.length > 0;

  const studentIds = students.map((s) => s.id);
  const groupsIds = groups.map((g) => g.id);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('ALL');

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();

    return students
      .filter((s) => (filter === 'ALL' ? true : s.status === filter))
      .filter((s) => {
        if (!q) return true;

        const name = [s.firstName, s.lastName].filter(Boolean).join(' ').toLowerCase() || '';
        const username = (s.username ?? '').toLowerCase();

        return name.includes(q) || username.includes(q);
      });
  }, [students, query, filter]);

  if (!hasAnything) {
    return (
      <Card className="ui-panel ui-radius-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-base sm:text-lg">Assigned</CardTitle>
            <div className="shrink-0">
              <AssignLessonModal
                lessonId={lesson.id}
                studentIdsInLesson={studentIds}
                groupsIdsInLesson={groupsIds}
              />
            </div>
          </div>
          <div className="ui-meta">0 students · 0 groups</div>
        </CardHeader>

        <EmptyState />
      </Card>
    );
  }

  return (
    <Card className="ui-panel ui-radius-card">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base sm:text-lg">Assigned</CardTitle>
          <div className="shrink-0">
            <AssignLessonModal
              lessonId={lesson.id}
              studentIdsInLesson={studentIds}
              groupsIdsInLesson={groupsIds}
            />
          </div>
        </div>

        <div className="ui-meta">
          {students.length} students · {groups.length} groups
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full max-w-4xl space-y-6">
          <div className="space-y-3">
            <div className="ui-meta uppercase tracking-wide">Students</div>

            <div
              className="rounded-2xl py-2"
              style={{ background: 'color-mix(in oklch, var(--background) 92%, white 8%)' }}
            >
              <div className="flex flex-col gap-3 lg:hidden">
                <div className="overflow-x-auto ui-scroll">
                  <div className="min-w-max">
                    <SegmentedControl<FilterKey>
                      value={filter}
                      onChange={setFilter}
                      options={[
                        { value: 'ALL', label: 'All' },
                        { value: 'NOT_STARTED', label: 'Not started' },
                        { value: 'PENDING', label: 'In progress' },
                        { value: 'COMPLETED', label: 'Completed' },
                      ]}
                      className="w-auto ui-seg--flush"
                    />
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 rounded-2xl border px-3 py-2"
                  style={{
                    background: 'color-mix(in oklch, var(--background) 92%, white 8%)',
                    borderColor: 'var(--border-soft)',
                  }}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search student"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="hidden lg:flex lg:items-center lg:gap-3">
                <div className="min-w-0 flex-1">
                  <SegmentedControl<FilterKey>
                    value={filter}
                    onChange={setFilter}
                    options={[
                      { value: 'ALL', label: 'All' },
                      { value: 'NOT_STARTED', label: 'Not started' },
                      { value: 'PENDING', label: 'In progress' },
                      { value: 'COMPLETED', label: 'Completed' },
                    ]}
                    className="w-full"
                  />
                </div>

                <div className="w-[340px]">
                  <div
                    className="flex items-center gap-2 rounded-2xl border px-3 py-2"
                    style={{
                      background: 'color-mix(in oklch, var(--background) 92%, white 8%)',
                      borderColor: 'var(--border-soft)',
                    }}
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search student"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            <StudentsSection students={filteredStudents} />
          </div>

          <div className="border-t" style={{ borderColor: 'var(--border-soft)' }} />

          <div className="space-y-3">
            <div className="ui-meta uppercase tracking-wide">Groups</div>
            <GroupsSection groups={groups} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
