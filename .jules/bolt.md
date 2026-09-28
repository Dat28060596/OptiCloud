## 2024-05-24 - Code Splitting for Route Components
**Learning:** React applications with multiple heavy route components (like `CostExplorer` and `Dashboard` with Recharts) can suffer from large initial bundle sizes if all routes are eagerly loaded, increasing time-to-interactive.
**Action:** Applied code splitting using `React.lazy()` and `Suspense` for the main route views in `App.tsx` to defer loading heavy dependencies until the specific view is active. This pattern should be standard for route-level components in this architecture.
