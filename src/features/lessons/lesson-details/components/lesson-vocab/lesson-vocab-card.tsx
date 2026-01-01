'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { VocabItem } from '@/features/lessons/lesson-details/components/lesson-vocab/components/vocab-item';

export default function LessonVocabCard({ vocab }: { vocab: LessonDetails['vocab'] }) {
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
