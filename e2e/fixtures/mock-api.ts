import type { Page, Route } from '@playwright/test';

import type { GroupDashboardDto } from '../../src/entities/groups/api/get-group-dashboard';
import type { GroupDto } from '../../src/entities/groups/api/get-my-groups';
import type { LessonSummaryDto } from '../../src/entities/lessons/api/get-my-lessons';
import type { StudentDto } from '../../src/entities/students/api/get-my-students';
import type { StudentDashboardDto } from '../../src/entities/students/api/get-student-dashboard';
import type { TeacherProfileDto } from '../../src/entities/teacher/api/get-teacher-profile';

// The build-time NEXT_PUBLIC_API_URL differs between local dev (.env:
// http://localhost:4000) and CI (http://localhost:3000/api-proxy). A plain
// pathname-suffix match isn't safe here: '/lessons' is both the API list
// endpoint AND the Next.js page route at the same origin/port in local dev,
// so a bare suffix match steals the page navigation itself and serves JSON
// as the document. Requiring either the api-proxy prefix (CI) or the
// distinct API port (local) keeps this scoped to actual API calls.
function isApiRequest(url: URL): boolean {
  return url.pathname.startsWith('/api-proxy') || url.port === '4000';
}

function bySuffix(suffix: string) {
  return (url: URL) => isApiRequest(url) && url.pathname.endsWith(suffix);
}

// Matches e.g. /groups/42/dashboard or /api-proxy/groups/42/dashboard — the id
// is a wildcard since these tests don't care which group/student was loaded.
function byPattern(pattern: RegExp) {
  return (url: URL) => isApiRequest(url) && pattern.test(url.pathname);
}

export type MockResponse<T> = {
  status?: number;
  delayMs?: number;
  body?: T;
};

export type MockApiOptions = {
  /** Fired unconditionally by TeacherProfileInitializer on every private page. Defaults to a 200. Pass `false` to leave unmocked — this now fails the test loudly via the catch-all below rather than silently falling through to a real backend. */
  teacherProfile?: MockResponse<TeacherProfileDto> | false;
  students?: MockResponse<StudentDto[]>;
  groups?: MockResponse<GroupDto[]>;
  lessons?: MockResponse<LessonSummaryDto[]>;
  /** `/groups/:id/dashboard` — the id is not checked, any group detail page gets this body. */
  groupDashboard?: MockResponse<GroupDashboardDto>;
  /** `/students/:id/dashboard` — the id is not checked, any student detail page gets this body. */
  studentDashboard?: MockResponse<StudentDashboardDto>;
};

const DEFAULT_TEACHER_PROFILE: TeacherProfileDto = {
  id: 1,
  firstName: 'Anna',
  lastName: 'Ivanovna',
  username: 'anna_teacher',
  avatarUrl: null,
  defaultLanguage: 'english',
  isAdmin: false,
};

async function fulfillJson<T>(route: Route, delayMs: number | undefined, status: number, body: T) {
  if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));
  await route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  });
}

// Endpoints a test might want to assert were actually requested — e.g. to
// tell "the mock matched and the app rendered its response" apart from "the
// app never called this endpoint at all" (wrong hook, wrong path, or a
// broader mock/route registered earlier stole the request first).
export type MockedEndpoint = 'teacherProfile' | 'students' | 'groups' | 'lessons';

export type MockApiHandle = {
  requestCount(endpoint: MockedEndpoint): number;
  /** Every API request this test did NOT explicitly mock, as `"METHOD URL"`. */
  unmockedRequests(): string[];
};

/**
 * Registers response mocks for the handful of GET endpoints these pages/modals
 * depend on, so tests run without a live backend. Only endpoints explicitly
 * passed get a handler. Any other method on a mocked path (e.g. POST /lessons
 * to create a lesson) is aborted rather than left to hit an unreachable real
 * backend — these tests never submit those forms, so aborting fails fast
 * instead of hanging on a connection timeout.
 *
 * Any API request that matches none of the handlers below hits the catch-all
 * registered first (see the note by isApiRequest at the bottom of this
 * function for why "registered first" means "lowest priority"): it's
 * recorded in `unmockedRequests()` and aborted, never left to silently fall
 * through to a real/absent backend. That silent fallthrough is exactly what
 * caused the /groups touch/webkit auth-redirect bug: `CreateGroupModal`
 * unconditionally calls `useMyStudentsQuery()` (needed for its "assign
 * students" step) the moment it mounts — which is whenever the toolbar or
 * onboarding empty state renders, not just while the modal is open — so any
 * `/groups` test that didn't also mock `students` let that request fall
 * through to the real backend, 401, and trigger the app's real auth-refresh
 * -> logout -> redirect-to-/login chain. Nothing rendered anything wrong;
 * the page just silently navigated itself away mid-test once that chain
 * outraced the test's own assertions — see PAGES['/groups'] below, which now
 * mocks `students` too.
 */
export async function mockApi(page: Page, options: MockApiOptions = {}): Promise<MockApiHandle> {
  const counts: Partial<Record<MockedEndpoint, number>> = {};
  const unmocked: string[] = [];

  // Registered first = lowest priority (Playwright invokes route handlers in
  // reverse registration order), so every `page.route(bySuffix(...))` call
  // below still wins for the paths it targets. Only a request matching none
  // of them reaches this handler.
  await page.route(
    (url) => isApiRequest(url),
    async (route) => {
      const req = route.request();
      unmocked.push(`${req.method()} ${req.url()}`);
      await route.abort('failed');
    },
  );

  if (options.teacherProfile !== false) {
    const cfg = options.teacherProfile ?? {};
    counts.teacherProfile = 0;
    await page.route(bySuffix('/auth/me'), async (route) => {
      if (route.request().method() !== 'GET') return route.abort();
      counts.teacherProfile!++;
      await fulfillJson(route, cfg.delayMs, cfg.status ?? 200, cfg.body ?? DEFAULT_TEACHER_PROFILE);
    });
  }

  if (options.students) {
    const cfg = options.students;
    counts.students = 0;
    await page.route(bySuffix('/students/my'), async (route) => {
      if (route.request().method() !== 'GET') return route.abort();
      counts.students!++;
      await fulfillJson(route, cfg.delayMs, cfg.status ?? 200, cfg.body ?? []);
    });
  }

  if (options.groups) {
    const cfg = options.groups;
    counts.groups = 0;
    await page.route(bySuffix('/groups/my'), async (route) => {
      if (route.request().method() !== 'GET') return route.abort();
      counts.groups!++;
      await fulfillJson(route, cfg.delayMs, cfg.status ?? 200, cfg.body ?? []);
    });
  }

  if (options.lessons) {
    const cfg = options.lessons;
    counts.lessons = 0;
    await page.route(bySuffix('/lessons'), async (route) => {
      if (route.request().method() !== 'GET') return route.abort();
      counts.lessons!++;
      await fulfillJson(route, cfg.delayMs, cfg.status ?? 200, cfg.body ?? []);
    });
  }

  if (options.groupDashboard) {
    const cfg = options.groupDashboard;
    await page.route(byPattern(/^(\/api-proxy)?\/groups\/\d+\/dashboard$/), async (route) => {
      if (route.request().method() !== 'GET') return route.abort();
      await fulfillJson(route, cfg.delayMs, cfg.status ?? 200, cfg.body ?? sampleGroupDashboard());
    });
  }

  if (options.studentDashboard) {
    const cfg = options.studentDashboard;
    await page.route(byPattern(/^(\/api-proxy)?\/students\/\d+\/dashboard$/), async (route) => {
      if (route.request().method() !== 'GET') return route.abort();
      await fulfillJson(
        route,
        cfg.delayMs,
        cfg.status ?? 200,
        cfg.body ?? sampleStudentDashboard(),
      );
    });
  }

  return {
    requestCount: (endpoint) => counts[endpoint] ?? 0,
    unmockedRequests: () => [...unmocked],
  };
}

export function sampleStudent(overrides: Partial<StudentDto> = {}): StudentDto {
  return {
    id: 1,
    name: 'Ivan Petrov',
    username: 'ivan_petrov',
    avatarUrl: null,
    groups: [],
    level: 'B1',
    ...overrides,
  };
}

export function sampleGroup(overrides: Partial<GroupDto> = {}): GroupDto {
  return {
    id: 1,
    name: '9-B',
    level: 'B1',
    students: [],
    ...overrides,
  };
}

export function sampleLesson(overrides: Partial<LessonSummaryDto> = {}): LessonSummaryDto {
  return {
    id: 1,
    title: 'Present Perfect Basics',
    topic: 'Grammar',
    level: 'B1',
    ageCategory: 'adult',
    targetLanguage: 'english',
    nativeLanguage: 'russian',
    instructionLanguage: 'native',
    vocabCount: 12,
    assignmentsCount: 0,
    ...overrides,
  };
}

export function sampleGroupDashboard(
  overrides: Partial<GroupDashboardDto> = {},
): GroupDashboardDto {
  return {
    group: { id: 1, name: '9-B', description: '', level: 'B1', studentsCount: 1 },
    students: [
      {
        id: 1,
        name: 'Ivan Petrov',
        username: 'ivan_petrov',
        level: 'B1',
        avatarUrl: '',
        telegramValue: '@ivan_petrov',
      },
    ],
    lessons: [],
    ...overrides,
  };
}

export function sampleStudentDashboard(
  overrides: Partial<StudentDashboardDto> = {},
): StudentDashboardDto {
  return {
    student: {
      id: 1,
      username: 'ivan_petrov',
      firstName: 'Ivan',
      lastName: 'Petrov',
      avatarUrl: null,
      level: 'B1',
      ageGroup: 'adult',
      lastVisit: null,
      createdAt: '2026-01-01T00:00:00.000Z',
      telegramValue: '@ivan_petrov',
    },
    groups: [],
    stats: {
      lessonsTotal: 0,
      assignmentsTotal: 0,
      assignmentsDone: 0,
      progressPercent: 0,
      avgScore: null,
      lastSubmittedAt: null,
    },
    lessons: [],
    ...overrides,
  };
}
