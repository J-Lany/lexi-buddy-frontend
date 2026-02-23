import { redirect } from 'next/navigation';

import { routes } from '@/shared/router/routes';

export default function Home() {
  return redirect(routes.login);
}
