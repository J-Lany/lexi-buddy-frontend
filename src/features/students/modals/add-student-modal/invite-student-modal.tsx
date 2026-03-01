'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import type { StudentBySearchDto } from '@/entities/students/api/search-students';
import { useInviteStudentMutation } from '@/entities/students/model/mutation/invite-student';
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

export function InviteStudentModal() {
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
          toast.success('Request sent ✉️', {
            description: 'The student will receive your invitation.',
          });
          setOpen(false);
        },
        onError: (e) => {
          toast.error('Failed to send request', {
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
          className="rounded-full whitespace-nowrap px-5 w-full sm:w-auto"
        >
          + Add a student
        </Button>
      }
      title="Invite a student"
      open={open}
      onOpenChange={setOpen}
      footer={
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={handleSend}
            disabled={!canSend}
          >
            {invite.isPending ? 'Sending…' : 'Send request'}
          </Button>
        </div>
      }
    >
      <div className="grid gap-4">
        <StudentSearchPicker
          value={state.student}
          onChange={(student) => setState((s) => ({ ...s, student }))}
        />

        <Textarea
          placeholder="Message (optional)"
          minRows={5}
          value={state.message}
          onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
        />
      </div>
    </ResponsiveModal>
  );
}
