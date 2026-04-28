'use client';

import { useTeacherProfileQuery } from '@/entities/teacher';

// Fires useTeacherProfileQuery once at private layout level so all nested
// components (CreateLessonModal, settings page) get the cached result
// without each triggering their own fetch.
export function TeacherProfileInitializer() {
  useTeacherProfileQuery();
  return null;
}
