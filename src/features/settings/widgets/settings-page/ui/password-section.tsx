'use client';

import { CheckCircle2, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import * as React from 'react';

import { useRequestPasswordChangeMutation } from '@/features/auth/model/use-request-password-change';
import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

export function PasswordSection() {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [clientError, setClientError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);

  const { mutate, isPending } = useRequestPasswordChangeMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    if (password.length < 8) {
      setClientError(t('settings.password.tooShort'));
      return;
    }
    if (password !== confirmPassword) {
      setClientError(t('settings.password.mismatch'));
      return;
    }

    mutate(
      { password, confirmPassword },
      {
        onSuccess: () => {
          setSent(true);
          setPassword('');
          setConfirmPassword('');
        },
        onError: (err) => {
          setClientError(err?.message ?? t('settings.password.requestError'));
        },
      },
    );
  };

  return (
    <Card className="ui-card-static ui-radius-card">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>

          <div className="min-w-0">
            <div className="text-[18px] font-semibold tracking-tight">
              {t('settings.password.title')}
            </div>
            <div className="ui-meta mt-0.5">{t('settings.password.subtitle')}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-5">
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4">
            <div className="space-y-3">
              <PasswordInput
                label={t('settings.password.newPwd')}
                value={password}
                onChange={setPassword}
                showPassword={showPassword}
                placeholder={t('settings.password.newPwdPlaceholder')}
                disabled={isPending}
              />
              <PasswordInput
                label={t('settings.password.confirmPwd')}
                value={confirmPassword}
                onChange={setConfirmPassword}
                showPassword={showPassword}
                placeholder={t('settings.password.confirmPwdPlaceholder')}
                disabled={isPending}
              />
            </div>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPassword ? t('settings.password.hide') : t('settings.password.show')}
              </button>

              <ul className="grid gap-1 text-xs text-muted-foreground">
                <li>{t('settings.password.rule1')}</li>
                <li>{t('settings.password.rule2')}</li>
                <li>{t('settings.password.rule3')}</li>
              </ul>
            </div>

            {clientError && (
              <p className="mt-3 text-sm text-destructive font-medium">{clientError}</p>
            )}

            {sent && !clientError && (
              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {t('settings.password.emailSent')}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending || !password || !confirmPassword}
              className="mt-5 w-full rounded-full"
            >
              {isPending ? t('settings.password.requesting') : t('settings.password.changeBtn')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordInput({
  label,
  placeholder,
  showPassword,
  value,
  onChange,
  disabled,
}: {
  label: string;
  placeholder: string;
  showPassword: boolean;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn('bg-background/80')}
      />
    </label>
  );
}
