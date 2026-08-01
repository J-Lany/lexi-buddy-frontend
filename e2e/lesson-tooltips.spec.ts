import { expect, Page, test } from '@playwright/test';

import { authenticateWithFakeCookie } from './fixtures/auth-cookie';
import { mockApi, sampleLesson } from './fixtures/mock-api';

// Permanent regression suite for the "?" field-hint bug on the lesson
// creation step "Lesson details". Root cause: @radix-ui/react-dialog and
// @radix-ui/react-popover resolved to physically separate copies of
// @radix-ui/react-dismissable-layer and @radix-ui/react-focus-scope, so their
// module-level coordination singletons weren't shared — the hint either
// stayed open but non-interactive (body pointer-events stuck at "none") or
// got dismissed by the dialog's focus trap the instant it opened. Fixed by
// upgrading the direct @radix-ui/react-* dependencies that were pinning the
// hoisted internal packages to older versions (see package.json diff and
// src/shared/ui/__tests__/radix-single-instance.test.ts). Runs on
// chromium-touch and webkit-mobile (tap) and chromium-desktop-mocked
// (click/keyboard) — see playwright.config.ts. Sibling Radix layers
// (ResponsiveSelect/Drawer, AlertDialog, DropdownMenu) are covered by
// e2e/radix-neighbors.spec.ts, not duplicated here.

const FIELDS = [
  {
    index: 0,
    name: 'title',
    text: 'The lesson name shown to students in the bot. Not passed to the AI.',
  },
  {
    index: 1,
    name: 'level',
    text: 'Difficulty level (A1–C2). AI uses it to calibrate task complexity and vocabulary.',
  },
  {
    index: 2,
    name: 'ageGroup',
    text: 'AI picks age-appropriate vocabulary and examples based on this.',
  },
  {
    index: 3,
    name: 'topic',
    text: 'Sent directly to the AI as lesson context — the more specific, the better the tasks.',
  },
] as const;

function isDesktopProject(projectName: string): boolean {
  return projectName.includes('desktop');
}

async function act(page: Page, locator: ReturnType<Page['getByRole']>, projectName: string) {
  if (isDesktopProject(projectName)) await locator.click();
  else await locator.tap();
}

// ResponsiveModal renders some header/footer text (the title, the step
// counter) twice — once in a `hidden sm:block` desktop node and once in a
// `max-sm:block sm:hidden` mobile node — so a plain text locator always
// resolves to two elements. Only one is actually visible per viewport, and
// document order is consistently desktop-node-first, mobile-node-second.
function visibleOf(locator: ReturnType<Page['getByText']>, projectName: string) {
  return isDesktopProject(projectName) ? locator.first() : locator.last();
}

async function openLessonModal(page: Page, projectName: string) {
  await page.goto('/lessons');
  await act(page, page.getByRole('button', { name: '+ New lesson' }), projectName);
  await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
}

function trigger(page: Page, fieldIndex: number) {
  return page.getByRole('button', { name: 'More information' }).nth(fieldIndex);
}

function popoverContent(page: Page) {
  return page.locator('[data-slot="popover-content"]');
}

test.describe('Lesson details "?" field hints', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ context, page }) => {
    await authenticateWithFakeCookie(context, page);
    await mockApi(page, { lessons: { body: [sampleLesson()] } });
  });

  for (const field of FIELDS) {
    test(`opens the "${field.name}" hint with the correct text`, async ({ page }, testInfo) => {
      await openLessonModal(page, testInfo.project.name);
      await act(page, trigger(page, field.index), testInfo.project.name);

      const content = popoverContent(page);
      await expect(content).toBeVisible();
      await expect(content).toHaveText(field.text);
    });
  }

  test('the hint stays visible after settling, not just for one frame', async ({
    page,
  }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    await act(page, trigger(page, 0), testInfo.project.name);

    const content = popoverContent(page);
    await expect(content).toBeVisible();
    await page.waitForTimeout(500);
    await expect(content).toBeVisible();
    await expect(content).toHaveText(FIELDS[0].text);
  });

  test('the hint content is interactive (pointer-events is not "none")', async ({
    page,
  }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    await act(page, trigger(page, 0), testInfo.project.name);

    const content = popoverContent(page);
    await expect(content).toBeVisible();
    const pointerEvents = await content.evaluate((el) => getComputedStyle(el).pointerEvents);
    expect(pointerEvents).not.toBe('none');
  });

  test('tapping/clicking inside the hint does not close it', async ({ page }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    await act(page, trigger(page, 0), testInfo.project.name);

    const content = popoverContent(page);
    await expect(content).toBeVisible();
    await act(page, content, testInfo.project.name);
    await expect(content).toBeVisible();
  });

  test('tapping/clicking outside the hint closes only the hint, the dialog stays open', async ({
    page,
  }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    await act(page, trigger(page, 0), testInfo.project.name);
    await expect(popoverContent(page)).toBeVisible();

    // The dialog title is a safe "outside" target — never inside the popover.
    // Two DOM matches: a visually-hidden a11y <h2> (always first) and the
    // real visible title div (always second, at every viewport) — unlike the
    // step counter below, this isn't a mobile/desktop duplicate, so `.last()`
    // is correct regardless of project.
    await act(page, page.getByText('Lesson details').last(), testInfo.project.name);

    await expect(popoverContent(page)).not.toBeVisible();
    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
  });

  test('Escape closes only the hint; a second Escape closes the dialog', async ({
    page,
  }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    await act(page, trigger(page, 0), testInfo.project.name);
    await expect(popoverContent(page)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(popoverContent(page)).not.toBeVisible();
    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('[data-slot="dialog-content"]')).not.toBeVisible();
  });

  test('a second tap/click on the trigger closes the hint', async ({ page }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    const t = trigger(page, 0);
    await act(page, t, testInfo.project.name);
    await expect(popoverContent(page)).toBeVisible();

    await act(page, t, testInfo.project.name);
    await expect(popoverContent(page)).not.toBeVisible();
  });

  test('opening a second hint closes the first', async ({ page }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    // Fields 1 (level) and 3 (topic), not the adjacent 0/1: the "title" field
    // sits right under the dialog header, so its side="top" popover has no
    // room and Radix's collision detection flips it below — where it would
    // visually overlap the very next trigger and make tapping it ambiguous.
    // That's a viewport/anchor-spacing artifact of picking adjacent fields
    // for this specific test, not a regression, so we pick two fields with
    // enough vertical separation instead of asserting on the overlap itself.
    await act(page, trigger(page, 1), testInfo.project.name);
    await expect(popoverContent(page)).toHaveText(FIELDS[1].text);

    await act(page, trigger(page, 3), testInfo.project.name);
    await expect(popoverContent(page)).toHaveCount(1);
    await expect(popoverContent(page)).toHaveText(FIELDS[3].text);
  });

  test('tapping/clicking "?" does not advance the wizard or submit', async ({ page }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    const stepCounter = visibleOf(page.getByText('1 / 5'), testInfo.project.name);
    await expect(stepCounter).toBeVisible();

    await act(page, trigger(page, 0), testInfo.project.name);
    await expect(popoverContent(page)).toBeVisible();

    // Still step 1, dialog still open — a submit or step change would fail either check.
    await expect(stepCounter).toBeVisible();
    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
  });

  test('focus returns to the trigger after the hint closes', async ({ page }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);
    const t = trigger(page, 0);
    await act(page, t, testInfo.project.name);
    await expect(popoverContent(page)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(popoverContent(page)).not.toBeVisible();
    await expect(t).toBeFocused();
  });

  test('the dialog stays functional after several open/close hint cycles', async ({
    page,
  }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);

    for (let i = 0; i < 3; i++) {
      await act(page, trigger(page, 0), testInfo.project.name);
      await expect(popoverContent(page)).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(popoverContent(page)).not.toBeVisible();
    }

    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
    const titleInput = page.getByPlaceholder('Lesson title*');
    await titleInput.fill('Still works');
    await expect(titleInput).toHaveValue('Still works');
  });

  test('keyboard-only: Tab focuses the trigger, Enter opens the hint, Escape closes it', async ({
    page,
  }, testInfo) => {
    await openLessonModal(page, testInfo.project.name);

    await trigger(page, 0).focus();
    await expect(trigger(page, 0)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(popoverContent(page)).toBeVisible();
    await expect(popoverContent(page)).toHaveText(FIELDS[0].text);

    await page.keyboard.press('Escape');
    await expect(popoverContent(page)).not.toBeVisible();
    await expect(trigger(page, 0)).toBeFocused();
  });
});
