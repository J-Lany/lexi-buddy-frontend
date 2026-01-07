'use client';

import { Student } from '@/features/students/students-table/components/student-row';
import { StudentRow } from '@/features/students/students-table/components/student-row';

export function StudentTable({ students }: { students: Student[] }) {
  return (
    <div className="grid gap-3">
      <div className="hidden sm:block">
        <div className="ui-panel overflow-hidden">
          <div className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="px-6 py-3">
              <div className="grid items-center gap-4 grid-cols-[2fr_1.5fr_1.5fr_92px]">
                <div className="ui-meta tracking-wide uppercase">Name</div>
                <div className="ui-meta tracking-wide uppercase">Telegram</div>
                <div className="ui-meta tracking-wide uppercase">Group</div>
                <div className="ui-meta tracking-wide uppercase text-right">Level</div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border/60 overflow-y-auto ui-scroll sm:max-h-[calc(90dvh-220px)]">
            {students.map((student) => (
              <StudentRow key={student.id} student={student} variant="table" />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:hidden">
        {students.map((student) => (
          <StudentRow key={student.id} student={student} variant="card" />
        ))}
      </div>
    </div>
  );
}
