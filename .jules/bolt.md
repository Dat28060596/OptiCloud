## 2023-10-12 - [Code Splitting Route Components]
**Learning:** The main `App.tsx` file imports all heavy route components (Dashboard, CostExplorer, OptimizationHub, Anomalies, Settings) directly, loading them all on initial bundle load.
**Action:** Applied `React.lazy()` and `<Suspense>` to dynamically load these components, significantly reducing the initial JavaScript bundle size and improving the initial page load time.
