import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { Badge } from '@/components/ui/badge';

export function VocabItem({ item }: { item: LessonDetails['vocab'][number] }) {
  const hasSynonyms = item.synonyms && item.synonyms.length > 0;

  return (
    <div
      className="
        rounded-2xl border border-sky-100 bg-white px-4 py-2.5
        flex flex-col gap-1
      "
    >
      <div>
        <div className="font-medium">{item.term}</div>
        <div className="text-muted-foreground">{item.translation || '—'}</div>
      </div>

      {hasSynonyms && (
        <div className="flex flex-wrap gap-1 mt-1">
          {item.synonyms.map((syn) => (
            <Badge key={syn} variant="outline" className="rounded-full text-xs">
              {syn}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
