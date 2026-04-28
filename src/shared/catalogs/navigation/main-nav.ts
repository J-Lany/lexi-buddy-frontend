import { BookOpen, HelpCircle, Settings, Users } from 'lucide-react';

import { NavItem } from '@/shared/catalogs/navigation/types';
import { routes } from '@/shared/router/routes';

export const mainNav: readonly NavItem[] = [
  {
    label: 'Students',
    labelKey: 'nav.students',
    href: routes.students,
    icon: Users,
  },
  {
    label: 'Lessons',
    labelKey: 'nav.lessons',
    href: routes.lessons,
    icon: BookOpen,
  },
  {
    label: 'Settings',
    labelKey: 'nav.settings',
    href: routes.profile,
    icon: Settings,
  },
  {
    label: 'Q&A',
    labelKey: 'nav.qa',
    href: routes.qa,
    icon: HelpCircle,
  },
] as const;
