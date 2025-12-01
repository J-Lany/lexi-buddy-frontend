'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { EStudentsTab } from '@/features/students/utils/consts';
import { StudentsFragment } from '@/features/students/students-fragment';
import { GroupsFragment } from '@/features/students/groups-fragment';

export default function StudentsPage() {
  const [tabIndex, setTabIndex] = useState(EStudentsTab.STUDENTS);

  const isStudetnsTab = tabIndex === EStudentsTab.STUDENTS;
  const isGroupsTab = tabIndex === EStudentsTab.GROUPS;

  return (
    <main>
      <section className="flex flex-col gap-8">
        <div className="flex gap-4">
          <Button
            size="lg"
            variant={isStudetnsTab ? 'default' : 'outline'}
            className="rounded-full flex-1 sm:flex-none"
            onClick={() => setTabIndex(EStudentsTab.STUDENTS)}
          >
            All students
          </Button>
          <Button
            size="lg"
            variant={isGroupsTab ? 'default' : 'outline'}
            className="rounded-full flex-1 sm:flex-none"
            onClick={() => setTabIndex(EStudentsTab.GROUPS)}
          >
            Groups
          </Button>
        </div>
        {tabIndex === EStudentsTab.STUDENTS && <StudentsFragment />}
        {tabIndex === EStudentsTab.GROUPS && <GroupsFragment />}
      </section>
    </main>
  );
}
