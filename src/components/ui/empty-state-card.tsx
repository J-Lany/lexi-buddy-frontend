import React from 'react';
import { cn } from '@/lib/utils';

type EmptyStateCardProps = {
  title: string;
  description?: string;

  /** Optional icon (emoji, svg, icon component) shown in ui-thumb bubble */
  icon?: React.ReactNode;

  /** Main CTA (button / modal trigger). Use when you do NOT have the same action in the toolbar. */
  primaryAction?: React.ReactNode;

  /** Optional secondary action (e.g. link button) */
  secondaryAction?: React.ReactNode;

  /**
   * A small helper hint (preferred when toolbar already has CTA)
   * e.g. 'Tap “Add a student” above'
   */
  hint?: string;

  /** Alignment: Apple empty states are usually centered */
  align?: 'center' | 'left';

  /**
   * Surface policy:
   * - 'auto' (default): panel on mobile, canvas (no box) on sm+
   * - 'panel': always boxed
   * - 'canvas': always unboxed
   */
  surface?: 'auto' | 'panel' | 'canvas';

  /**
   * Width: should relate to your max-w-5xl content.
   * Default is a bit wider than before so it doesn't look tiny on desktop.
   */
  maxWidthClassName?: string;

  className?: string;
};

export function EmptyStateCard({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  hint,
  align = 'center',
  surface = 'auto',
  maxWidthClassName = 'max-w-5xl',
  className,
}: EmptyStateCardProps) {
  const isCenter = align === 'center';

  const surfaceClasses =
    surface === 'panel'
      ? 'ui-panel ui-radius-card'
      : surface === 'canvas'
        ? 'border-0 bg-transparent shadow-none'
        : cn('ui-panel ui-radius-card', 'sm:border-0 sm:bg-transparent sm:shadow-none');

  const paddingClasses =
    surface === 'canvas'
      ? 'px-2 py-6 sm:px-0 sm:py-8'
      : surface === 'panel'
        ? 'px-6 py-7 sm:px-8 sm:py-9'
        : cn('px-6 py-7', 'sm:px-0 sm:py-8');

  return (
    <section
      className={cn(surfaceClasses, paddingClasses, 'w-full mx-auto', maxWidthClassName, className)}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          'flex flex-col',
          isCenter ? 'items-center text-center' : 'items-start text-left',
          'gap-2',
        )}
      >
        {icon ? (
          <div className={cn(isCenter ? 'flex w-full justify-center mb-1' : 'mb-1')}>
            <div className="ui-thumb h-12 w-12 sm:h-14 sm:w-14">{icon}</div>
          </div>
        ) : null}

        <div className="font-semibold tracking-tight leading-snug text-[17px] sm:text-[19px]">
          {title}
        </div>

        {description ? (
          <p
            className={cn(
              'text-muted-foreground leading-relaxed text-[13px] sm:text-[14px]',
              isCenter ? 'max-w-[52ch]' : 'max-w-[64ch]',
            )}
          >
            {description}
          </p>
        ) : null}

        {primaryAction || secondaryAction ? (
          <div
            className={cn(
              'pt-2 w-full',
              'flex gap-3',
              isCenter ? 'justify-center items-center' : 'justify-start items-start',
              'flex-col sm:flex-row',
            )}
          >
            {primaryAction}
            {secondaryAction ? <div className="sm:self-center">{secondaryAction}</div> : null}
          </div>
        ) : null}

        {hint ? (
          <div className="pt-1">
            <div className="ui-pill gap-2 px-3">
              <span className="-mt-px opacity-70" aria-hidden>
                ↑
              </span>
              <span className="opacity-90">{hint}</span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
