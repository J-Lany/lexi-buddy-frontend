import type { Metadata } from 'next';

import { QaPageWidget } from '@/features/qa';

export const metadata: Metadata = { title: 'Help & Q&A' };

export default function QaPage() {
  return <QaPageWidget />;
}
