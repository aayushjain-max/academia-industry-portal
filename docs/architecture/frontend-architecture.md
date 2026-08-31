# Frontend Architecture (Next.js 15 App Router)

- Modular feature-based structure under `src/features/`.
- Strict route groupings: `(marketing)`, `(auth)`, `student/`, `industry/`, `academician/`, `institution/`, `admin/`.
- State Management: TanStack React Query for server cache, Zustand for global UI & authentication state.
- Form Validation: React Hook Form + Zod schemas.
- Reusable UI Design System in `packages/ui` and `src/components/ui`.
