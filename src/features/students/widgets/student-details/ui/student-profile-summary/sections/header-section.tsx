import { Pencil } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { CardHeader } from '@/shared/ui/card';
import { StudentAvatar } from '@/shared/ui/student-avatar';

type Props = {
  title: string;
  subtitle?: string;
  avatar: {
    username: string | null;
    avatarUrl: string | null;
    size: number;
  };
  onEditName: () => void;
};

export function HeaderSection({ title, subtitle = 'Student profile', avatar, onEditName }: Props) {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="text-[22px] sm:text-[24px] font-semibold tracking-tight truncate">
              {title}
            </div>

            <button
              type="button"
              className={cn(
                'ui-focus inline-flex items-center justify-center rounded-full h-9 w-9',
                'text-muted-foreground hover:text-foreground transition-colors',
              )}
              aria-label="Edit name"
              onClick={onEditName}
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>

          <div className="ui-meta mt-1">{subtitle}</div>
        </div>

        <div className="flex items-center">
          <StudentAvatar
            username={avatar.username}
            avatarUrl={avatar.avatarUrl}
            size={avatar.size}
          />
        </div>
      </div>
    </CardHeader>
  );
}
