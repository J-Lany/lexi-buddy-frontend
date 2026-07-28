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

function renderWithI18n(node: React.ReactNode) {
  return render(<I18nProvider>{node}</I18nProvider>);
}

describe('mobile first-use empty states', () => {
  beforeEach(() => {
    const emptyQuery = { data: [], isLoading: false, isError: false };
    useMyLessonsQuery.mockReturnValue(emptyQuery);
    useMyGroupsQuery.mockReturnValue(emptyQuery);
    useMyStudentsQuery.mockReturnValue(emptyQuery);
  });

  it.each([
    ['lessons', <LessonsListWidget key="lessons" query="" />, 'No lessons yet'],
    ['groups', <GroupsListWidget key="groups" query="" />, 'Groups save you time'],
    ['students', <StudentsListWidget key="students" query="" />, 'No students yet'],
  ])('renders the %s first-use state with the shared mobile pattern', (_name, widget, title) => {
    renderWithI18n(widget);

    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.getByTestId('empty-state-actions')).toHaveClass('order-1', 'sm:order-2');
    expect(screen.getByTestId('empty-state-onboarding')).toHaveClass('order-2', 'sm:order-1');
  });

  it('uses first-use rather than search-results onboarding when the source is empty', () => {
    renderWithI18n(<LessonsListWidget query="stale-query" />);

    expect(screen.getByRole('heading', { name: 'No lessons yet' })).toBeInTheDocument();
    expect(screen.queryByText('No results')).not.toBeInTheDocument();
  });
});
