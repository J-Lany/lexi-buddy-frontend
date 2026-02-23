'use client';

import { StudentDto } from '@/entities/students/api/get-my-students';
import {
  STUDENTS_TABLE_COLS,
  STUDENTS_TABLE_COLUMNS,
} from '@/features/students/widgets/students-list/ui/students-table/students-table.columns';
import { StudentsTableRow } from '@/features/students/widgets/students-list/ui/students-table/students-table-row';
import { useMergedQuery } from '@/shared/hooks/use-merged-query';
import { routes } from '@/shared/router/routes';
import { ResponsiveTableLayout } from '@/shared/ui/responsive-table-layout';
import { TableHeader } from '@/shared/ui/table-header';

export function StudentsTable({ students }: { students: StudentDto[] }) {
  const { searchParams } = useMergedQuery();
  const qs = searchParams.toString();

  return (
    <ResponsiveTableLayout
      header={<TableHeader columns={STUDENTS_TABLE_COLUMNS} colsClassName={STUDENTS_TABLE_COLS} />}
      desktopBody={students.map((student) => {
        const hrefToStudent = `${routes.students}/${student.id}${qs ? `?${qs}` : ''}`;
        return (
          <StudentsTableRow
            student={student}
            variant="table"
            key={student.id}
            href={hrefToStudent}
          />
        );
      })}
      mobileBody={students.map((student) => {
        const hrefToStudent = `${routes.students}/${student.id}${qs ? `?${qs}` : ''}`;
        return (
          <StudentsTableRow
            student={student}
            variant="card"
            key={student.id}
            href={hrefToStudent}
          />
        );
      })}
    />
  );
}
