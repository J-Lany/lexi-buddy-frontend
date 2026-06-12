'use client';

import { Cookie } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/ui/dialog';

import { acceptConsent, needsConsent } from '../lib/consent-storage';

const PRIVACY_HREF = '/privacy';

export function CookieConsentModal() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Re-evaluate on every navigation: suppress on /privacy so the user can read it freely.
  useEffect(() => {
    setOpen(needsConsent() && pathname !== PRIVACY_HREF);
  }, [pathname]);

  const handleAccept = () => {
    acceptConsent();
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
        className="ui-card-static ui-radius-card max-w-[440px] p-8 text-center"
      >
        <div className="flex flex-col">
          <div className="ui-thumb size-14 mx-auto mb-4">
            <Cookie className="size-7 text-primary" />
          </div>

          <DialogTitle className="ui-card-title">{t('cookies.title')}</DialogTitle>

          <DialogDescription className="ui-meta mt-2.5 whitespace-normal! overflow-visible!">
            {t('cookies.body')}{' '}
            <Link
              href={PRIVACY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium"
            >
              {t('cookies.privacyPolicy')}
            </Link>
            .
          </DialogDescription>

          <div className="mt-6 flex w-full flex-col gap-2.5">
            <Button size="lg" className="w-full" onClick={handleAccept}>
              {t('cookies.accept')}
            </Button>
            <Button asChild variant="link" className="text-primary">
              <Link href={PRIVACY_HREF} target="_blank" rel="noopener noreferrer">
                {t('cookies.privacyPolicy')}
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
