import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GroupDashboard } from '@/features/groups/utils/types';

export default function GroupProfileCard({ group }: { group: GroupDashboard['group'] }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {group.level && <Badge>Level {group.level}</Badge>}
          <Badge variant="secondary">{group.studentsCount} students</Badge>
        </div>
      </CardHeader>
      {group.description && (
        <CardContent className="text-muted-foreground">{group.description}</CardContent>
      )}
    </Card>
  );
}
