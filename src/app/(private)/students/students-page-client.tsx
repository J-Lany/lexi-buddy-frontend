'use client';

import {
  normalizeStudentsTab,
  STUDENTS_TABS_OPTIONS,
  StudentsTab,
  studentsTabs,
} from '@/app/(private)/students/_config/students-tabs';
import { useMyGroupsQuery } from '@/entities/groups/model/query/get-my-groups';
import { useMyStudentsQuery } from '@/entities/students/model/queries/get-my-students';
import { CreateGroupModal } from '@/features/groups/modals/create-group/create-group-modal';
import { GroupsListWidget } from '@/features/groups/widgets/groups-list/groups-list-widget';
import { InviteStudentModal, StudentsListWidget } from '@/features/students';
import { useMergedQuery } from '@/shared/hooks/use-merged-query';
import { useI18n } from '@/shared/i18n';
import { Input } from '@/shared/ui/input';
import { SegmentedControl } from '@/shared/ui/segmented-control';

const queryKeys = {
  tab: 'tab',
  q: 'q',
} as const;

export default function StudentsPageClient() {
  const { t } = useI18n();
  const { get, getOr, navigateWith } = useMergedQuery();

  const tab = normalizeStudentsTab(get(queryKeys.tab));
  const query = getOr(queryKeys.q, '');

  const { data: studentsData, isLoading: sLoading, isError: sError } = useMyStudentsQuery();
  const { data: groupsData, isLoading: gLoading, isError: gError } = useMyGroupsQuery();

  const studentsEmpty = !sLoading && !sError && (studentsData?.length ?? 0) === 0 && !query;
  const groupsEmpty = !gLoading && !gError && (groupsData?.length ?? 0) === 0 && !query;
  const showAction = tab === studentsTabs.students ? !studentsEmpty : !groupsEmpty;

  const action = tab === studentsTabs.students ? <InviteStudentModal /> : <CreateGroupModal />;

  return (
    <main>
      <section className="max-w-5xl flex flex-col gap-6">
        <div className="ui-panel ui-radius-card p-4 sm:p-5">
          <div className="flex flex-wrap items-stretch sm:items-center gap-3 min-w-0">
            <SegmentedControl<StudentsTab>
              value={tab}
              onChange={(v) => {
                navigateWith({ [queryKeys.tab]: v, [queryKeys.q]: '' });
              }}
              options={STUDENTS_TABS_OPTIONS}
              className="w-full sm:w-auto shrink-0"
            />

            <Input
              value={query}
              onChange={(e) => navigateWith({ [queryKeys.q]: e.target.value })}
              placeholder={
                tab === studentsTabs.students
                  ? t('students.page.searchStudents')
                  : t('students.page.searchGroups')
              }
              className="w-full sm:flex-1 sm:min-w-[260px] sm:w-auto"
            />

            {showAction && <div className="w-full sm:w-auto shrink-0">{action}</div>}
          </div>
        </div>

        {tab === studentsTabs.students && <StudentsListWidget query={query} />}
        {tab === studentsTabs.groups && <GroupsListWidget query={query} />}
      </section>
    </main>
  );
}
