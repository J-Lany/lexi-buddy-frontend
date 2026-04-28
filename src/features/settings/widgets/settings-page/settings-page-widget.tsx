'use client';

import { ShieldCheck } from 'lucide-react';

import { useTeacherProfileQuery } from '@/entities/teacher';
import { useI18n } from '@/shared/i18n';
import { EmptyStateCard } from '@/shared/ui/empty-state-card';

import { PasswordSection } from './ui/password-section';
import { ProfileSection } from './ui/profile-section';
import { SkeletonCard } from './ui/settings-skeleton';
import { UiLanguageSection } from './ui/ui-language-section';

export function SettingsPageWidget() {
  const { t } = useI18n();
  const { data: profile, isPending, isError } = useTeacherProfileQuery();

  return (
    <section className="w-full max-w-[1060px] space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight">
          {t('settings.title')}
        </h1>
        <p className="ui-meta">{t('settings.subtitle')}</p>
      </div>

      {isPending && (
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {isError && (
        <EmptyStateCard
          surface="canvas"
          icon={<ShieldCheck className="h-5 w-5 text-primary" />}
          title={t('settings.error')}
          description={t('settings.errorDesc')}
        />
      )}
      {profile && (
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <ProfileSection profile={profile} />
          <PasswordSection />

          <div className="lg:col-span-2">
            <UiLanguageSection />
          </div>
        </div>
      )}
    </section>
  );
}
