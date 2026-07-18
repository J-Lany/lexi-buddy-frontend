'use client';

import { Loader2, Mail } from 'lucide-react';

import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/ui/dialog';

type Props = {
  email: string;
  open: boolean;
  isPending: boolean;
  onConfirm: () => void;
  onBack: () => void;
};

export function EmailConfirmModal({ email, open, isPending, onConfirm, onBack }: Props) {
  const { t } = useI18n();

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v && !isPending) onBack();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-2rem)] sm:max-w-[400px] flex flex-col items-center gap-0 px-8 py-10 text-center"
      >
        {/* Icon ring */}
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
          <Mail className="h-8 w-8 text-primary" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <div className="mt-5 space-y-1.5">
          <DialogTitle className="text-[22px] font-semibold leading-tight tracking-tight">
            {t('auth.signUp.confirmModalTitle')}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t('auth.signUp.confirmModalDescription')}
          </DialogDescription>
        </div>

        {/* Email pill */}
        <div className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/8 px-5 py-3">
          <span className="truncate text-[15px] font-semibold text-primary">{email}</span>
        </div>

        <p className="mt-3 text-[12.5px] text-muted-foreground/80">
          {t('auth.signUp.confirmModalTypoQuestion')}{' '}
          <button
            type="button"
            onClick={onBack}
            disabled={isPending}
            className="font-medium text-primary hover:underline disabled:opacity-50 transition-opacity"
          >
            {t('auth.signUp.confirmModalEditEmail')}
          </button>
        </p>

        {/* CTA */}
        <Button
          onClick={onConfirm}
          disabled={isPending}
          size="lg"
          className="mt-6 w-full rounded-full"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('auth.signUp.confirmModalPending')}
            </>
          ) : (
            t('auth.signUp.confirmModalCta')
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
