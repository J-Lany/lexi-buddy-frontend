import { BookOpen, HelpCircle, Settings, Users } from 'lucide-react';

import { NavItem } from '@/shared/catalogs/navigation/types';
import { routes } from '@/shared/router/routes';

export const mainNav: readonly NavItem[] = [
  {
    label: 'Students',
    href: routes.students,
    icon: Users,
  },
  {
    label: 'Lessons',
    href: routes.lessons,
    icon: BookOpen,
  },
  {
    label: 'Settings',
    href: routes.profile,
    icon: Settings,
  },
  {
    label: 'Q&A',
    href: routes.qa,
    icon: HelpCircle,
  },
] as const;
