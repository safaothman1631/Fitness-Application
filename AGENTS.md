# AGENTS.md - Codebase Guide

## Build & Development Commands

- **`npm run dev`** or **`pnpm dev`** - Start Next.js development server (localhost:3000)
- **`npm run build`** - Build production-ready Next.js app
- **`npm start`** - Start production server
- **`npm run lint`** - Run ESLint on entire codebase
- No test command currently configured; add `"test": "jest"` if testing is needed

## Architecture & Structure

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Radix UI, Zod

**Directory Structure:**
- `/app` - Next.js pages using App Router (multilingual routes: `admin/`, `fizyoterapist/`, `hasta-panel/`, `superadmin/`, etc.)
- `/components` - Reusable React components
  - `/ui` - 50+ shadcn/ui Radix UI components (Button, Card, Dialog, Input, Select, etc.)
  - Shared: `theme-provider.tsx`, `language-selector.tsx`, `logo.tsx`
- `/contexts` - React Context (e.g., `language-context` for i18n)
- `/hooks` - Custom React hooks
- `/lib` - Utilities (`exercises-data.ts`, `utils.ts` with `cn()` helper for class merging)
- `/styles` - Global styles and Tailwind CSS

**Key Features:**
- Multi-role system: users, admins, superadmins, physiotherapists, patients
- Fitness/workout management: exercises, workout plans, fitness guides
- Access key management for member registration
- i18n support with react-i18next
- Dark theme with next-themes

## Code Style & Conventions

**TypeScript:** Strict mode enabled. Use explicit interfaces for major data structures.

**Imports:** Use path aliases (`@/` = root). Group: React/Next, external packages, then local imports.

**Components:**
- React functional components with `"use client"` for client-side features
- Use Radix UI components from `/components/ui`
- Type form state with interfaces (e.g., `UserData`, `Admin`, `AccessKey`, `WorkoutPlan`)
- Combine classnames with `cn()` utility from `@/lib/utils`

**State Management:** React hooks (useState, useContext). No Redux/Zustand.

**Styling:** Tailwind CSS classes directly on elements. Use theme colors: slate (dark), purple/blue (accents).

**Naming:** camelCase for functions/variables, PascalCase for components/interfaces. Turkish variable names acceptable (e.g., `giris`, `hasta-panel`).

**Error Handling:** Use Zod for validation. Toast notifications via Sonner library.

**Language:** i18n with `useLanguage()` hook from context.
