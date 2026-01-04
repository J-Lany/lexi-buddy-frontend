'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ResponsiveModal } from '@/components/ui/responsive-modal';

import { useGetStudents } from '@/features/students/hooks/use-get-students';
import {
  CreateGroupPayload,
  useCreateGroupMutation,
} from '@/features/groups/hooks/use-create-group';

import type { CreateGroupDraft, Student } from './types';
import { StepDetails } from './components/step-details';
import { StepStudents } from './components/step-students';
import { StepProgress } from '@/components/ui/progress-bar';
import { CreateGroupFooter } from '@/features/groups/create-group-modal/components/create-group-footer';

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

  const canNext = draft.name.trim().length > 0 && draft.level.trim().length > 0;
  const canCreate = draft.studentIds.length >= 2 && !createGroup.isPending;

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

  const footer = (
    <CreateGroupFooter
      step={step}
      canNext={canNext}
      canCreate={canCreate}
      isCreating={createGroup.isPending}
      onNext={() => setStep(2)}
      onBack={() => setStep(1)}
      onCreate={handleCreate}
    />
  );

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
      trigger={
        <Button
          type="button"
          variant="outline"
          className="w-full whitespace-nowrap rounded-full px-5 sm:w-auto"
        >
          + Create a new group
        </Button>
      }
      maxWidthClassName="sm:max-w-[560px]"
      title={step === 1 ? 'Group details' : 'Add students'}
      right={<div className="text-[13px] text-muted-foreground">{step} / 2</div>}
      footer={footer}
    >
      {step === 1 ? (
        <StepDetails draft={draft} onChange={patchDraft} />
      ) : (
        <StepStudents students={students} draft={draft} onChange={patchDraft} />
      )}
    </ResponsiveModal>
  );
}
