import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { LandingPageWidget } from '@/features/landing';

export const metadata: Metadata = {
  title: 'Lexi Buddy — AI Lesson Builder for Language Teachers',
  description:
    'Turn any word list into interactive Telegram drills in under 2 minutes. AI-powered lesson builder built for language teachers.',
  openGraph: {
    title: 'Lexi Buddy — AI Lesson Builder for Language Teachers',
    description:
      'Turn any word list into interactive Telegram drills in under 2 minutes. No extra apps for students.',
    type: 'website',
    siteName: 'Lexi Buddy',
    // og:image — add /og.png to /public when the asset is ready
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lexi Buddy — AI Lesson Builder for Language Teachers',
    description:
      'Turn any word list into interactive Telegram drills in under 2 minutes. No extra apps for students.',
  },
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('refresh_token');

  return <LandingPageWidget isLoggedIn={isLoggedIn} />;
}
