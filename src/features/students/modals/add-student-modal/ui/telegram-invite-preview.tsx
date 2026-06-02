'use client';

import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';

import styles from './telegram-invite-preview.module.css';

const TelegramIcon = ({ size = 14, className }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zm5.78 8.25-2.01 9.49c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.873.722z" />
  </svg>
);

type Props = {
  teacherFirstName: string | null;
  studentUsername: string | null;
  message: string;
  defaultOpen?: boolean;
};

export function TelegramInvitePreview({
  teacherFirstName,
  studentUsername,
  message,
  defaultOpen = false,
}: Props) {
  const { t } = useI18n();
  const [open, setOpen] = React.useState(defaultOpen);

  const teacher = teacherFirstName ?? t('students.invite.previewTeacherFallback');
  const botMsg = t('students.invite.previewBotMsg').replace('{teacher}', teacher);
  const trimmedMessage = message.trim();

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
      {/* Toggle row */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-accent/40"
      >
        <TelegramIcon className="shrink-0 text-[#2AABEE]" />
        <span className="flex-1 text-[14px] font-semibold">
          {t('students.invite.previewSection')}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div className={cn('border-t border-border/60', styles.chatBg)}>
          {/* Chat thread header */}
          <div className={styles.chatHeader}>
            <div className={styles.botAvatar}>L</div>
            <div className="flex flex-col">
              <span className={styles.botName}>Lexi Buddy bot</span>
              <span className={styles.botLabel}>bot</span>
            </div>
          </div>

          {/* Messages area */}
          <div className={styles.messages}>
            {/* Bot bubble with tail */}
            <div className={styles.bubble}>
              <p className={styles.sender}>{teacher} via Lexi</p>
              <p className={styles.botMsg}>{botMsg}</p>
              {trimmedMessage && <div className={styles.quote}>{trimmedMessage}</div>}
              <div className={styles.timestamp}>9:41</div>
            </div>

            {/* Inline keyboard — outside bubble, attached underneath */}
            <div className={styles.inlineKbd}>
              <div className={cn(styles.inlineBtn, styles.inlineBtnLeft)}>
                {t('students.invite.previewAccept')}
              </div>
              <div className={cn(styles.inlineBtn, styles.inlineBtnRight)}>
                {t('students.invite.previewDecline')}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className={styles.footerNote}>
            {studentUsername
              ? t('students.invite.previewNoteWithUser').replace(
                  '{username}',
                  `@${studentUsername}`,
                )
              : t('students.invite.previewNote')}
          </div>
        </div>
      )}
    </div>
  );
}
