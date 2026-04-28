'use client';

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';

import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { CardHeader } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
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
  onRemove: () => void;
};

export function HeaderSection({ title, subtitle, avatar, onEditName, onRemove }: Props) {
  const { t } = useI18n();
  const resolvedSubtitle = subtitle ?? t('students.details.studentProfile');

  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 min-w-0">
            <div className="text-[22px] sm:text-[24px] font-semibold tracking-tight truncate">
              {title}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'ui-focus shrink-0 inline-flex items-center justify-center rounded-full h-8 w-8',
                    'text-muted-foreground/60 hover:text-foreground hover:bg-accent transition-colors',
                  )}
                  aria-label={t('students.header.moreOptions')}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={onEditName}>
                  <Pencil className="h-4 w-4" />
                  {t('students.header.editName')}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={onRemove}
                  className="text-destructive focus:text-destructive focus:bg-destructive/8"
                >
                  <Trash2 className="h-4 w-4" />
                  {t('students.header.removeStudent')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="ui-meta mt-1">{resolvedSubtitle}</div>
        </div>

        <StudentAvatar username={avatar.username} avatarUrl={avatar.avatarUrl} size={avatar.size} />
      </div>
    </CardHeader>
  );
}
