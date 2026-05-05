'use client';

import { Send } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import type { StudentBySearchDto } from '@/entities/students/api/search-students';
import { useInviteStudentMutation } from '@/entities/students/model/mutation/invite-student';
import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { Button } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';
import { Textarea } from '@/shared/ui/textarea';

import { StudentSearchPicker } from './ui/student-search-picker';

type FormState = {
  student: StudentBySearchDto | null;
  message: string;
};

const initialState: FormState = {
  student: null,
  message: '',
};

type TriggerProps = Omit<React.ComponentProps<typeof Button>, 'type' | 'children'>;

export function InviteStudentModal({ triggerProps }: { triggerProps?: TriggerProps } = {}) {
  const { t } = useI18n();
  const { className: triggerClassName, ...restTriggerProps } = triggerProps ?? {};
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<FormState>(initialState);

  const invite = useInviteStudentMutation();

  const canSend = Boolean(state.student) && !invite.isPending;

  useEffect(() => {
    if (!open) {
      setState(initialState);
    }
  }, [open]);

  const handleSend = () => {
    const studentId = state.student?.id;
    if (!studentId) return;

    const message = state.message.trim() || undefined;

    invite.mutate(
      { studentId, message },
      {
        onSuccess: () => {
          toast.success(t('students.invite.successTitle'), {
            description: t('students.invite.successDesc'),
          });
          setOpen(false);
        },
        onError: (e) => {
          toast.error(t('students.invite.errorTitle'), {
            description: getErrorMessage(e),
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
      open={open}
      onOpenChange={setOpen}
      footer={
        <Button type="button" size="lg" className="w-full" onClick={handleSend} disabled={!canSend}>
          <Send className="h-4 w-4" />
          {invite.isPending ? t('students.invite.sending') : t('students.invite.send')}
        </Button>
      }
    >
      <div className="space-y-5 py-3">
        {/* Section 1: Find student */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{t('students.invite.findStudent')}</p>
          <StudentSearchPicker
            value={state.student}
            onChange={(student) => setState((s) => ({ ...s, student }))}
          />
        </div>

        {/* Section 2: Personal message */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            {t('students.invite.messageLabel')}{' '}
            <span className="font-normal text-muted-foreground">
              {t('students.invite.messageLabelOptional')}
            </span>
          </p>
          <Textarea
            placeholder={t('students.invite.messagePlaceholder')}
            minRows={4}
            value={state.message}
            onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
          />
        </div>
      </div>
    </ResponsiveModal>
  );
}
