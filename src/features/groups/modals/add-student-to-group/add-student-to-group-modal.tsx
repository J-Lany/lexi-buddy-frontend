'use client';

import { Plus } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { useAddStudentToGroupMutation } from '@/entities/groups/model/mutation/add-student-to-group';
import { useMyStudentsQuery } from '@/entities/students/model/queries/get-my-students';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

import { filterAvailableStudents } from './lib/filter-available-students';
import { StudentPickerRow } from './ui/student-picker-row';

type Props = {
  groupId: number;
  existingStudentIds: number[];
  title?: string;
};

export function AddStudentToGroupModal({
  groupId,
  existingStudentIds,
  title = 'Add student',
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const studentsQuery = useMyStudentsQuery({ enabled: open });
  const addStudentMutation = useAddStudentToGroupMutation();

  React.useEffect(() => {
    if (!open) setSearchQuery('');
  }, [open]);

  const availableStudents = React.useMemo(() => {
    return filterAvailableStudents({
      students: studentsQuery.data ?? [],
      existingStudentIds,
      query: searchQuery,
    });
  }, [studentsQuery.data, existingStudentIds, searchQuery]);
  const pendingStudentId = addStudentMutation.isPending
    ? (addStudentMutation.variables?.studentId ?? null)
    : null;

  const handlePickStudent = (studentId: number) => {
    addStudentMutation.mutate(
      { studentId, groupId },
      {
        onSuccess: () => {
          setOpen(false);
          setSearchQuery('');
        },
        onError: (e) => {
          toast.error('Failed to add student', { description: getErrorMessage(e) });
        },
      },
    );
  };

  const isLoading = studentsQuery.isLoading;
  const isError = studentsQuery.isError;

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          type="button"
          variant="outline"
          className="w-full whitespace-nowrap rounded-full px-5 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          {title}
        </Button>
      }
      title={title}
    >
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name / username / level…"
        className="mb-3"
        autoFocus
      />

      {isLoading ? (
        <div className="ui-meta py-6">Loading…</div>
      ) : isError ? (
        <div className="ui-meta py-6 text-destructive">Failed to load students</div>
      ) : availableStudents.length === 0 ? (
        <div className="ui-meta py-6">No available students</div>
      ) : (
        <div className="flex flex-col gap-2">
          {availableStudents.map((student) => (
            <StudentPickerRow
              key={student.id}
              student={student}
              pending={pendingStudentId === student.id}
              onPick={handlePickStudent}
            />
          ))}
        </div>
      )}
    </ResponsiveModal>
  );
}
