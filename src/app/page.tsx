import { cookies } from 'next/headers';

import { LandingPageWidget } from '@/features/landing';

export default async function HomePage() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('refresh_token');

  return <LandingPageWidget isLoggedIn={isLoggedIn} />;
}
