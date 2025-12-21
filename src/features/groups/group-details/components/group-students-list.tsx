import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { GroupStudent } from '@/features/groups/utils/types';
import { ViewAllStudentsDialog } from '@/features/groups/group-details/modals/view-all-students';

export default function GroupStudentsList({ students }: { students: GroupStudent[] }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Students</CardTitle>
        <ViewAllStudentsDialog students={students} title="All students" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {students.map((s) => (
          <div key={s.id} className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{s.name}</div>
              {s.username && <div className="text-sm text-blue-600">@{s.username}</div>}
            </div>
            <div className="text-sm text-muted-foreground">{s.level}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
