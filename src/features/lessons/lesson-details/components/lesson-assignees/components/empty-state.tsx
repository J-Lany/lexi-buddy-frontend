import { CardContent } from '@/components/ui/card';

export function EmptyState() {
  return (
    <CardContent className="text-sm text-muted-foreground">
      This lesson is not assigned to anyone yet.
    </CardContent>
  );
}
