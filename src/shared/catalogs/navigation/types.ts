import type { LucideIcon } from 'lucide-react';

import type { AppRoutes } from '@/shared/router/routes';

export type NavItem = {
  label: string;
  labelKey: string;
  href: AppRoutes;
  icon?: LucideIcon;
};
