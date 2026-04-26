'use client';

import * as React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';

type Props = {
  studentName: string;
  pending?: boolean;
  onConfirm: () => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RemoveStudentRelationshipConfirm({
  studentName,
  pending = false,
  onConfirm,
  open,
  onOpenChange,
}: Props) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove student?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove {studentName}? You&apos;ll stop teaching this student.
            They&apos;ll be removed from your groups and active assignments will be revoked. Past
            progress will be kept.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={pending}
            onClick={(event) => {
              event.preventDefault();
              void handleConfirm().catch(() => {});
            }}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {pending ? 'Removing…' : 'Remove'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
