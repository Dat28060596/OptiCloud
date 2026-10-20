## 2025-03-05 - Identify Code Splitting Opportunities
**Learning:** Found multiple distinct top-level route components (`Dashboard`, `CostExplorer`, `OptimizationHub`, `Anomalies`, `Settings`) which are currently imported directly in `App.tsx`, blocking initial page render by loading the full JS bundle (containing heavy libs like Recharts) immediately.
**Action:** Implement code splitting for route components using `React.lazy()` and `Suspense` in `App.tsx` to reduce the initial JS bundle size and improve app load times.
