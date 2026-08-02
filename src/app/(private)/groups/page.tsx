import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Groups' };

import GroupsPageClient from '@/app/(private)/groups/groups-page-client';

export default function GroupsPage() {
  return <GroupsPageClient />;
}
