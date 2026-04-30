# Lexi Buddy — Frontend

Frontend for **Lexi Buddy** built with:

- **Next.js (App Router)**,
- **TypeScript**,
- **React**,
- **TanStack Query**,
- **Axios**,
- **React Hook Form + Zod**,
- **Tailwind + shadcn/ui**.

---

## 🎯 Goals

- Production-ready codebase with clear boundaries
- Feature-oriented structure that scales
- Type-safe API access and predictable error handling
- Consistent UI primitives and clean composition
- Apple-like UX/UI approach (clarity, simplicity, calm visuals)
- Human-friendly copy: short, clear, respectful, product-focused

---

## 🧰 Tech stack

- Next.js (App Router)
- React + TypeScript
- TanStack Query
- Axios (refresh token flow on 401)
- React Hook Form + Zod
- Tailwind CSS + shadcn/ui
- ESLint + Prettier + Husky + lint-staged
- Storybook / Jest / Playwright (where applicable)

---

## 🏗 Architecture overview

This project uses a **feature-oriented architecture** inspired by FSD (without overengineering).

### Responsibility map

- **src/app**  
  Routing and layout composition. Reads params/searchParams, composes screens, avoids business logic.

- **src/features**  
  Domain capabilities grouped by feature (auth, students, groups, lessons).  
  Each feature owns API access, state hooks, and feature UI.

- **src/shared**  
  Reusable primitives and helpers: UI-kit components, generic hooks, utilities.

---

### Terminology

- **Feature** — user action or domain capability  
  (sign-in, sign-up, activate account, create group, add student)

- **Widget** — large domain UI block  
  (students table, student details panel)

- **Shared** — generic building blocks  
  (Button, Input, Modal), not domain-specific

---

## 📦 Feature structure (by responsibility)

Each feature is organized by responsibility:

- api — network calls + DTO typing
- model — hooks/state/business rules (TanStack Query)
- ui — feature UI (views/forms), uses model
- lib — feature-local helpers: zod schemas, inferred types, mappers

---

## 📐 Layer rules

### api

- Only network calls and DTO typing
- No React, no routing, no UI
- Uses src/lib/api-client

### model

- TanStack Query hooks (useQuery/useMutation)
- Retry policy, cache invalidation, optimistic updates
- Does not import from feature ui

### ui

- Renders UI and handles user interactions
- Toasts, navigation, mapping errors is allowed
- Large domain UI blocks live here as widgets  
  (for example: students table, student details)
- Widget-local parts live in ui/widgets/<name>/components

Widgets are domain-local by default and live inside their feature.  
Top-level src/widgets is introduced only for cross-domain reusable page sections (for example AppHeader, Sidebar).

### lib

- Zod schemas, inferred types, feature-only helpers
- Not UI; keep it feature-local unless reused by multiple features

---

## 🌐 API client and errors

HTTP is centralized in src/lib/api-client:

- Axios instance api
- Refresh token flow on 401
- Errors normalized into HttpError (message, status, code)

React Query mutations are typed with HttpError, so onError receives a typed error.

---

## 🧭 Next.js routing notes

- Route params (for example /groups/[id]) are read from params
- Query params (for example /activate?token=...) are read from searchParams

Prefer passing URL-derived values from page.tsx (server) into client components as props.

---

## ▶️ Scripts

- npm run dev
- npm run build
- npm run start
- npm run lint
- npm run format
- npm run storybook
- npm run test

---

## 🧠 Local contribution rules

- Avoid turning shared into a dumping ground
- Keep domain-specific UI inside the feature
- Prefer model hooks over calling api directly from UI
- Keep widgets inside features unless truly cross-domain reusable
- Follow Apple-like UX principles: clarity over cleverness, simplicity over density

## Design System

See docs/design-system.md
