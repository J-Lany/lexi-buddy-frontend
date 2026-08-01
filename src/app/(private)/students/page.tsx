import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Students' };

import StudentsPageClient from '@/app/(private)/students/students-page-client';

export default function StudentsPage() {
  return <StudentsPageClient />;
}
