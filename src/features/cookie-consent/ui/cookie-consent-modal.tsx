'use client';

import { Cookie } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { clearStoredLocale, useI18n, writeStoredLocale } from '@/shared/i18n';
import {
  acceptAllConsent,
  hasFunctionalConsent,
  needsConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
  rejectNonEssentialConsent,
  saveConsent,
} from '@/shared/lib/cookie-consent';
import { routes } from '@/shared/router/routes';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/ui/dialog';

type View = 'banner' | 'settings';

const LEGAL_PAGES: string[] = [
  routes.privacy,
  routes.terms,
  routes.cookiePolicy,
  routes.pdnConsent,
];

export function CookieConsentModal() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('banner');
  const [functionalDraft, setFunctionalDraft] = useState(false);

  // Re-evaluate on every navigation: suppress the (non-dismissible) banner on legal
  // pages so users can read them freely before deciding.
  useEffect(() => {
    setOpen(needsConsent() && !LEGAL_PAGES.includes(pathname));
  }, [pathname]);

  useEffect(() => {
    const openSettings = () => {
      setFunctionalDraft(hasFunctionalConsent());
      setView('settings');
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const close = () => {
    setOpen(false);
    setView('banner');
  };

  const applyFunctionalStorage = (functional: boolean) => {
    if (functional) {
      writeStoredLocale(locale);
    } else {
      clearStoredLocale();
    }
  };

  const handleAcceptAll = () => {
    const result = acceptAllConsent();
    if (!result.ok) {
      toast.error(t('cookies.saveError'));
      return;
    }
    applyFunctionalStorage(true);
    close();
  };

  const handleNecessaryOnly = () => {
    const result = rejectNonEssentialConsent();
    if (!result.ok) {
      toast.error(t('cookies.saveError'));
      return;
    }
    applyFunctionalStorage(false);
    close();
  };

  const handleOpenSettings = () => {
    setFunctionalDraft(hasFunctionalConsent());
    setView('settings');
  };

  const handleSaveSettings = () => {
    const result = saveConsent({ functional: functionalDraft });
    if (!result.ok) {
      toast.error(t('cookies.saveError'));
      return;
    }
    applyFunctionalStorage(functionalDraft);
    close();
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

          {view === 'banner' ? (
            <>
              <DialogTitle className="ui-card-title">{t('cookies.bannerTitle')}</DialogTitle>
              <DialogDescription className="ui-meta mt-2.5 whitespace-normal! overflow-visible!">
                {t('cookies.bannerText')} {t('cookies.bannerLinkLead')}{' '}
                <Link
                  href={routes.cookiePolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium"
                >
                  {t('cookies.cookiePolicyLink')}
                </Link>
                .
              </DialogDescription>

              <div className="mt-6 flex w-full flex-col gap-2.5">
                <Button size="lg" className="w-full" onClick={handleAcceptAll}>
                  {t('cookies.acceptAll')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={handleNecessaryOnly}
                >
                  {t('cookies.necessaryOnly')}
                </Button>
                <Button variant="link" className="text-primary" onClick={handleOpenSettings}>
                  {t('cookies.settingsButton')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogTitle className="ui-card-title">{t('cookies.settingsTitle')}</DialogTitle>
              <DialogDescription className="ui-meta mt-2.5 whitespace-normal! overflow-visible!">
                {t('cookies.settingsDescription')}
              </DialogDescription>

              <div className="mt-5 flex flex-col gap-4 text-left">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="ui-title">{t('cookies.necessaryTitle')}</div>
                    <div className="ui-meta mt-0.5">{t('cookies.necessaryDescription')}</div>
                  </div>
                  <span className="ui-pill shrink-0 mt-0.5">{t('cookies.necessaryBadge')}</span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="ui-title">{t('cookies.functionalTitle')}</div>
                    <div className="ui-meta mt-0.5">{t('cookies.functionalDescription')}</div>
                  </div>
                  <Checkbox
                    checked={functionalDraft}
                    onCheckedChange={(checked) => setFunctionalDraft(checked === true)}
                    aria-label={t('cookies.functionalTitle')}
                    className="mt-0.5 shrink-0"
                  />
                </div>
              </div>

              <div className="mt-6 flex w-full flex-col gap-2.5">
                <Button size="lg" className="w-full" onClick={handleSaveSettings}>
                  {t('cookies.save')}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
