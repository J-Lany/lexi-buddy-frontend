'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

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
          toast.error('Failed to send request', { description: e.message });
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="rounded-full w-48">
          + Add a student
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-base">Invite a student</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <StudentSearchPicker value={draft.student} onChange={(student) => patch({ student })} />

          <Textarea
            placeholder="Message (optional)"
            value={draft.message}
            onChange={(e) => patch({ message: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" onClick={handleSend} disabled={!canSend}>
              {invite.isPending ? 'Sending…' : 'Send request'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
