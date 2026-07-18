import { BookOpen, HelpCircle, User, UsersRound } from 'lucide-react';

import { NavItem } from '@/shared/catalogs/navigation/types';
import { routes } from '@/shared/router/routes';

export const mainNav: readonly NavItem[] = [
  {
    label: 'Students',
    labelKey: 'nav.students',
    href: routes.students,
    icon: User,
  },
  {
    label: 'Groups',
    labelKey: 'nav.groups',
    href: routes.groups,
    icon: UsersRound,
  },
  {
    label: 'Lessons',
    labelKey: 'nav.lessons',
    href: routes.lessons,
    icon: BookOpen,
  },
  {
    label: 'Q&A',
    labelKey: 'nav.qa',
    href: routes.qa,
    icon: HelpCircle,
  },
] as const;
