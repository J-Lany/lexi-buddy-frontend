'use client';

import type { GroupDto } from '@/entities/groups/api/get-my-groups';
import { GroupsTableRow } from '@/features/groups/widgets/groups-list/ui/ groups-table/groups-table-row';
import { useMergedQuery } from '@/shared/hooks/use-merged-query';
import { routes } from '@/shared/router/routes';
import { ResponsiveTableLayout } from '@/shared/ui/responsive-table-layout';
import { TableHeader } from '@/shared/ui/table-header';

import { GROUPS_TABLE_COLS, GROUPS_TABLE_COLUMNS } from './groups-table.columns';

type Props = {
  groups: GroupDto[];
  showIcon?: boolean;
};

export function GroupsTable({ groups, showIcon = true }: Props) {
  const { searchParams } = useMergedQuery();
  const qs = searchParams.toString();

  return (
    <ResponsiveTableLayout
      header={<TableHeader columns={GROUPS_TABLE_COLUMNS} colsClassName={GROUPS_TABLE_COLS} />}
      desktopBody={groups.map((group) => {
        const hrefToGroup = `${routes.groups}/${group.id}${qs ? `?${qs}` : ''}`;
        return (
          <GroupsTableRow
            key={group.id}
            group={group}
            href={hrefToGroup}
            variant="table"
            showIcon={showIcon}
          />
        );
      })}
      mobileBody={groups.map((group) => {
        const hrefToGroup = `${routes.groups}/${group.id}${qs ? `?${qs}` : ''}`;
        return (
          <GroupsTableRow
            key={group.id}
            group={group}
            href={hrefToGroup}
            variant="card"
            showIcon={showIcon}
          />
        );
      })}
    />
  );
}
