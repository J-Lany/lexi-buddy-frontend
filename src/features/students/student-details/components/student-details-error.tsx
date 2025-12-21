import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentDetailsError() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Ошибка</CardTitle>
      </CardHeader>
      <CardContent>Не удалось загрузить данные студента.</CardContent>
    </Card>
  );
}
