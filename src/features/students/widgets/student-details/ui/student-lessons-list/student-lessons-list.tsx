'use client';

import type { StudentDashboardDto } from '@/entities/students/api/get-student-dashboard';
import { useI18n } from '@/shared/i18n';
import { Card } from '@/shared/ui/card';
import { ResponsiveTableLayout } from '@/shared/ui/responsive-table-layout';
import { TableHeader } from '@/shared/ui/table-header';

import { StudentLessonsListRow } from './student-lesson-row';
import {
  STUDENT_LESSONS_TABLE_COLS,
  STUDENT_LESSONS_TABLE_COLUMNS,
} from './student-lessons-list.columns';

type Props = {
  studentId: number;
  lessons: StudentDashboardDto['lessons'];
};

export function StudentLessonsList({ lessons, studentId }: Props) {
  const { t } = useI18n();
  const isEmpty = lessons.length === 0;

  const empty = (
    <Card className="ui-card ui-radius-card px-5 sm:px-6 py-4">
      <div className="ui-meta">{t('lessons.list.empty')}</div>
    </Card>
  );

  return (
    <ResponsiveTableLayout
      header={
        <TableHeader
          columns={STUDENT_LESSONS_TABLE_COLUMNS}
          colsClassName={STUDENT_LESSONS_TABLE_COLS}
        />
      }
      desktopBody={
        isEmpty
          ? empty
          : lessons.map((lesson) => (
              <StudentLessonsListRow
                key={lesson.id}
                studentId={studentId}
                lesson={lesson}
                variant="table"
              />
            ))
      }
      mobileBody={
        isEmpty
          ? empty
          : lessons.map((lesson) => (
              <StudentLessonsListRow
                key={lesson.id}
                studentId={studentId}
                lesson={lesson}
                variant="card"
              />
            ))
      }
    />
  );
}
