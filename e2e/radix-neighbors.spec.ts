import { expect, test } from '@playwright/test';

import { authenticateWithFakeCookie } from './fixtures/auth-cookie';
import {
  mockApi,
  sampleGroupDashboard,
  sampleLesson,
  sampleStudentDashboard,
} from './fixtures/mock-api';

// Regression guard for the Radix dependency bump made to fix the "?" tooltip
// (react-alert-dialog/select/dropdown-menu/checkbox/label/separator/progress/
// visually-hidden/slot were all bumped so they resolve to the same internal
// react-dismissable-layer/react-focus-scope copy as react-dialog and
// react-popover — see radix-single-instance.test.ts). None of these
// components were touched, but their transitive versions changed, so this
// spec exercises the other Radix-based layers on real touch/mobile browsers:
// ResponsiveSelect (Radix Select on desktop, vaul Drawer on touch) inside the
// same create-lesson Dialog as the tooltip fix, AlertDialog, and
// DropdownMenu.

test.describe('Neighboring Radix layers after the dependency bump', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ context, page }) => {
    await authenticateWithFakeCookie(context, page);
  });

  test('ResponsiveSelect (Drawer on touch) still opens, selects, and closes inside the create-lesson Dialog', async ({
    page,
  }) => {
    await mockApi(page, { lessons: { body: [sampleLesson()] } });
    await page.goto('/lessons');
    await page.getByRole('button', { name: '+ New lesson' }).click();
    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();

    // Level select starts on "A1" (initialDraft.level).
    await page.getByRole('button', { name: 'A1', exact: true }).tap();
    // vaul Drawer for the level options — each option is a plain <button>.
    const b2Option = page.getByRole('button', { name: 'B2', exact: true });
    await expect(b2Option).toBeVisible();
    await b2Option.tap();

    // Drawer closed, value applied, Dialog still open and usable.
    await expect(page.getByRole('button', { name: 'B2' })).toBeVisible();
    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
  });

  test('AlertDialog (remove student from group) opens, cancels, and leaves the page interactive', async ({
    page,
  }) => {
    await mockApi(page, { groupDashboard: { body: sampleGroupDashboard() } });
    await page.goto('/groups/1');

    // GroupStudentRow renders both a desktop (table) and mobile (card) copy
    // of RemoveStudentConfirm, toggled with `hidden sm:block` / `sm:hidden`.
    // Both match the same accessible name; only the mobile one is visible at
    // this viewport, and it is the second one in DOM order.
    const trigger = page.getByRole('button', { name: 'Remove student from group' }).last();
    await expect(trigger).toBeVisible({ timeout: 15_000 });
    await trigger.tap();

    await expect(page.getByText('Remove student?')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).tap();
    await expect(page.getByText('Remove student?')).not.toBeVisible();

    // The page underneath is still interactive (the earlier tooltip bug left
    // body pointer-events stuck at "none").
    await expect(trigger).toBeVisible();
    await trigger.tap();
    await expect(page.getByText('Remove student?')).toBeVisible();
  });

  test('DropdownMenu (student header "..." menu) opens, shows items, and closes on Escape', async ({
    page,
  }) => {
    await mockApi(page, { studentDashboard: { body: sampleStudentDashboard() } });
    await page.goto('/students/1');

    const trigger = page.getByRole('button', { name: 'More options' });
    await expect(trigger).toBeVisible({ timeout: 15_000 });
    await trigger.tap();

    await expect(page.getByRole('menuitem', { name: 'Edit name' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Remove student' })).toBeVisible();

    // Same dismissable-layer mechanism as the tooltip fix — Escape must close
    // only this menu, not leave the page in a stuck state.
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menuitem', { name: 'Edit name' })).not.toBeVisible();

    // Trigger remains interactive afterwards (this is exactly what broke for
    // the tooltip: body pointer-events stuck at "none" after a layer closed).
    await trigger.tap();
    await expect(page.getByRole('menuitem', { name: 'Edit name' })).toBeVisible();
  });
});
