'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResponsiveModal } from '@/components/ui/responsive-modal';

import { StudentSearchPicker } from './components/student-search-picker';
import type { StudentSearchItem } from '@/features/students/hooks/use-search-students';
import { useCreateTeacherRequestMutation } from '@/features/students/hooks/use-create-teacher-request';

type Draft = {
  student: StudentSearchItem | null;
  message: string;
};

const initialDraft: Draft = {
  student: null,
  message: '',
};

export function InviteStudentModal() {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<Draft>(initialDraft);

  const invite = useCreateTeacherRequestMutation();

  const reset = () => setDraft(initialDraft);
  const patch = (p: Partial<Draft>) => setDraft((d) => ({ ...d, ...p }));

  const canSend = !!draft.student && !invite.isPending;

  const handleSend = () => {
    if (!draft.student) return;

    invite.mutate(
      {
        studentId: draft.student.id,
        message: draft.message.trim() || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Request sent ✉️', {
            description: 'The student will receive your invitation.',
          });
          setOpen(false);
          reset();
        },
        onError: (e) => {
          toast.error('Failed to send request', {
            description: e instanceof Error ? e.message : 'Something went wrong',
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
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
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
        <StudentSearchPicker value={draft.student} onChange={(student) => patch({ student })} />

        <Textarea
          placeholder="Message (optional)"
          value={draft.message}
          onChange={(e) => patch({ message: e.target.value })}
        />
      </div>
    </ResponsiveModal>
  );
}
