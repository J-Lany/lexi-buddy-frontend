'use client';

import { Group, GroupRow } from './group-row';

export function GroupTable({ groups, showIcon = true }: { groups: Group[]; showIcon?: boolean }) {
  return (
    <div className="grid gap-3">
      {/* Desktop table */}
      <div className="hidden sm:block">
        <div className="ui-panel overflow-hidden">
          <div className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="px-6 py-3">
              <div className="grid grid-cols-[2fr_140px_140px] items-center gap-4">
                <div className="ui-meta tracking-wide uppercase">Group</div>
                <div className="ui-meta tracking-wide uppercase">Level</div>
                <div className="ui-meta tracking-wide uppercase text-right">Students</div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border/60 overflow-y-auto ui-scroll sm:max-h-[calc(90dvh-220px)]">
            {groups.map((group) => (
              <GroupRow key={group.id} group={group} variant="table" showIcon={showIcon} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 sm:hidden">
        {groups.map((group) => (
          <GroupRow key={group.id} group={group} variant="card" showIcon={showIcon} />
        ))}
      </div>
    </div>
  );
}
