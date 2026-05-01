import { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';

export function VocabItem({ item }: { item: LessonDashboardDto['vocab'][number] }) {
  return (
    <div className="ui-card-static rounded-2xl px-4 py-3 flex flex-col gap-1.5">
      <div>
        <div className="ui-title">{item.term}</div>
        <div className="ui-meta">{item.translation || '—'}</div>
      </div>

      {item.synonyms?.length ? (
        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {item.synonyms.map((syn) => (
            <span key={syn} className="ui-pill">
              {syn}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
