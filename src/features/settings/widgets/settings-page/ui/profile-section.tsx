'use client';

import * as React from 'react';
import { toast } from 'sonner';

import type { TeacherProfileDto } from '@/entities/teacher';
import { useUpdateTeacherProfileMutation } from '@/entities/teacher';
import type { Language } from '@/shared/domain/language';
import { useI18n } from '@/shared/i18n';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';

import { PersonalInfoFields } from './personal-info-fields';
import { ProfileSectionHeader } from './profile-section-header';
import { TeachingDefaultsFields } from './teaching-defaults-fields';

type Props = {
  profile: TeacherProfileDto;
};

export function ProfileSection({ profile }: Props) {
  const { t } = useI18n();
  const mutation = useUpdateTeacherProfileMutation();

  const [form, setForm] = React.useState(() => getInitialForm(profile));

  React.useEffect(() => {
    setForm(getInitialForm(profile));
  }, [profile]);

  const isDirty =
    form.firstName !== (profile.firstName ?? '') ||
    form.lastName !== (profile.lastName ?? '') ||
    form.defaultLanguage !== profile.defaultLanguage;

  const displayName = [profile.firstName, profile.lastName].filter(Boolean).join(' ');
  const initials = getInitials(profile);

  const updateField = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;

    try {
      await mutation.mutateAsync({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        defaultLanguage: form.defaultLanguage,
      });

      toast.success(t('settings.profile.saved'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Card className="ui-card-static ui-radius-card h-full">
      <CardHeader className="pb-0">
        <ProfileSectionHeader
          initials={initials}
          title={displayName || t('settings.profile.title')}
          subtitle="Personal information and teaching defaults"
        />
      </CardHeader>

      <CardContent className="pt-7">
        <form onSubmit={(e) => void handleSave(e)} className="flex flex-col gap-10">
          <PersonalInfoFields
            firstName={form.firstName}
            lastName={form.lastName}
            disabled={mutation.isPending}
            onFirstNameChange={(value) => updateField('firstName', value)}
            onLastNameChange={(value) => updateField('lastName', value)}
          />

          <div className="border-t border-border/60"></div>

          <TeachingDefaultsFields
            value={form.defaultLanguage}
            onChange={(value) => updateField('defaultLanguage', value)}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!isDirty || mutation.isPending}
              className="w-full sm:w-auto rounded-full px-7"
            >
              {mutation.isPending ? t('settings.profile.saving') : t('settings.profile.save')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

type ProfileForm = {
  firstName: string;
  lastName: string;
  defaultLanguage: Language;
};

function getInitialForm(profile: TeacherProfileDto): ProfileForm {
  return {
    firstName: profile.firstName ?? '',
    lastName: profile.lastName ?? '',
    defaultLanguage: profile.defaultLanguage,
  };
}

function getInitials(profile: TeacherProfileDto) {
  return (
    [profile.firstName, profile.lastName]
      .filter(Boolean)
      .map((name) => name![0].toUpperCase())
      .join('') || '?'
  );
}
