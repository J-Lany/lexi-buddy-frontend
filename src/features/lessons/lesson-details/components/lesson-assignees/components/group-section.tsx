import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { Badge } from '@/components/ui/badge';
import { SectionLabel } from '@/features/lessons/lesson-details/components/lesson-assignees/components/section-label';

type GroupsSectionProps = {
  groups: LessonDetails['groups'];
};

export function GroupsSection({ groups }: GroupsSectionProps) {
  return (
    <section className="space-y-2">
      <SectionLabel>Groups</SectionLabel>

      {groups.length === 0 ? (
        <p className="text-xs text-muted-foreground">No groups</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <Badge key={g.id} variant="outline" className="max-w-full truncate rounded-full">
              {g.name}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}
