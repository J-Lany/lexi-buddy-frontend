'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { useCreateGroupMutation } from '@/entities/groups/model/mutation/create-group';
import { CreateGroupFooter } from '@/features/groups/modals/create-group/ui/create-group-footer';
import { StepDetails } from '@/features/groups/modals/create-group/ui/step-details';
import { StepStudents } from '@/features/groups/modals/create-group/ui/step-students';
import { useMyStudentsQuery } from '@/features/students';
import { level } from '@/shared/domain/common';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { Button } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

import type { CreateGroupDraft } from './types';

const initialDraft: CreateGroupDraft = {
  name: '',
  level: level.A1,
  description: '',
  studentIds: [],
};

export function CreateGroupModal() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2>(1);
  const [draft, setDraft] = React.useState<CreateGroupDraft>(initialDraft);

  const { data: students = [] } = useMyStudentsQuery();
  const createGroup = useCreateGroupMutation();

  const patchDraft = (patch: Partial<CreateGroupDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const reset = () => {
    setStep(1);
    setDraft(initialDraft);
  };

  const canNext = draft.name.trim().length > 0;
  const canCreate = draft.studentIds.length >= 2 && !createGroup.isPending;

  const handleCreate = () => {
    if (!canNext) return;

    createGroup.mutate(
      {
        name: draft.name.trim(),
        level: draft.level,
        description: draft.description.trim() || undefined,
        studentIds: draft.studentIds,
      },
      {
        onSuccess: () => {
          toast.success('Group created 🎉', {
            description: 'The group has been added to your list.',
          });
          setOpen(false);
          reset();
        },
        onError: (e) => {
          toast.error('Failed to create group', { description: getErrorMessage(e) });
        },
      },
    );
  };

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
      footer={
        <CreateGroupFooter
          step={step}
          canNext={canNext}
          canCreate={canCreate}
          isCreating={createGroup.isPending}
          onNext={() => setStep(2)}
          onBack={() => setStep(1)}
          onCreate={handleCreate}
        />
      }
    >
      {step === 1 ? (
        <StepDetails draft={draft} onChange={patchDraft} />
      ) : (
        <StepStudents students={students} draft={draft} onChange={patchDraft} />
      )}
    </ResponsiveModal>
  );
}
