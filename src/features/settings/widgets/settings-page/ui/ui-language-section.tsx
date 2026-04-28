'use client';

import { Globe } from 'lucide-react';

import { type Locale, LOCALE_LABELS, useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';

const LOCALES: Locale[] = ['en', 'ru', 'kz', 'es'];

export function UiLanguageSection() {
  const { t, locale, setLocale } = useI18n();

  return (
    <Card className="ui-card-static ui-radius-card h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="text-[18px] font-semibold tracking-tight">
              {t('settings.appLanguage.title')}
            </div>
            <div className="ui-meta mt-0.5">{t('settings.appLanguage.subtitle')}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-xl border py-4 px-3 transition-all duration-150',
                'text-sm font-medium',
                l === locale
                  ? 'border-primary/40 bg-primary/5 text-primary'
                  : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground hover:bg-accent/40',
              )}
            >
              <span className="text-[22px] leading-none">{LOCALE_FLAGS[l]}</span>
              <span>{LOCALE_LABELS[l]}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  kz: '🇰🇿',
  es: '🇪🇸',
};
