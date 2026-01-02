'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Baby, Users, User } from 'lucide-react';
import { AGE_LABELS, EAgeGroup } from '@/features/lessons/create-lesson-modal/types';

export type Student = {
  id: number;
  name: string;
  username: string;
  groupName: string;
  level: string;
  ageGroup: EAgeGroup;
};

const AGE_ICONS: Record<EAgeGroup, LucideIcon> = {
  UNDER_18: Baby,
  BETWEEN_18_35: Users,
  OVER_35: User,
};

export function StudentRow({ student }: { student: Student }) {
  const AgeIcon = AGE_ICONS[student.ageGroup] ?? User;

  const ageLabel = student.ageGroup ? (AGE_LABELS[student.ageGroup] ?? student.ageGroup) : null;

  const meta = [
    student.username ? `@${student.username}` : null,
    student.groupName || null,
    ageLabel,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Link
      href={`/students/${student.id}`}
      className="ui-card ui-radius-card ui-focus block px-5 sm:px-6 py-4 cursor-pointer"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="ui-thumb h-9 w-9">
          <AgeIcon size={18} strokeWidth={2} className="text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <span className="ui-title">{student.name}</span>

            <span className="ui-pill">{student.level}</span>
          </div>

          {meta && <div className="mt-1 ui-meta">{meta}</div>}
        </div>
      </div>
    </Link>
  );
}
