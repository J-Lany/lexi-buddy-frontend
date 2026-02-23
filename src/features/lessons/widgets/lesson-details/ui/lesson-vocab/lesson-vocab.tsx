'use client';

import { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { VocabItem } from '@/features/lessons/widgets/lesson-details/ui/lesson-vocab/ui/vocab-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function LessonVocab({ vocab }: { vocab: LessonDashboardDto['vocab'] }) {
  const hasVocab = vocab.length > 0;

  return (
    <Card className="rounded-3xl border border-sky-100/70 bg-white/95 shadow-[0_8px_24px_rgba(15,116,143,0.06)]">
      <CardHeader>
        <CardTitle>Vocabulary</CardTitle>
      </CardHeader>

      <CardContent className="text-sm">
        {!hasVocab ? (
          <div className="text-muted-foreground text-sm">No vocabulary items</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            {vocab.map((item) => (
              <VocabItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
