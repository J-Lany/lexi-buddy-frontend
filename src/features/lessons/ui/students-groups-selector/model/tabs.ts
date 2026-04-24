import type { SegmentedOption } from '@/shared/ui/segmented-control';

import type { AssignTargetTab } from './types';

export const ASSIGN_TARGET_TABS = [
  { value: 'students', label: 'Students' },
  { value: 'groups', label: 'Groups' },
] as const satisfies readonly SegmentedOption<AssignTargetTab>[];
