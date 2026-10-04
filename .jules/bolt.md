## 2024-05-24 - Route-level code splitting
**Learning:** Eagerly loading all route components in `App.tsx` (like `CostExplorer` and `Dashboard` which use `recharts`) significantly increases the initial JS bundle size.
**Action:** Implemented route-level code splitting using `React.lazy()` and `Suspense` in `App.tsx` to defer loading heavy dependencies until the respective view is active.
