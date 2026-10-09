## 2024-10-09 - Code Splitting Opportunity
**Learning:** The application renders conditional large components (Dashboard, CostExplorer, OptimizationHub, Anomalies, Settings) based on a `currentView` state variable in `App.tsx` directly importing them.
**Action:** Extract large top-level component imports into `React.lazy()` imports, and wrap the view rendering with `<React.Suspense>` to reduce initial bundle size.

## 2024-10-09 - Inline Component in Render Opportunity
**Learning:** `FilterDropdown` in `components/CostExplorer.tsx` is defined inline inside the render method of `CostExplorer`.
**Action:** Move `FilterDropdown` outside of the `CostExplorer` component to avoid remounting it on every parent render and destroying its state. Or we can just extract it and pass necessary props.
