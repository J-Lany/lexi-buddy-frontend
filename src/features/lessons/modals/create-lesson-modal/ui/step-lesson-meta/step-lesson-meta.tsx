'use client';

import {
  CreateLessonDraft,
  DraftPatch,
} from '@/features/lessons/modals/create-lesson-modal/model/types';
import { AGE_GROUP_OPTIONS } from '@/shared/catalogs/age';
import { LEVEL_OPTIONS } from '@/shared/catalogs/levels';
import { useI18n } from '@/shared/i18n';
import { FieldTooltip } from '@/shared/ui/field-tooltip';
import { Input } from '@/shared/ui/input';
import { ResponsiveSelect } from '@/shared/ui/responsive-select';
import { Textarea } from '@/shared/ui/textarea';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: DraftPatch) => void;
};

function FieldLabel({ label, tooltip }: { label: string; tooltip: string }) {
  return (
    <div className="flex items-center gap-1.5 px-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <FieldTooltip content={tooltip} />
    </div>
  );
}

export function StepLessonMeta({ draft, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <FieldLabel
          label={t('lessons.meta.titlePlaceholder')}
          tooltip={t('lessons.meta.tooltips.title')}
        />
        <Input
          name="title"
          placeholder={t('lessons.meta.titlePlaceholder')}
          value={draft.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel label={t('lessons.meta.level')} tooltip={t('lessons.meta.tooltips.level')} />
        <ResponsiveSelect
          value={draft.level}
          onValueChange={(v) => onChange({ level: v })}
          placeholder={t('lessons.meta.level')}
          title={t('lessons.meta.level')}
          options={LEVEL_OPTIONS}
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel
          label={t('lessons.meta.ageGroup')}
          tooltip={t('lessons.meta.tooltips.ageGroup')}
        />
        <ResponsiveSelect
          value={draft.ageCategory}
          onValueChange={(v) => onChange({ ageCategory: v })}
          placeholder={t('lessons.meta.ageGroup')}
          title={t('lessons.meta.ageGroup')}
          options={AGE_GROUP_OPTIONS}
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel
          label={t('lessons.meta.topicPlaceholder')}
          tooltip={t('lessons.meta.tooltips.topic')}
        />
        <Textarea
          name="topic"
          minRows={5}
          placeholder={t('lessons.meta.topicPlaceholder')}
          value={draft.topic ?? ''}
          onChange={(e) => onChange({ topic: e.target.value })}
        />
      </div>
    </div>
  );
}
