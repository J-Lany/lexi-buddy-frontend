'use client';

import { ExternalLink } from 'lucide-react';
import * as React from 'react';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { useI18n } from '@/shared/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type Props = {
  additionalInstructions: LessonDashboardDto['additionalInstructions'];
  materialLinks: LessonDashboardDto['materialLinks'];
};

export function LessonAdditionalInfo({ additionalInstructions, materialLinks }: Props) {
  const { t } = useI18n();

  const hasInstructions = !!additionalInstructions;
  const hasLinks = materialLinks.length > 0;

  const linkLabels = React.useMemo(() => {
    const counts: Record<string, number> = {};
    materialLinks.forEach((url) => {
      try {
        const host = new URL(url).hostname.replace(/^www\./, '');
        counts[host] = (counts[host] ?? 0) + 1;
      } catch {}
    });
    const indexes: Record<string, number> = {};
    return materialLinks.map((url) => {
      try {
        const host = new URL(url).hostname.replace(/^www\./, '');
        if (counts[host] === 1) return host;
        indexes[host] = (indexes[host] ?? 0) + 1;
        return `${host} · ${indexes[host]}`;
      } catch {
        return url;
      }
    });
  }, [materialLinks]);

  if (!hasInstructions && !hasLinks) return null;

  return (
    <Card className="ui-panel ui-radius-card">
      {hasInstructions && (
        <>
          <CardHeader>
            <CardTitle>{t('lessons.details.additionalInstructions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm text-foreground/80">
              {additionalInstructions}
            </p>
          </CardContent>
        </>
      )}

      {hasLinks && (
        <>
          <CardHeader className={hasInstructions ? 'pt-0' : undefined}>
            <CardTitle>{t('lessons.details.materialLinks')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {materialLinks.map((url, i) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
                  >
                    <ExternalLink className="size-3.5 shrink-0" />
                    <span>{linkLabels[i]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </>
      )}
    </Card>
  );
}
