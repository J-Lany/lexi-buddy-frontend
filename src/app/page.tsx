import { redirect } from 'next/navigation';
import { EAppRoutes } from '@/lib/routes';

export default function Home() {
  return redirect(EAppRoutes.STUDENTS);
}
