import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Lessons' };

import LessonsPageClient from '@/app/(private)/lessons/lessons-page-client';

export default function LessonsPage() {
  return <LessonsPageClient />;
}
