'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { StudentsFragment } from '@/features/students/students-table/students-fragment';
import { GroupsFragment } from '@/features/groups/group-table/groups-fragment';
import { EStudentsTab, STUDENTS_TABS } from '@/features/students/utils/consts';
import { InviteStudentModal } from '@/features/students/add-student-modal/add-student-modal';
import { CreateGroupModal } from '@/features/groups/create-group-modal/create-group-modal';

export default function StudentsPage() {
  const [tab, setTab] = useState<EStudentsTab>(EStudentsTab.STUDENTS);
  const [query, setQuery] = useState('');

  const action = tab === EStudentsTab.STUDENTS ? <InviteStudentModal /> : <CreateGroupModal />;

  return (
    <main>
      <section className="max-w-5xl flex flex-col gap-6">
        <div className="ui-panel ui-radius-card p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SegmentedControl<EStudentsTab>
              value={tab}
              onChange={(v) => setTab(v)}
              options={STUDENTS_TABS}
              className="w-full sm:w-auto"
            />
            <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:justify-end sm:w-auto">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tab === EStudentsTab.STUDENTS ? 'Search students' : 'Search groups'}
                className="w-full sm:w-[360px] lg:w-[420px]"
              />
              <div className="sm:w-auto">{action}</div>
            </div>
          </div>
        </div>
        {tab === EStudentsTab.STUDENTS && <StudentsFragment query={query} />}
        {tab === EStudentsTab.GROUPS && <GroupsFragment query={query} />}
      </section>
    </main>
  );
}
