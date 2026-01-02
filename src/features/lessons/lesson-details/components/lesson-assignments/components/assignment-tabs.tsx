import { ASSIGNMENT_TYPE_LABELS } from '@/features/lessons/lesson-details/utils/consts';

type AssignmentTabsProps = {
  types: string[];
  activeType: string | null;
  onChange: (type: string) => void;
};

export function AssignmentTabs({ types, activeType, onChange }: AssignmentTabsProps) {
  if (types.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {types.map((type) => {
          const isActive = type === activeType;
          const label = ASSIGNMENT_TYPE_LABELS[type] ?? type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`
                whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium
                transition
                ${
                  isActive
                    ? 'border-sky-400 bg-sky-50 text-sky-800'
                    : 'border-sky-100 bg-white text-muted-foreground hover:bg-sky-50/70'
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="text-xs text-muted-foreground">
        {ASSIGNMENT_TYPE_LABELS[activeType ?? ''] ?? ''}
      </div>
    </div>
  );
}
