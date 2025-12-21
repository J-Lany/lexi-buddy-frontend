'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useGetStudents } from '@/features/students/hooks/use-get-students';
import {
  CreateGroupPayload,
  useCreateGroupMutation,
} from '@/features/students/hooks/use-create-group';

import type { CreateGroupDraft, Student } from './types';
import { StepDetails } from './components/step-details';
import { StepStudents } from './components/step-students';
import { StepProgress } from './components/step-progress';

const initialDraft: CreateGroupDraft = {
  name: '',
  level: '',
  description: '',
  studentIds: [],
};

export function CreateGroupModal() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2>(1);
  const [draft, setDraft] = React.useState<CreateGroupDraft>(initialDraft);

  const { data: studentsRaw = [] } = useGetStudents();
  const students = studentsRaw as Student[];

  const createGroup = useCreateGroupMutation();

  const patchDraft = (patch: Partial<CreateGroupDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const reset = () => {
    setStep(1);
    setDraft(initialDraft);
  };

  const handleCreate = () => {
    createGroup.mutate(
      {
        name: draft.name.trim(),
        level: draft.level,
        description: draft.description.trim(),
        studentIds: draft.studentIds,
      } as CreateGroupPayload,
      {
        onSuccess: () => {
          toast.success('Group created 🎉', {
            description: 'The group has been added to your list.',
          });
          setOpen(false);
          reset();
        },
        onError: (e) => {
          toast.error('Failed to create group', { description: e.message });
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
          + Create a new group
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-base">
            <StepProgress step={step} />
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <StepDetails draft={draft} onChange={patchDraft} onNext={() => setStep(2)} />
        ) : (
          <StepStudents
            students={students}
            draft={draft}
            onChange={patchDraft}
            onBack={() => setStep(1)}
            onCreate={handleCreate}
            isCreating={createGroup.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
