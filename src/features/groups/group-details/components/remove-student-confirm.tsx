'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function RemoveStudentConfirm({
  studentName,
  onRemove,
  removing,
}: {
  studentName: string;
  onRemove: () => void;
  removing?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="whitespace-nowrap rounded-full px-5 sm:w-auto"
          disabled={!!removing}
          aria-label="Remove student from group"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove student?</AlertDialogTitle>
          <AlertDialogDescription>
            {studentName} will be removed from this group. You can add them back later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onRemove}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
