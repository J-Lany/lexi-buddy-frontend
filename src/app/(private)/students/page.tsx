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
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-stretch sm:items-center gap-3 min-w-0">
              <SegmentedControl<EStudentsTab>
                value={tab}
                onChange={(v) => setTab(v)}
                options={STUDENTS_TABS}
                className="w-full sm:w-auto shrink-0"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tab === EStudentsTab.STUDENTS ? 'Search students' : 'Search groups'}
                className="w-full sm:flex-1 sm:min-w-[260px] sm:w-auto sm:max-w-[clamp(320px,40vw,560px)]"
              />
              <div className="w-full sm:w-auto shrink-0">{action}</div>
            </div>
          </div>
        </div>
        {tab === EStudentsTab.STUDENTS && <StudentsFragment query={query} />}
        {tab === EStudentsTab.GROUPS && <GroupsFragment query={query} />}
      </section>
    </main>
  );
}
