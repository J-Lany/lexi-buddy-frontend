'use client';

import * as React from 'react';

import { useI18n } from '@/shared/i18n';
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
  const { t } = useI18n();

  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('students.remove.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('students.remove.desc').replace('{name}', studentName)}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>{t('students.remove.cancel')}</AlertDialogCancel>

          <AlertDialogAction
            disabled={pending}
            onClick={(event) => {
              event.preventDefault();
              void handleConfirm().catch(() => {});
            }}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {pending ? t('students.remove.confirming') : t('students.remove.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
