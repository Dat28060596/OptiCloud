## 2025-03-05 - Route Code Splitting with React.lazy
**Learning:** For a single page application with multiple distinct views like this one (Dashboard, CostExplorer, OptimizationHub, etc), code splitting route components via `React.lazy` is a straightforward way to reduce the initial bundle size, since users don't need all code for all views downloaded simultaneously.
**Action:** Implemented `React.lazy` combined with `<Suspense>` in `App.tsx` for the main view components. We ensure that static layout components like `Sidebar` remain eagerly loaded.
