import { render, screen } from '@testing-library/react';

import GroupsPageClient from '@/app/(private)/groups/groups-page-client';
import LessonsPageClient from '@/app/(private)/lessons/lessons-page-client';
import StudentsPageClient from '@/app/(private)/students/students-page-client';
import { I18nProvider } from '@/shared/i18n';

let query = '';
let lessons: unknown[] = [];
let groups: unknown[] = [];
let students: unknown[] = [];
let isPending = false;
let isError = false;
const navigateWith = jest.fn();

jest.mock('@/shared/hooks/use-merged-query', () => ({
  useMergedQuery: () => ({ getOr: () => query, navigateWith }),
}));
jest.mock('@/entities/lessons/model/query/get-my-lessons', () => ({
  useMyLessonsQuery: () => ({ data: lessons, isPending, isError }),
}));
jest.mock('@/entities/groups/model/query/get-my-groups', () => ({
  useMyGroupsQuery: () => ({ data: groups, isPending, isError }),
}));
jest.mock('@/entities/students/model/queries/get-my-students', () => ({
  useMyStudentsQuery: () => ({ data: students, isPending, isError }),
}));
jest.mock('@/features/lessons/modals/create-lesson-modal/create-lesson-modal', () => ({
  CreateLessonModal: () => <button>Create lesson</button>,
}));
jest.mock('@/features/groups/modals/create-group/create-group-modal', () => ({
  CreateGroupModal: () => <button>Create group</button>,
}));
jest.mock('@/features/lessons/widgets/lessons-list/lessons-list-widget', () => ({
  LessonsListWidget: () => <div>Lessons content</div>,
}));
jest.mock('@/features/groups/widgets/groups-list/groups-list-widget', () => ({
  GroupsListWidget: () => <div>Groups content</div>,
}));
jest.mock('@/features/students', () => ({
  InviteStudentModal: () => <button>Add student</button>,
  StudentsListWidget: () => <div>Students content</div>,
}));

function renderPage(page: React.ReactNode) {
  return render(<I18nProvider>{page}</I18nProvider>);
}

describe('entity-list search toolbars', () => {
  beforeEach(() => {
    query = '';
    lessons = [];
    groups = [];
    students = [];
    isPending = false;
    isError = false;
    navigateWith.mockClear();
  });

  const PAGES: [string, () => React.ReactElement, (items: unknown[]) => void][] = [
    ['lessons', () => <LessonsPageClient key="lessons" />, (v) => (lessons = v)],
    ['groups', () => <GroupsPageClient key="groups" />, (v) => (groups = v)],
    ['students', () => <StudentsPageClient key="students" />, (v) => (students = v)],
  ];

  it.each(PAGES)(
    'keeps the %s toolbar visible (no max-sm:hidden) while loading, with no entities',
    (_name, page, setEntities) => {
      isPending = true;
      setEntities([]);
      renderPage(page());

      expect(screen.getByTestId('entity-list-toolbar')).not.toHaveClass('max-sm:hidden');
    },
  );

  it.each(PAGES)(
    'keeps the %s toolbar visible (no max-sm:hidden) once confirmed empty',
    (_name, page, setEntities) => {
      isPending = false;
      setEntities([]);
      renderPage(page());

      expect(screen.getByTestId('entity-list-toolbar')).not.toHaveClass('max-sm:hidden');
    },
  );

  it.each(PAGES)(
    'keeps the %s toolbar visible (no max-sm:hidden) on error',
    (_name, page, setEntities) => {
      isPending = false;
      isError = true;
      setEntities([]);
      renderPage(page());

      expect(screen.getByTestId('entity-list-toolbar')).not.toHaveClass('max-sm:hidden');
    },
  );

  it.each(PAGES)(
    'keeps the %s toolbar visible (no max-sm:hidden) with a non-empty list',
    (_name, page, setEntities) => {
      isPending = false;
      setEntities([{}]);
      renderPage(page());

      expect(screen.getByTestId('entity-list-toolbar')).not.toHaveClass('max-sm:hidden');
    },
  );

  it.each(PAGES)(
    'keeps the %s search toolbar when source entities exist',
    (_name, page, setEntities) => {
      query = 'no-match';
      setEntities([{}]);
      renderPage(page());

      expect(screen.getByTestId('entity-list-toolbar')).not.toHaveClass('max-sm:hidden');
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(navigateWith).not.toHaveBeenCalled();
    },
  );

  it.each(PAGES)(
    'clears a normalized stale query once when %s source is empty',
    (_name, page, setEntities) => {
      query = '  stale query  ';
      setEntities([]);
      const view = renderPage(page());

      expect(navigateWith).toHaveBeenCalledTimes(1);
      expect(navigateWith).toHaveBeenCalledWith({ q: null });

      view.rerender(<I18nProvider>{page()}</I18nProvider>);
      expect(navigateWith).toHaveBeenCalledTimes(1);
    },
  );

  it.each([
    ['loading', { pending: true, error: false }],
    ['error', { pending: false, error: true }],
  ])('does not clear a stale query during %s', (_name, state) => {
    query = 'stale';
    isPending = state.pending;
    isError = state.error;

    renderPage(<LessonsPageClient />);
    expect(navigateWith).not.toHaveBeenCalled();
  });
});
