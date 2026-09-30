## 2026-09-30 - Code Splitting for Large Route Components
**Learning:** React route components (like CostExplorer, Dashboard) containing heavy dependencies (like Recharts) significantly bloat the initial JavaScript bundle size, blocking the main thread and slowing down Time to Interactive (TTI).
**Action:** Use `React.lazy()` and `<Suspense>` to asynchronously load these large components only when they are navigated to, ensuring a faster initial page load.
