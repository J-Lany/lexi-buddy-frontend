import { Lock } from 'lucide-react';

import { AGE_GROUP_OPTIONS } from '@/shared/catalogs/age';
import { LEVEL_OPTIONS } from '@/shared/catalogs/levels';
import type { AgeGroup, Level } from '@/shared/domain/common';
import { DetailsRow } from '@/shared/ui/details/details-row';
import { detailsSectionSurface } from '@/shared/ui/details/details-section-surface';
import { SectionLabel } from '@/shared/ui/details/section-label';
import { Divider } from '@/shared/ui/divider';
import { ResponsiveSelect } from '@/shared/ui/responsive-select';

type Props = {
  levelValue: Level | '';
  ageGroupValue: AgeGroup | '';
  telegramLabel: string;
  lastVisitLabel: string;
  onChangeLevel: (value: Level) => void;
  onChangeAgeGroup: (value: AgeGroup) => void;
};
export function AboutSection({
  levelValue,
  ageGroupValue,
  onChangeAgeGroup,
  onChangeLevel,
  lastVisitLabel,
  telegramLabel,
}: Props) {
  return (
    <div className="min-w-0">
      <SectionLabel>About</SectionLabel>

      <div className={detailsSectionSurface}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="text-[13px] text-muted-foreground">Level</div>

          <div className="min-w-[170px] max-w-[220px]">
            <ResponsiveSelect
              value={levelValue}
              onValueChange={onChangeLevel}
              placeholder="—"
              title="Choose level"
              options={LEVEL_OPTIONS}
              triggerClassName="h-9 rounded-xl px-3"
            />
          </div>
        </div>
        <Divider />

        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="text-[13px] text-muted-foreground">Age group</div>

          <div className="min-w-[170px] max-w-[260px]">
            <ResponsiveSelect
              value={ageGroupValue}
              onValueChange={onChangeAgeGroup}
              placeholder="—"
              title="Choose age group"
              options={AGE_GROUP_OPTIONS}
              triggerClassName="h-9 rounded-xl px-3"
            />
          </div>
        </div>
        <Divider />

        <DetailsRow
          label="Telegram"
          value={telegramLabel}
          icon={<Lock className="h-4 w-4" />}
          valueTone="tint"
        />
        <Divider />

        <DetailsRow label="Last visit" value={lastVisitLabel} />
      </div>
    </div>
  );
}
