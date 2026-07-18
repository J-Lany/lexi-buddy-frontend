# Lexi Buddy — Design Consistency Rules

> Developer reference for keeping the product visually consistent.
> Source of truth: lessons, students, and groups pages.
> Do **not** use admin-metrics as a style reference.

---

## 1. Overview

Lexi Buddy is a calm, iOS-inspired teacher tool. The visual language is:

- **Teal-tinted neutrals** — surfaces, borders, and shadows carry a subtle teal tint (never plain gray)
- **Card-first on mobile, table on desktop** — every list switches automatically
- **Rounded, soft containers** — `rounded-2xl` / `rounded-3xl` everywhere; no sharp corners
- **Left-label / right-value** — the universal layout for rows, cards, and detail sections
- **Sparse iconography** — Lucide icons at 16–18px as accents only, never decorative

---

## 2. Core Principles

1. **Use design tokens, never Tailwind literals for color.** `border-sky-100` or `bg-slate-50` are never acceptable. Always use CSS variables.
2. **Use the `ui-*` utility classes for typography.** Do not replicate them with raw `text-sm font-semibold` combos.
3. **Use the shared primitives.** `DetailsRow`, `ResponsiveTableLayout`, `EmptyStateCard`, `ui-pill` — never rebuild them inline.
4. **Spacing via parent, not child margins.** Use `space-y-4` on a parent, never `mt-4` between sibling cards.
5. **One pill component: `.ui-pill`.** Never use `<Badge>` in the product UI.
6. **Every list page uses `ResponsiveTableLayout`.** Never build a custom mobile/desktop split manually.

---

## 3. Components

### Cards

| Variant                | Class                           | When to use                          |
| ---------------------- | ------------------------------- | ------------------------------------ |
| Interactive (tappable) | `ui-card ui-radius-card`        | List rows, clickable cards           |
| Static (read-only)     | `ui-card-static ui-radius-card` | Summary cards at top of detail pages |
| Empty state            | `ui-panel ui-radius-card`       | Empty state boxes on mobile          |

**Padding rules:**

- List rows: `px-5 sm:px-6 py-4`
- Summary cards: `p-5 sm:p-6 lg:p-7`

```tsx
// ✅ Correct — interactive card
<button className="ui-card ui-radius-card ui-focus w-full text-left px-5 sm:px-6 py-4">

// ✅ Correct — static summary card
<Card className="ui-card-static ui-radius-card overflow-hidden">

// ❌ Wrong — ad-hoc surface
<div className="rounded-xl border border-gray-200 bg-background/60 p-4">
```

---

### Rows (list items)

Every row follows the same structure:

```tsx
<div className="flex items-start gap-3 sm:gap-4">
  {/* Left: icon bubble or avatar — 36–40px */}
  <div className="ui-thumb h-9 w-9">
    <Icon size={18} className="text-primary" />
  </div>

  {/* Middle: title + meta */}
  <div className="flex-1 min-w-0">
    <div className="flex items-start justify-between gap-3">
      <span className="ui-title">{title}</span>
      <span className="ui-stat">{trailingValue}</span>
    </div>
    <div className="mt-1 ui-meta">{subtitle}</div>
  </div>
</div>
```

---

### Pills / Badges

**Always use `.ui-pill`.** Never use `<Badge>`.

Status color overrides on top of `.ui-pill`:

```tsx
// Completed
'ui-pill bg-[var(--success-soft)] text-[var(--success)] border-[color-mix(in_oklch,var(--success)_25%,white_75%)]';

// In progress (amber — no token yet, acceptable until --warning is added)
'ui-pill bg-amber-50 text-amber-700 border-amber-200';

// Not started
'ui-pill bg-[var(--muted)] text-muted-foreground border-[var(--border-soft)]';
```

```tsx
// ✅ Correct
<span className="ui-pill">{level}</span>

// ❌ Wrong
<Badge variant="secondary">{level}</Badge>
```

---

### Tables

Every list page **must** use `ResponsiveTableLayout`:

```tsx
<ResponsiveTableLayout
  header={<TableHeader columns={COLUMNS} colsClassName={COL_TEMPLATE} />}
  desktopBody={items.map((item) => (
    <MyRow key={item.id} item={item} variant="table" />
  ))}
  mobileBody={items.map((item) => (
    <MyRow key={item.id} item={item} variant="card" />
  ))}
/>
```

**Column definitions** go in a `*.columns.ts` file:

```ts
export const MY_TABLE_COLS = 'grid-cols-[1fr_120px_80px]';
export const MY_TABLE_COLUMNS = [
  { label: 'Name' },
  { label: 'Group' },
  { label: 'Level', align: 'right' },
];
```

**Row hover (table variant only):**

```tsx
className = 'hover:bg-[color-mix(in_oklch,var(--foreground)_3%,white_97%)]';
```

---

### Detail Sections

For any label–value data (profile pages, settings, summaries):

```tsx
import { detailsSectionSurface } from '@/shared/ui/details/details-section-surface';

// Section wrapper
<div>
  <SectionLabel>Activity</SectionLabel>
  <div className={detailsSectionSurface}>
    <DetailsRow label="Lessons" value={12} />
    <Divider />
    <DetailsRow label="Avg score" value="8.4" />
    <Divider />
    <DetailsRow label="Last active" value="2 days ago" valueTone="muted" />
  </div>
</div>;
```

**Never** rebuild a label–value row manually:

```tsx
// ❌ Wrong — do not do this
<div className="flex justify-between text-sm">
  <span className="text-muted-foreground">Lessons</span>
  <span>{12}</span>
</div>
```

---

## 4. Typography

### The 5-level scale

Всего 5 уровней. Для каждого — один класс. Ничего другого.

| Уровень | Класс           | Desktop | Mobile | Где используется                          |
| ------- | --------------- | ------- | ------ | ----------------------------------------- |
| 1       | `ui-page-title` | 34px    | 28px   | Заголовок страницы: урок, студент, группа |
| 2       | `ui-card-title` | 24px    | 22px   | Имя в карточке профиля (студент, группа)  |
| 3       | `ui-title`      | 18px    | 16px   | Строка в списке, заголовок блока          |
| 4       | `ui-meta`       | 16px    | 14px   | Вторичный текст, подпись, метаданные      |
| 5       | `ui-stat`       | 14px    | 12px   | Числа, метки, trailing value в строке     |

> Специальные случаи:
>
> - Лейбл внутри `DetailsRow` — `text-[13px] text-muted-foreground` (встроено в компонент, не менять)
> - `ui-tint` — только для ссылок и tinted меток (`@username`, топик)

### Добавить в `globals.css`

Классы `ui-page-title` и `ui-card-title` **пока не существуют** — их нужно добавить:

```css
.ui-page-title {
  @apply font-semibold tracking-tight leading-tight;
  font-size: 28px;
}
@media (min-width: 640px) {
  .ui-page-title {
    font-size: 34px;
  }
}

.ui-card-title {
  @apply font-semibold tracking-tight;
  font-size: 22px;
}
@media (min-width: 640px) {
  .ui-card-title {
    font-size: 24px;
  }
}
```

### Что заменить в коде

| Было (захардкожено)                                                     | Заменить на                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------ |
| `text-[28px] sm:text-[34px] font-semibold tracking-tight leading-tight` | `ui-page-title`                                  |
| `text-[22px] sm:text-[24px] font-semibold tracking-tight`               | `ui-card-title`                                  |
| `text-[18px] sm:text-[22px] font-semibold`                              | `ui-title`                                       |
| `text-sm text-muted-foreground`                                         | `ui-meta`                                        |
| `text-xs text-muted-foreground`                                         | `ui-stat`                                        |
| `text-2xl font-semibold` (admin-metrics)                                | `ui-page-title` или `ui-card-title` по контексту |
| `text-xl font-semibold` (admin-metrics)                                 | `ui-card-title`                                  |

### Примеры

```tsx
// ✅ Правильно
<h1 className="ui-page-title">{lesson.title}</h1>
<div className="ui-card-title">{student.name}</div>
<span className="ui-title">{lesson.title}</span>
<div className="ui-meta">{lesson.topic}</div>
<span className="ui-stat">{lesson.vocabCount} words</span>

// ❌ Неправильно — захардкоженные размеры
<h1 className="text-[28px] sm:text-[34px] font-semibold tracking-tight">{lesson.title}</h1>
<div className="text-[22px] font-semibold">{student.name}</div>
<span className="text-sm text-muted-foreground">{lesson.topic}</span>
<span className="text-xs font-medium">{lesson.vocabCount} words</span>
```

---

## 5. Colors

### Token usage

| Need                  | Use                                                    |
| --------------------- | ------------------------------------------------------ |
| Card surface          | `bg-[color:var(--surface)]` or let `ui-card` handle it |
| Subtle border         | `border-[color:var(--border-soft)]`                    |
| Standard border       | `border-[color:var(--border)]`                         |
| Muted text            | `text-muted-foreground`                                |
| Slightly dimmed value | `text-foreground/80`                                   |
| Primary icon          | `text-primary` or `text-primary/80`                    |
| Progress bar fill     | `color-mix(in oklch, var(--primary) 60%, white 40%)`   |
| Success bg / text     | `bg-[var(--success-soft)]` + `text-[var(--success)]`   |
| Danger bg / text      | `bg-[var(--danger-soft)]` + `text-[var(--danger)]`     |
| Card shadow           | `shadow-[var(--shadow-card)]`                          |

### What not to do

```tsx
// ❌ Hardcoded Tailwind color classes
border-sky-100
bg-gray-50
text-slate-600
bg-emerald-50 text-emerald-700   // use --success-soft + --success
bg-slate-50 text-slate-600       // use --muted + text-muted-foreground
border-gray-200

// ❌ Opacity hacks on background
bg-background/60                 // use var(--surface) instead
bg-white/80                      // never
```

---

## 6. Do / Don't Examples

### Card surface

```tsx
// ✅
<div className="ui-card ui-radius-card px-5 sm:px-6 py-4">

// ❌
<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
```

### Status pill

```tsx
// ✅
<span className="ui-pill bg-[var(--success-soft)] text-[var(--success)]">Completed</span>

// ❌
<Badge variant="secondary" className="bg-emerald-50 text-emerald-700">Completed</Badge>
```

### Spacing between cards

```tsx
// ✅
<div className="space-y-4">
  <LessonSummary />
  <LessonAssignees />
  <LessonVocab />
</div>

// ❌
<LessonSummary className="mb-4" />
<LessonAssignees className="mt-4 mb-4" />
<LessonVocab />
```

### Toggle control

```tsx
// ✅
<SegmentedControl
  value={mode}
  onChange={setMode}
  options={[{ value: "started", label: "Started" }, { value: "completed", label: "Completed" }]}
/>

// ❌ (admin-metrics pattern)
<Button variant={mode === "started" ? "default" : "outline"} onClick={() => setMode("started")}>
  Started
</Button>
<Button variant={mode === "completed" ? "default" : "outline"} onClick={() => setMode("completed")}>
  Completed
</Button>
```

---

## 7. Refactoring Rules

### P0 — Fix immediately (breaks visual consistency)

| File                   | Problem                                 | Action                                                               |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| `assignment-block.tsx` | `border-sky-100` + `<Badge>`            | Replace with `--border-soft` + `.ui-pill`                            |
| `get-status-config.ts` | `bg-emerald-50`, `bg-slate-50` literals | Map to `--success-soft`, `--danger-soft`, `--muted`                  |
| `metrics-cards.tsx`    | `p-4`, no `ui-*` classes                | Refactor to `ui-card-static ui-radius-card` + `ui-title` + `ui-stat` |
| `metrics-totals.tsx`   | Same as above                           | Same fix                                                             |

### P1 — Fix soon (inconsistent token usage)

| File                           | Problem                             | Action                                    |
| ------------------------------ | ----------------------------------- | ----------------------------------------- |
| `lesson-summary-stat-grid.tsx` | `bg-background/60 border-border/60` | Use `--surface` + `--border-soft`         |
| `progress-line.tsx`            | Lives in feature folder             | Move to `src/shared/ui/progress-line.tsx` |
| `trend-card.tsx`               | Raw `<Button>` toggle               | Replace with `<SegmentedControl>`         |
| `mini-line-chart.tsx`          | `stroke="currentColor"`             | Use `var(--primary)` explicitly           |

### P2 — Cleanup (typography unification)

| Pattern                                                   | Problem               | Action                       |
| --------------------------------------------------------- | --------------------- | ---------------------------- |
| `text-[28px] sm:text-[34px] font-semibold tracking-tight` | No named class        | Replace with `ui-page-title` |
| `text-[22px] sm:text-[24px] font-semibold tracking-tight` | No named class        | Replace with `ui-card-title` |
| `text-sm text-muted-foreground`                           | Should be `.ui-meta`  | Replace                      |
| `text-xs text-muted-foreground`                           | Should be `.ui-stat`  | Replace                      |
| `font-semibold text-base` on row titles                   | Should be `.ui-title` | Replace                      |

**Файлы с проблемами типографики:**

| Файл                                                  | Что исправить                                                                           |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `lesson-summary-header.tsx`                           | `text-[28px] sm:text-[34px]...` → `ui-page-title`                                       |
| `student-profile-summary/sections/header-section.tsx` | `text-[22px] sm:text-[24px]...` → `ui-card-title`                                       |
| `group-profile-summary/sections/header-section.tsx`   | `text-[22px] sm:text-[24px]...` → `ui-card-title`                                       |
| `summary-card.tsx`                                    | `text-[18px] sm:text-[22px] font-semibold` → `ui-title` или `ui-card-title`             |
| `question-block.tsx`                                  | `text-xs text-muted-foreground` → `ui-stat`                                             |
| `metrics-header.tsx`                                  | `text-xl font-semibold` → `ui-card-title`                                               |
| `metrics-cards.tsx`                                   | `text-sm text-muted-foreground` → `ui-meta`, `text-2xl font-semibold` → `ui-card-title` |
| `metrics-totals.tsx`                                  | Same as metrics-cards                                                                   |

### How to audit a file

1. Есть `text-[Npx]` захардкоженный? → заменить на `ui-page-title` / `ui-card-title` по контексту
2. Есть `text-sm text-muted-foreground`? → заменить на `ui-meta`
3. Есть `text-xs text-muted-foreground`? → заменить на `ui-stat`
4. Есть `<Badge>`? → заменить на `ui-pill`
5. Есть `text-*-*` буквальные цвета Tailwind? → заменить на CSS-переменную
6. Есть `p-4` на карточке? → заменить на `px-5 sm:px-6 py-4`
7. Есть `mt-*` между соседними карточками? → перенести в `space-y-*` на родителе
8. Есть `<Button>` как тогл? → заменить на `<SegmentedControl>`
