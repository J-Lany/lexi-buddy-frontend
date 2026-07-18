'use client';

import { GraduationCap, Info, Users } from 'lucide-react';

import { GroupDashboardDto } from '@/entities/groups/api/get-group-dashboard';
import { DetailsRow } from '@/shared/ui/details/details-row';
import { detailsSectionSurface } from '@/shared/ui/details/details-section-surface';
import { SectionLabel } from '@/shared/ui/details/section-label';
import { Divider } from '@/shared/ui/divider';

type Props = {
  group: GroupDashboardDto['group'];
  studentsCount: number;
};

export function AboutSection({ group, studentsCount }: Props) {
  const hasDescription = Boolean(group.description?.trim());

  return (
    <div className="min-w-0">
      <SectionLabel>About</SectionLabel>

      <div className={detailsSectionSurface}>
        <DetailsRow
          label="Level"
          value={group.level ?? '—'}
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <Divider />

        <DetailsRow label="Students" value={studentsCount} icon={<Users className="h-4 w-4" />} />

        {hasDescription ? (
          <>
            <Divider />
            <DetailsRow
              label="Description"
              value={group.description}
              icon={<Info className="h-4 w-4" />}
              valueTone="muted"
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
