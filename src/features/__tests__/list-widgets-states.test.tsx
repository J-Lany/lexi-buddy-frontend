import { render, screen } from '@testing-library/react';

import { GroupsListWidget } from '@/features/groups/widgets/groups-list/groups-list-widget';
import { LessonsListWidget } from '@/features/lessons/widgets/lessons-list/lessons-list-widget';
import { StudentsListWidget } from '@/features/students/widgets/students-list/students-list-widget';
import { I18nProvider } from '@/shared/i18n';

const useMyLessonsQuery = jest.fn<unknown, []>();
const useMyGroupsQuery = jest.fn<unknown, []>();
const useMyStudentsQuery = jest.fn<unknown, []>();

jest.mock('@/entities/lessons/model/query/get-my-lessons', () => ({
  useMyLessonsQuery: () => useMyLessonsQuery(),
}));
jest.mock('@/entities/groups/model/query/get-my-groups', () => ({
  useMyGroupsQuery: () => useMyGroupsQuery(),
}));
jest.mock('@/entities/students/model/queries/get-my-students', () => ({
  useMyStudentsQuery: () => useMyStudentsQuery(),
}));
jest.mock('@/features/lessons/modals/create-lesson-modal/create-lesson-modal', () => ({
  CreateLessonModal: () => <button>Create lesson</button>,
}));
jest.mock('@/features/groups/modals/create-group/create-group-modal', () => ({
  CreateGroupModal: () => <button>Create group</button>,
}));
jest.mock('@/features/students', () => ({
  InviteStudentModal: () => <button>Add student</button>,
}));
// StudentsTable/GroupsTable read useMergedQuery() (-> next/navigation) to
// build row hrefs, even though this test never navigates.
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => '/students',
  useSearchParams: () => new URLSearchParams(),
}));

function renderWithI18n(node: React.ReactNode) {
  return render(<I18nProvider>{node}</I18nProvider>);
}

const ONE_ITEM = [{ id: 1, name: 'x', title: 'x', level: 'B1', students: [], groups: [] }];

type Widget = {
  name: string;
  mock: jest.Mock;
  renderNode: (query?: string) => React.ReactElement;
  emptyTitle: string;
  errorTitle: string;
};

const WIDGETS: Widget[] = [
  {
    name: 'lessons',
    mock: useMyLessonsQuery,
    renderNode: (query = '') => <LessonsListWidget query={query} />,
    emptyTitle: 'No lessons yet',
    errorTitle: "Couldn't load lessons",
  },
  {
    name: 'groups',
    mock: useMyGroupsQuery,
    renderNode: (query = '') => <GroupsListWidget query={query} />,
    emptyTitle: 'Groups save you time',
    errorTitle: 'Something went wrong',
  },
  {
    name: 'students',
    mock: useMyStudentsQuery,
    renderNode: (query = '') => <StudentsListWidget query={query} />,
    emptyTitle: 'No students yet',
    errorTitle: 'Something went wrong',
  },
];

describe('list widget states (students/groups/lessons)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each(WIDGETS)('$name', ({ mock, renderNode, emptyTitle, errorTitle }) => {
    it('initial loading (isPending, no data yet): shows a skeleton, not onboarding or error', () => {
      mock.mockReturnValue({ data: undefined, isPending: true, isFetching: true, isError: false });
      renderWithI18n(renderNode());

      expect(screen.queryByText(emptyTitle)).not.toBeInTheDocument();
      expect(screen.queryByText(errorTitle)).not.toBeInTheDocument();
      expect(document.querySelector('[class*="animate-pulse"]')).not.toBeNull();
    });

    it('offline/paused (isPending true, isFetching false, no data): still loading, NOT the empty onboarding', () => {
      // fetchStatus "paused" — the query never started fetching because the
      // browser is offline. `isLoading` (isPending && isFetching) would be
      // false here, which is exactly the bug: showEmpty used to fire with no
      // confirmed response. isPending alone must keep this in "loading".
      mock.mockReturnValue({ data: undefined, isPending: true, isFetching: false, isError: false });
      renderWithI18n(renderNode());

      expect(screen.queryByText(emptyTitle)).not.toBeInTheDocument();
      expect(document.querySelector('[class*="animate-pulse"]')).not.toBeNull();
    });

    it('successful non-empty response: shows the list, not the skeleton', () => {
      mock.mockReturnValue({ data: ONE_ITEM, isPending: false, isFetching: false, isError: false });
      renderWithI18n(renderNode());

      expect(document.querySelector('[class*="animate-pulse"]')).toBeNull();
      expect(screen.queryByText(emptyTitle)).not.toBeInTheDocument();
    });

    it('successful empty response: shows onboarding, not the skeleton or error', () => {
      mock.mockReturnValue({ data: [], isPending: false, isFetching: false, isError: false });
      renderWithI18n(renderNode());

      expect(screen.getByText(emptyTitle)).toBeInTheDocument();
      expect(document.querySelector('[class*="animate-pulse"]')).toBeNull();
      expect(screen.queryByText(errorTitle)).not.toBeInTheDocument();
    });

    it('search with no match on a non-empty source: compact "no results", not onboarding', () => {
      mock.mockReturnValue({ data: ONE_ITEM, isPending: false, isFetching: false, isError: false });
      renderWithI18n(renderNode('zzz-does-not-exist'));

      expect(screen.getByText('No results')).toBeInTheDocument();
      expect(screen.queryByText(emptyTitle)).not.toBeInTheDocument();
    });

    it('error: shows the error card, not onboarding or the skeleton — never masked as loading', () => {
      mock.mockReturnValue({ data: undefined, isPending: false, isFetching: false, isError: true });
      renderWithI18n(renderNode());

      expect(screen.getByText(errorTitle)).toBeInTheDocument();
      expect(screen.queryByText(emptyTitle)).not.toBeInTheDocument();
      expect(document.querySelector('[class*="animate-pulse"]')).toBeNull();
    });

    it('background refetch with data already shown: list stays, skeleton does not reappear', () => {
      // isPending is false forever once a query has succeeded once, even if
      // isFetching flips true again for a background refetch.
      mock.mockReturnValue({ data: ONE_ITEM, isPending: false, isFetching: true, isError: false });
      renderWithI18n(renderNode());

      expect(document.querySelector('[class*="animate-pulse"]')).toBeNull();
      expect(screen.queryByText(emptyTitle)).not.toBeInTheDocument();
    });
  });
});
