import { render, screen } from '@testing-library/react';

import GroupsPageClient from '@/app/(private)/groups/groups-page-client';
import LessonsPageClient from '@/app/(private)/lessons/lessons-page-client';
import StudentsPageClient from '@/app/(private)/students/students-page-client';
import { I18nProvider } from '@/shared/i18n';

let query = '';
let lessons: unknown[] = [];
let groups: unknown[] = [];
let students: unknown[] = [];
let isLoading = false;
let isError = false;
const navigateWith = jest.fn();

jest.mock('@/shared/hooks/use-merged-query', () => ({
  useMergedQuery: () => ({ getOr: () => query, navigateWith }),
}));
jest.mock('@/entities/lessons/model/query/get-my-lessons', () => ({
  useMyLessonsQuery: () => ({ data: lessons, isLoading, isError }),
}));
jest.mock('@/entities/groups/model/query/get-my-groups', () => ({
  useMyGroupsQuery: () => ({ data: groups, isLoading, isError }),
}));
jest.mock('@/entities/students/model/queries/get-my-students', () => ({
  useMyStudentsQuery: () => ({ data: students, isLoading, isError }),
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
    isLoading = false;
    isError = false;
    navigateWith.mockClear();
  });

  it.each([
    ['lessons', <LessonsPageClient key="lessons" />],
    ['groups', <GroupsPageClient key="groups" />],
    ['students', <StudentsPageClient key="students" />],
  ])('hides the %s search toolbar only below sm for first use', (_name, page) => {
    renderPage(page as React.ReactNode);

    expect(screen.getByTestId('entity-list-toolbar')).toHaveClass('max-sm:hidden', 'sm:p-5');
  });

  it.each([
    ['lessons', <LessonsPageClient key="lessons-search" />, () => (lessons = [{}])],
    ['groups', <GroupsPageClient key="groups-search" />, () => (groups = [{}])],
    ['students', <StudentsPageClient key="students-search" />, () => (students = [{}])],
  ])('keeps the %s search toolbar when source entities exist', (_name, page, setEntities) => {
    query = 'no-match';
    setEntities();
    renderPage(page as React.ReactNode);

    expect(screen.getByTestId('entity-list-toolbar')).not.toHaveClass('max-sm:hidden');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(navigateWith).not.toHaveBeenCalled();
  });

  it.each([
    ['lessons', <LessonsPageClient key="lessons-clear" />],
    ['groups', <GroupsPageClient key="groups-clear" />],
    ['students', <StudentsPageClient key="students-clear" />],
  ])('clears a normalized stale query once when %s source is empty', (_name, page) => {
    query = '  stale query  ';
    const view = renderPage(page as React.ReactNode);

    expect(navigateWith).toHaveBeenCalledTimes(1);
    expect(navigateWith).toHaveBeenCalledWith({ q: null });

    view.rerender(<I18nProvider>{page}</I18nProvider>);
    expect(navigateWith).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['loading', { loading: true, error: false }],
    ['error', { loading: false, error: true }],
  ])('does not clear a stale query during %s', (_name, state) => {
    query = 'stale';
    isLoading = state.loading;
    isError = state.error;

    renderPage(<LessonsPageClient />);
    expect(navigateWith).not.toHaveBeenCalled();
  });
});
