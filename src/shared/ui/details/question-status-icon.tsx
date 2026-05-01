import { CheckCircle2, Circle, XCircle } from 'lucide-react';

export const STATUS_ICON_VARIANTS = {
  success: 'success',
  neutral: 'neutral',
  danger: 'danger',
} as const;

export type StatusIconVariant = (typeof STATUS_ICON_VARIANTS)[keyof typeof STATUS_ICON_VARIANTS];

type Props = {
  variant: StatusIconVariant;
  size?: 'sm' | 'md';
};

export function StatusIcon({ variant, size = 'md' }: Props) {
  const iconClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  if (variant === 'success') {
    return (
      <span className="ui-status ui-status--success">
        <CheckCircle2 className={iconClass} />
      </span>
    );
  }

  if (variant === 'danger') {
    return (
      <span className="ui-status ui-status--danger">
        <XCircle className={iconClass} />
      </span>
    );
  }

  return <Circle className={`${iconClass} text-muted-foreground/40`} />;
}
