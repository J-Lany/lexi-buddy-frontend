'use client';

import { Lock } from 'lucide-react';

import { AGE_GROUP_OPTIONS } from '@/shared/catalogs/age';
import { LEVEL_OPTIONS } from '@/shared/catalogs/levels';
import type { AgeGroup, Level } from '@/shared/domain/common';
import { useI18n } from '@/shared/i18n';
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
  const { t } = useI18n();

  return (
    <div className="min-w-0">
      <SectionLabel>{t('students.about.title')}</SectionLabel>

      <div className={detailsSectionSurface}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="text-[13px] text-muted-foreground">{t('students.about.level')}</div>

          <div className="min-w-[170px] max-w-[220px]">
            <ResponsiveSelect
              value={levelValue}
              onValueChange={onChangeLevel}
              placeholder="—"
              title={t('students.about.chooseLevel')}
              options={LEVEL_OPTIONS}
              triggerClassName="h-9 rounded-xl px-3"
            />
          </div>
        </div>
        <Divider />

        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="text-[13px] text-muted-foreground">{t('students.about.ageGroup')}</div>

          <div className="min-w-[170px] max-w-[260px]">
            <ResponsiveSelect
              value={ageGroupValue}
              onValueChange={onChangeAgeGroup}
              placeholder="—"
              title={t('students.about.chooseAgeGroup')}
              options={AGE_GROUP_OPTIONS}
              triggerClassName="h-9 rounded-xl px-3"
            />
          </div>
        </div>
        <Divider />

        <DetailsRow
          label={t('students.about.telegram')}
          value={telegramLabel}
          icon={<Lock className="h-4 w-4" />}
          valueTone="tint"
        />
        <Divider />

        <DetailsRow label={t('students.about.lastVisit')} value={lastVisitLabel} />
      </div>
    </div>
  );
}
