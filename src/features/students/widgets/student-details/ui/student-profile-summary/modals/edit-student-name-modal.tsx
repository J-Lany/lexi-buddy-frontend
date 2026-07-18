'use client';

import * as React from 'react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

export function EditStudentNameModal(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  initial: {
    firstName?: string | null;
    lastName?: string | null;
  };

  saving?: boolean;

  onSave: (params: { firstName: string; lastName: string }) => void | Promise<void>;
  trigger?: React.ReactNode;
}) {
  const { open, onOpenChange, initial, saving, onSave, trigger } = props;

  const [firstName, setFirstName] = React.useState(initial.firstName ?? '');
  const [lastName, setLastName] = React.useState(initial.lastName ?? '');

  React.useEffect(() => {
    if (!open) return;
    setFirstName(initial.firstName ?? '');
    setLastName(initial.lastName ?? '');
  }, [open, initial.firstName, initial.lastName]);

  const canSave = !saving;

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger ?? <span />}
      title="Edit name"
      maxWidthClassName="sm:max-w-[560px]"
      footer={
        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={!canSave}
            onClick={() =>
              void onSave({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
              })
            }
          >
            Save
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            disabled={saving}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      }
    >
      <div className={cn('space-y-4')}>
        <div className="space-y-2">
          <div className="ui-meta">First name</div>
          <Input
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
        </div>

        <div className="space-y-2">
          <div className="ui-meta">Last name</div>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
        </div>
      </div>
    </ResponsiveModal>
  );
}
