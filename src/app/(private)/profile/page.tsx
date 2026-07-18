import type { Metadata } from 'next';

import { SettingsPageWidget } from '@/features/settings/widgets/settings-page/settings-page-widget';

export const metadata: Metadata = { title: 'Settings' };

export default function ProfilePage() {
  return <SettingsPageWidget />;
}
