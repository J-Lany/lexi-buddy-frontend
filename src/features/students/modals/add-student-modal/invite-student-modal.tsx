'use client';

import { Send } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import type { StudentBySearchDto } from '@/entities/students/api/search-students';
import { useInviteStudentMutation } from '@/entities/students/model/mutation/invite-student';
import { useTeacherProfileQuery } from '@/entities/teacher/model/query/use-teacher-profile';
import { getErrorI18nKey } from '@/shared/api';
import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

import { MessageTemplates } from './ui/message-templates';
import { StudentSearchPicker } from './ui/student-search-picker';
import { TelegramInvitePreview } from './ui/telegram-invite-preview';

type FormState = {
  student: StudentBySearchDto | null;
  message: string;
};

const initialState: FormState = { student: null, message: '' };

type TriggerProps = Omit<React.ComponentProps<typeof Button>, 'type' | 'children'>;

export function InviteStudentModal({ triggerProps }: { triggerProps?: TriggerProps } = {}) {
  const { t } = useI18n();
  const { className: triggerClassName, ...restTriggerProps } = triggerProps ?? {};
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<FormState>(initialState);

  const invite = useInviteStudentMutation();
  const { data: teacher } = useTeacherProfileQuery();

  const canSend = Boolean(state.student) && !invite.isPending;
  const studentFirstName = state.student?.firstName || state.student?.username || '';
  const studentUsername = state.student?.username ?? null;

  useEffect(() => {
    if (!open) setState(initialState);
  }, [open]);

  const handleSend = () => {
    const studentId = state.student?.id;
    if (!studentId) return;
    invite.mutate(
      { studentId, message: state.message.trim() || undefined },
      {
        onSuccess: () => {
          toast.success(t('students.invite.successTitle'), {
            description: t('students.invite.successDesc'),
          });
          setOpen(false);
        },
        onError: (e) => {
          toast.error(t('students.invite.errorTitle'), {
            description: t(getErrorI18nKey(e)),
          });
        },
      },
    );
  };

  return (
    <ResponsiveModal
      trigger={
        <Button
          type="button"
          variant="outline"
          className={cn('rounded-full whitespace-nowrap px-5 w-full sm:w-auto', triggerClassName)}
          {...restTriggerProps}
        >
          {t('students.invite.triggerBtn')}
        </Button>
      }
      title={t('students.invite.title')}
      mobileCloseLabel={t('common.cancel')}
      open={open}
      onOpenChange={setOpen}
      hideFooterOnMobile
      hideTitleOnMobile
      maxWidthClassName="sm:max-w-lg"
      right={
        <div className="sm:hidden">
          <Button
            type="button"
            size="sm"
            className="rounded-full px-4"
            onClick={handleSend}
            disabled={!canSend}
          >
            {invite.isPending ? t('students.invite.sending') : t('students.invite.sendShort')}
          </Button>
        </div>
      }
      footer={
        <div className="space-y-1.5">
          <Button
            type="button"
            size="lg"
            className="w-full gap-2"
            onClick={handleSend}
            disabled={!canSend}
          >
            <Send className="h-4 w-4" />
            {invite.isPending
              ? t('students.invite.sending')
              : canSend
                ? t('students.invite.sendToTelegram').replace('{name}', studentFirstName)
                : t('students.invite.sendDisabled')}
          </Button>
          <p className="text-center text-[11.5px] leading-tight text-muted-foreground">
            {canSend
              ? t('students.invite.sendNoteWithName').replace('{name}', studentFirstName)
              : t('students.invite.sendNote')}
          </p>
        </div>
      }
    >
      <div className="space-y-4 sm:space-y-5">
        <StudentSearchPicker
          value={state.student}
          onChange={(student) => setState((s) => ({ ...s, student }))}
        />

        <MessageTemplates
          value={state.message}
          onChange={(message) => setState((s) => ({ ...s, message }))}
        />

        <p className="text-[12.5px] leading-snug text-muted-foreground -mt-1">
          {t('students.invite.subtitle')}
        </p>

        <TelegramInvitePreview
          teacherFirstName={teacher?.firstName ?? null}
          studentUsername={studentUsername}
          message={state.message}
          defaultOpen={false}
        />
      </div>
    </ResponsiveModal>
  );
}
