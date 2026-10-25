## 2024-10-25 - Code Splitting Route Components
**Learning:** Route components (Dashboard, CostExplorer, OptimizationHub, Anomalies, Settings) are statically imported in `App.tsx`, causing all code to bundle into the initial payload even though only one view is shown at a time.
**Action:** Implemented `React.lazy()` and `Suspense` for large conditionally rendered view components to reduce initial JS bundle size and improve page load time.
