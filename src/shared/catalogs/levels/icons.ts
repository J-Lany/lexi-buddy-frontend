import type { LucideIcon } from 'lucide-react';
import { Award, BookOpen, GraduationCap, Library, NotebookPen, Star } from 'lucide-react';

import type { Level } from '@/shared/domain/common';

export const LEVEL_ICONS: Record<Level, LucideIcon> = {
  A1: BookOpen,
  A2: NotebookPen,
  B1: Library,
  B2: GraduationCap,
  C1: Award,
  C2: Star,
};
