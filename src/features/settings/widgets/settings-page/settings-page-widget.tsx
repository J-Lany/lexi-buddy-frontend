'use client';

import { BarChart2, ChevronRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { useTeacherProfileQuery } from '@/entities/teacher';
import { useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';
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
      {profile?.isAdmin && (
        <Link
          href={routes.adminMetrics}
          className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4 transition-colors hover:bg-primary/10"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <BarChart2 className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground">Platform metrics</div>
            <div className="ui-meta">Admin only</div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Link>
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
