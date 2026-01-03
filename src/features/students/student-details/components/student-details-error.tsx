import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavBack } from '@/components/ui/nav-back';
import { EAppRoutes } from '@/lib/routes';

export default function StudentDetailsError() {
  return (
    <Card className="rounded-2xl">
      <div className="-mt-1">
        <NavBack href={EAppRoutes.STUDENTS} label="Students" />
      </div>
      <CardHeader>
        <CardTitle>Ошибка</CardTitle>
      </CardHeader>
      <CardContent>Не удалось загрузить данные студента.</CardContent>
    </Card>
  );
}
