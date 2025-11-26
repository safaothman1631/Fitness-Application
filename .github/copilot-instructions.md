# Copilot Instructions for this Codebase

This project is a Next.js 16 (App Router) + React 19 + TypeScript app using Tailwind CSS v4, Radix UI (shadcn/ui style), Zod, and Firebase (client + Admin SDK). Use these notes to produce changes consistent with the repo’s patterns.

## Big picture
- Routing: App Router under `app/` with multi-role sections: `admin/`, `fizyoterapist/`, `hasta-panel/`, `superadmin/`, `trainer/`, `user-dashboard/`, etc. Each route has its own `page.tsx` and optional nested routes.
- UI: Reusable components in `components/` with Radix-based primitives in `components/ui/`. Style via Tailwind classes, merge with `cn()` from `@/lib/utils`.
- State/i18n: Custom lightweight i18n via `contexts/language-context.tsx` + `@/lib/translations`. Languages shipped: `en`, `tr`, `ar`, `ku`. Arabic is RTL; direction is applied by setting `document.documentElement.dir` to `rtl` or `ltr`. Language persisted in `localStorage` under `app_language`.
- Data access: Client code calls centralized fetch wrapper in `@/lib/db-service.ts` (e.g. `dbService.getUsers()`) which hits Next.js API routes under `app/api/**`. Server Firestore access uses `@/lib/firebase-admin.ts`; client-side uses `@/lib/firebase.ts`.

## Conventions and patterns
- Client components must start with `"use client"`. Use path alias `@/` for local imports (see `tsconfig.json`).
- Prefer Radix UI components from `components/ui`; keep styling via Tailwind classes, merging with `cn()`.
- Validation: Use Zod where applicable and surface errors via toast (Sonner). `dbService` throws on non-OK fetch; preserve error message from API responses.
- API responses: JSON only; on error, return `{ error, details? }` with proper status.
- Role-specific pages live under their route directory (e.g. `app/superadmin/profile/page.tsx`). Cross-role shared UI lives in `components/`.
- Animated primary actions use `components/ui/animated-button.tsx`.
- Inline language switching for forms: `components/language-inline.tsx`.
- Navigation is filtered per role via `lib/roles.ts` consumed in `components/fitpro-layout.tsx`.

## Data & integrations
- Firebase client: `@/lib/firebase.ts` initializes app, exports `db` (Firestore) and `auth`. Requires env: `NEXT_PUBLIC_FIREBASE_*`.
- Firebase Admin (server): `@/lib/firebase-admin.ts` initializes Admin SDK from env (multiline private key handled via `replace(/\\n/g, "\n")`). Requires: `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_CLIENT_ID`, `FIREBASE_CERT_URL`.
- Central fetch layer: `@/lib/db-service.ts` groups calls for users, physiotherapist profile, workouts, access keys, settings, and patients. New endpoints should get a matching helper here.

## Developer workflows
- Scripts (see `package.json`):
  - Dev: `npm run dev`
  - Build: `npm run build`; Prod: `npm start`
  - Lint: `npm run lint`
- No test script configured. Add Jest + RTL if introducing tests.

## i18n usage
Import the hook and call `t(key)`:
```tsx
"use client"
import { useLanguage } from "@/hooks/useLanguage"

export function Example() {
  const { t, language, setLanguage } = useLanguage()
  return (
    <div>
      <h1>{t("dashboardTitle")}</h1>
      <button onClick={() => setLanguage(language === "en" ? "ar" : "en")}>
        {t("changeLanguage")}
      </button>
    </div>
  )
}
```
Fallback: If a key is missing in the current language the English value is used.

### Adding translation keys
1. Add the string literal to the `TranslationKey` union in `@/lib/translations.ts`.
2. Provide values for all languages in the `translations` object (`en`, `tr`, `ar`, `ku`).
3. Consume via `t("yourNewKey")`. Avoid concatenation of raw language fragments; prefer full sentence keys for RTL consistency.
4. For dynamic values (e.g. counts) either create separate keys (`itemsCountLabel`) or later extend system with interpolation (not implemented yet).

### RTL considerations
- Arabic (`ar`) sets `dir="rtl"` at the document root. Do not hardcode directional Tailwind classes for layout text if they assume LTR; prefer logical spacing (`ps-*`, `pe-*` future Tailwind or generic `ms-*` when available) or symmetric classes.
- Avoid embedding punctuation that flips undesirably; place punctuation at end of localized string.

## Role-based navigation isolation
- Map of role -> allowed navigation items lives in `lib/roles.ts`.
- `components/fitpro-layout.tsx` filters the global nav based on current role before rendering.
- When adding new routes, update `roles.ts` to declare visibility.
- Keep privileged admin-only links out of general user nav by default.

## Animated buttons
- Use `<AnimatedButton type="submit">{t("saveChanges")}</AnimatedButton>` for primary form actions.
- Keep secondary actions as standard `<Button variant="outline"/>` for visual hierarchy.

## Cleanup / Security
- Service account JSON files must NOT live in the repo; environment variables supply credentials.
- Removed adult-themed or unrelated assets for repository hygiene. Do not reintroduce non-project media.

## Future enhancements (suggested)
- Introduce interpolation & pluralization (e.g. using a tiny utility or i18next replacement layer) once needed.
- Add automated tests around translation coverage & role-based access filtering.
- Consider extracting translation keys into smaller domain group objects if the file grows too large.
