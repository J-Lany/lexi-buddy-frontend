'use client';

import { Plus, X } from 'lucide-react';
import * as React from 'react';

import {
  CreateLessonDraft,
  DraftPatch,
} from '@/features/lessons/modals/create-lesson-modal/model/types';
import { INSTRUCTION_LANGUAGE_OPTIONS } from '@/shared/catalogs/instruction-language';
import { LANGUAGE_OPTIONS } from '@/shared/catalogs/language';
import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { FieldTooltip } from '@/shared/ui/field-tooltip';
import { Input } from '@/shared/ui/input';
import { ResponsiveSelect } from '@/shared/ui/responsive-select';
import { Textarea } from '@/shared/ui/textarea';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: DraftPatch) => void;
};

const MAX_INSTRUCTIONS = 3000;

function FieldLabel({ label, tooltip }: { label: string; tooltip: string }) {
  return (
    <div className="flex items-center gap-1.5 px-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <FieldTooltip content={tooltip} />
    </div>
  );
}

export function StepLessonContext({ draft, onChange }: Props) {
  const { t } = useI18n();
  const [linkInput, setLinkInput] = React.useState('');

  const isValidUrl = linkInput.trim().startsWith('https://');

  const addLink = () => {
    const url = linkInput.trim();
    if (!url.startsWith('https://')) return;
    onChange({ materialLinks: [...draft.materialLinks, url] });
    setLinkInput('');
  };

  const removeLink = (index: number) => {
    onChange({ materialLinks: draft.materialLinks.filter((_, i) => i !== index) });
  };

  const instructionsLength = draft.additionalInstructions.length;

  return (
    <div className="space-y-5">
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
      </div>

      <div className="h-px bg-border/60" />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">
              {t('lessons.meta.additionalInstructions')}
            </span>
            <FieldTooltip
              content={t('lessons.meta.tooltips.additionalInstructions')}
              contentClassName="max-w-[280px]"
            />
          </div>
          <span
            className={cn(
              'text-xs tabular-nums',
              instructionsLength > MAX_INSTRUCTIONS ? 'text-destructive' : 'text-muted-foreground',
            )}
          >
            {instructionsLength} / {MAX_INSTRUCTIONS}
          </span>
        </div>
        <Textarea
          name="additionalInstructions"
          minRows={3}
          placeholder={t('lessons.meta.additionalInstructionsPlaceholder')}
          value={draft.additionalInstructions}
          onChange={(e) => onChange({ additionalInstructions: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel
          label={t('lessons.meta.materialLinks')}
          tooltip={t('lessons.meta.tooltips.materialLinks')}
        />
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder={t('lessons.meta.materialLinksPlaceholder')}
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addLink();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={addLink}
            disabled={!isValidUrl}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        {draft.materialLinks.length > 0 && (
          <ul className="mt-1 space-y-1.5">
            {draft.materialLinks.map((url, i) => (
              <li
                key={url}
                className="flex items-center gap-2 rounded-lg border border-[var(--border-soft)] px-3 py-2"
              >
                <span className="min-w-0 flex-1 truncate text-xs">{url}</span>
                <button
                  type="button"
                  onClick={() => removeLink(i)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
