// src/features/students/widgets/student-details/ui/student-profile-summary/modals/remove-student-relationship-confirm.tsx

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
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';

type Props = {
  studentName: string;
  pending?: boolean;
  onConfirm: () => Promise<void>;
};

export function RemoveStudentRelationshipConfirm({
  studentName,
  pending = false,
  onConfirm,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          Remove student
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove student?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove {studentName}? You’ll stop teaching this student.
            They’ll be removed from your groups and active assignments will be revoked. Past
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
