import fs from 'fs';
import path from 'path';

// FieldTooltip (a Radix Popover) lives inside CreateLessonModal (a Radix
// Dialog). Both packages depend on @radix-ui/react-dismissable-layer and
// @radix-ui/react-focus-scope to coordinate which layer handles Escape/
// outside-pointer events and which owns the focus trap. Those modules hold
// module-level singletons (a shared Set of "layers with outside pointer
// events disabled", a shared focus-scope stack) — if npm installs two
// *physically separate* copies (one nested under react-dialog, one under
// react-popover), each package coordinates against its own empty singleton
// instead of a shared one. Symptom, reproduced in real Chromium/WebKit:
// the popover either becomes permanently un-clickable (body keeps
// `pointer-events: none` because the popover's own copy never learns a
// layer disabled it) or gets dismissed by the dialog's focus trap the
// instant it opens. See the approved investigation plan for full repro
// evidence. This test fails fast if a future dependency change
// reintroduces the duplication, without requiring a browser.

// Radix packages restrict their `exports` map to "." only, so
// `require.resolve('<pkg>/package.json')` is rejected by Node/Jest's
// exports-aware resolver. Resolve the package's real entry file instead and
// walk up to the nearest directory whose package.json declares that exact
// package name — this is the same directory bundlers use to decide "which
// physical copy of this package are we in".
function readPackageName(packageJsonPath: string): string | undefined {
  const parsed: unknown = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (!parsed || typeof parsed !== 'object') return undefined;
  const name = (parsed as Record<string, unknown>).name;
  return typeof name === 'string' ? name : undefined;
}

function findPackageRoot(fromFile: string, expectedName: string): string {
  let dir = path.dirname(fromFile);
  for (let i = 0; i < 20; i++) {
    const candidate = path.join(dir, 'package.json');
    if (fs.existsSync(candidate) && readPackageName(candidate) === expectedName) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(`Could not find package root for ${expectedName} starting from ${fromFile}`);
}

function resolvePackageDir(pkg: string, fromDir?: string): string {
  const entry = require.resolve(pkg, fromDir ? { paths: [fromDir] } : undefined);
  return findPackageRoot(entry, pkg);
}

describe('Radix internal packages shared between Dialog and Popover', () => {
  it.each(['@radix-ui/react-dismissable-layer', '@radix-ui/react-focus-scope'])(
    '%s resolves to the same physical copy from react-dialog and react-popover',
    (internalPkg) => {
      const dialogDir = resolvePackageDir('@radix-ui/react-dialog');
      const popoverDir = resolvePackageDir('@radix-ui/react-popover');

      const fromDialog = resolvePackageDir(internalPkg, dialogDir);
      const fromPopover = resolvePackageDir(internalPkg, popoverDir);

      expect(fromPopover).toBe(fromDialog);
    },
  );
});
