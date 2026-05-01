'use client';

import {
  CreateLessonDraft,
  DraftPatch,
} from '@/features/lessons/modals/create-lesson-modal/model/types';
import { AGE_GROUP_OPTIONS } from '@/shared/catalogs/age';
import { INSTRUCTION_LANGUAGE_OPTIONS } from '@/shared/catalogs/instruction-language';
import { LANGUAGE_OPTIONS } from '@/shared/catalogs/language';
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
          label={t('lessons.meta.targetLanguage')}
          tooltip={t('lessons.meta.tooltips.targetLanguage')}
        />
        <ResponsiveSelect
          value={draft.targetLanguage}
          onValueChange={(v) => onChange({ targetLanguage: v })}
          placeholder={t('lessons.meta.targetLanguage')}
          title={t('lessons.meta.targetLanguage')}
          options={LANGUAGE_OPTIONS}
        />
        <p className="text-xs text-muted-foreground px-1">{t('lessons.meta.targetLanguageHint')}</p>
      </div>

      <div className="space-y-1.5">
        <FieldLabel
          label={t('lessons.meta.nativeLanguage')}
          tooltip={t('lessons.meta.tooltips.nativeLanguage')}
        />
        <ResponsiveSelect
          value={draft.nativeLanguage}
          onValueChange={(v) => onChange({ nativeLanguage: v })}
          placeholder={t('lessons.meta.nativeLanguage')}
          title={t('lessons.meta.nativeLanguage')}
          options={LANGUAGE_OPTIONS}
        />
        <p className="text-xs text-muted-foreground px-1">{t('lessons.meta.nativeLanguageHint')}</p>
      </div>

      <div className="space-y-1.5">
        <FieldLabel
          label={t('lessons.meta.instructionLanguage')}
          tooltip={t('lessons.meta.tooltips.instructionLanguage')}
        />
        <ResponsiveSelect
          value={draft.instructionLanguage}
          onValueChange={(v) => onChange({ instructionLanguage: v })}
          placeholder={t('lessons.meta.instructionLanguage')}
          title={t('lessons.meta.instructionLanguage')}
          options={INSTRUCTION_LANGUAGE_OPTIONS}
        />
        <p className="text-xs text-muted-foreground px-1">
          {t('lessons.meta.instructionLanguageHint')}
        </p>
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
          value={draft.topic}
          onChange={(e) => onChange({ topic: e.target.value })}
        />
      </div>
    </div>
  );
}
