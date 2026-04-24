import type { GroupPreviewDto, StudentIdentityDto } from '@/shared/api';

export type AssignTargetTab = 'students' | 'groups';

export type AssignStudentOption = Pick<StudentIdentityDto, 'id' | 'username' | 'avatarUrl'> & {
  name: string | null;
  level?: string | null;
};

export type AssignGroupOption = GroupPreviewDto & {
  level?: string | null;
};
