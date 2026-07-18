import { Baby, LucideIcon, User, Users } from 'lucide-react';

import { AgeGroup, ageGroup } from '@/shared/domain/common';

export const AGE_GROUP_ICONS: Record<AgeGroup, LucideIcon> = {
  [ageGroup.CHILD]: Baby,
  [ageGroup.TEENAGER]: Users,
  [ageGroup.ADULT]: User,
};
