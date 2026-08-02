import { expect, Page, test } from '@playwright/test';

import type { GroupDto } from '../src/entities/groups/api/get-my-groups';
import type { LessonSummaryDto } from '../src/entities/lessons/api/get-my-lessons';
import type { StudentDto } from '../src/entities/students/api/get-my-students';
import { authenticateWithFakeCookie } from './fixtures/auth-cookie';
import {
  mockApi,
  MockApiHandle,
  MockedEndpoint,
  MockResponse,
  sampleGroup,
  sampleLesson,
  sampleStudent,
} from './fixtures/mock-api';

// Regression suite for the "Students"/"Groups"/"Lessons" loading/empty-state
// flicker and stuck-loader bug. Root causes (proven, see the investigation
// notes and _diagnostic-hang-repro during development):
//  1. All three RSC pages did `await queryClient.prefetchQuery(...)` with a
//     browser-only axios client that can never succeed server-side — this
//     was NOT the cause of the "stuck forever" symptom (Next statically
//     prerenders these routes, so the failed prefetch cost is paid once at
//     build time, not per request — measured TTFB ~10-20ms in production).
//     It IS still dead weight (the failed query is never dehydrated, so the
//     client always refetches from scratch) and is removed regardless.
//  2. The real "stuck forever" mechanism: neither the `api` nor `authApi`
//     axios instances set a `timeout`, so a request the browser never gets a
//     response for leaves the query's promise permanently unsettled —
//     `isPending`/`isLoading` never resolve to anything, so the skeleton
//     never transitions to list/empty/error. Proven in-browser: a mocked
//     hanging /students/my request left the skeleton visible 27s+ later.
//  3. `isLoading = isPending && isFetching` is false while `fetchStatus`
//     is `"paused"` (offline) — so `showEmpty` (which only checks
//     `!isLoading`) fires while there's no confirmed empty response yet,
//     showing "no students yet" onboarding while actually offline.
//  4. The toolbar (search + add button) is unconditionally hidden on mobile
//     via `max-sm:hidden` whenever the list is empty, so the whole top
//     block disappears at the same moment the skeleton is replaced by the
//     onboarding empty state — two structural changes in one render.
// This spec runs on chromium-touch (mobile viewport) and
// chromium-desktop-mocked (desktop viewport) — see playwright.config.ts.

type PageSpec = {
  path: string;
  // Which MockApiOptions key (and MockedEndpoint) this page's list request
  // registers, so tests can assert the request actually happened instead of
  // just asserting on rendered DOM state (which could pass for the wrong
  // reason if e.g. a broader/earlier route handler intercepted it first).
  endpoint: MockedEndpoint;
  addButtonName: string;
  errorTitle: string;
  emptyTitle: string;
  sample: () => StudentDto | GroupDto | LessonSummaryDto;
  mockList: (page: Page, response: MockResponse<unknown[]>) => Promise<MockApiHandle>;
};

const PAGES: PageSpec[] = [
  {
    path: '/students',
    endpoint: 'students',
    addButtonName: '+ Add a student',
    errorTitle: 'Something went wrong',
    emptyTitle: 'No students yet',
    sample: () => sampleStudent({ name: 'Ivan Petrov' }),
    mockList: (page, response) =>
      mockApi(page, { students: response as MockResponse<StudentDto[]> }),
  },
  {
    path: '/groups',
    endpoint: 'groups',
    addButtonName: '+ Create a new group',
    errorTitle: 'Something went wrong',
    emptyTitle: 'Groups save you time',
    sample: () => sampleGroup({ name: '9-B' }),
    // CreateGroupModal (rendered by the toolbar CTA and by the onboarding
    // empty state's primaryAction — see groups-page-client.tsx /
    // groups-list-widget.tsx) calls useMyStudentsQuery() unconditionally on
    // mount, regardless of whether the modal is open. `/groups` is the only
    // one of these three pages whose toolbar mounts a component that queries
    // a *different* entity's list, so it's the only PageSpec that needs a
    // second mock here.
    mockList: (page, response) =>
      mockApi(page, { groups: response as MockResponse<GroupDto[]>, students: { body: [] } }),
  },
  {
    path: '/lessons',
    endpoint: 'lessons',
    addButtonName: '+ New lesson',
    errorTitle: "Couldn't load lessons",
    emptyTitle: 'No lessons yet',
    sample: () => sampleLesson({ title: 'Present Perfect Basics' }),
    mockList: (page, response) =>
      mockApi(page, { lessons: response as MockResponse<LessonSummaryDto[]> }),
  },
];

function toolbar(page: Page) {
  return page.getByTestId('entity-list-toolbar');
}

function onboarding(page: Page) {
  return page.getByTestId('empty-state-onboarding');
}

function skeleton(page: Page) {
  // A single semantic hook on the list widget's loading branch (see
  // *-list-widget.tsx). Deliberately not `[class*="animate-pulse"]`: that
  // Tailwind class is also used by unrelated shimmer elements elsewhere on
  // the page (e.g. avatar placeholders), so once the real list mounts, a
  // class-based locator can still find *something* animating and this
  // assertion would pass for the wrong reason ("no skeleton" vs "no skeleton
  // that happens to still match this CSS class").
  return page.getByTestId('list-skeleton');
}

async function expectNoHorizontalScroll(page: Page) {
  const overflowing = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflowing).toBe(false);
}

// Fails with the actual vs. expected URL instead of letting an unexpected
// redirect surface later as an unrelated, confusing locator timeout (e.g.
// "toolbar not visible" when the real problem is "we're on /students, not
// /groups"). Anchored with `^...$` on the pathname only (ignoring query
// params like `?q=...`) so e.g. `/lessons` doesn't also match `/lessons/1`.
async function expectOnPage(page: Page, path: string) {
  await expect(page, `expected to land on ${path}, got redirected to ${page.url()}`).toHaveURL(
    new RegExp(`^https?://[^/]+${path}(\\?.*)?$`),
  );
}

// Asserts the app actually called this endpoint at least once — the
// counterpart to asserting on rendered DOM: a test could otherwise pass for
// the wrong reason (e.g. the wrong query hook, or a stale cached response)
// while never actually hitting the handler this test configured.
function expectEndpointRequested(handle: MockApiHandle, endpoint: MockedEndpoint) {
  expect(
    handle.requestCount(endpoint),
    `expected ${endpoint} endpoint to be requested`,
  ).toBeGreaterThan(0);
}

// Catches exactly the class of bug that caused the /groups touch/webkit
// auth-redirect failures: a component fires a request this test never
// mocked, which used to fall through to a real (or absent) backend instead
// of failing here immediately.
function expectNoUnmockedRequests(handle: MockApiHandle) {
  expect(handle.unmockedRequests(), 'unexpected unmocked API request(s)').toEqual([]);
}

test.describe('Students/Groups/Lessons loading and empty states', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ context, page }) => {
    await authenticateWithFakeCookie(context, page);
  });

  for (const spec of PAGES) {
    test.describe(spec.path, () => {
      test('slow successful list: skeleton then list, toolbar never disappears', async ({
        page,
      }) => {
        const handle = await spec.mockList(page, { delayMs: 1200, body: [spec.sample()] });

        const navigation = page.goto(spec.path);
        await expect(toolbar(page)).toBeVisible();
        await expect(skeleton(page)).toBeVisible();
        await navigation;
        await expectOnPage(page, spec.path);

        await expect(page.getByRole('button', { name: spec.addButtonName })).toBeVisible({
          timeout: 5000,
        });
        await expect(skeleton(page)).not.toBeVisible();
        await expect(toolbar(page)).toBeVisible();
        await expectNoHorizontalScroll(page);
        expectEndpointRequested(handle, spec.endpoint);
        expectNoUnmockedRequests(handle);
      });

      test('slow successful empty response: no onboarding before the response arrives', async ({
        page,
      }) => {
        const handle = await spec.mockList(page, { delayMs: 1200, body: [] });

        const navigation = page.goto(spec.path);
        await expect(skeleton(page)).toBeVisible();
        await expect(onboarding(page)).not.toBeVisible();
        await navigation;
        await expectOnPage(page, spec.path);

        await expect(onboarding(page)).toBeVisible({ timeout: 5000 });
        await expect(page.getByText(spec.emptyTitle)).toBeVisible();
        await expect(toolbar(page)).toBeVisible();
        expectEndpointRequested(handle, spec.endpoint);
        expectNoUnmockedRequests(handle);
      });

      test('error response: error card shown, never the onboarding empty state', async ({
        page,
      }) => {
        const handle = await spec.mockList(page, { status: 500, body: [] });

        await page.goto(spec.path);
        await expectOnPage(page, spec.path);
        await expect(page.getByText(spec.errorTitle)).toBeVisible({ timeout: 10_000 });
        await expect(onboarding(page)).not.toBeVisible();
        await expect(skeleton(page)).not.toBeVisible();
        await expect(toolbar(page)).toBeVisible();
        expectEndpointRequested(handle, spec.endpoint);
        expectNoUnmockedRequests(handle);
      });

      test('search with no matches on a non-empty collection: compact "no results", not onboarding', async ({
        page,
      }) => {
        const handle = await spec.mockList(page, { body: [spec.sample()] });

        await page.goto(`${spec.path}?q=zzz-does-not-exist`);
        await expectOnPage(page, spec.path);
        await expect(page.getByText('No results')).toBeVisible({ timeout: 5000 });
        await expect(onboarding(page)).not.toBeVisible();
        await expect(page.getByText(spec.emptyTitle)).not.toBeVisible();
        expectEndpointRequested(handle, spec.endpoint);
        expectNoUnmockedRequests(handle);
      });

      // The "offline while a query is pending shows false onboarding" scenario
      // (fetchStatus "paused" -> `isLoading` false -> `showEmpty` fires with no
      // confirmed empty response) is intentionally NOT tested here.
      // `context.setOffline(true)` blocks the page navigation itself
      // (net::ERR_INTERNET_DISCONNECTED, 0-byte body — verified empirically),
      // so it can't exercise "already-mounted query goes offline" without
      // fragile event-timing hacks. That state combination is deterministic
      // and fully controllable at the component level instead — see
      // `isLoading: false, isPending: true` cases in
      // src/features/__tests__/list-widgets-states.test.tsx.
    });
  }
});
