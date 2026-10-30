## 2024-10-30 - Identify large route components
**Learning:** In a single page application with conditionally rendered heavy components (like tables or charts in CostExplorer/OptimizationHub), statically importing them bloats the initial main bundle, slowing down the Time To Interactive (TTI).
**Action:** Always consider using `React.lazy()` and `Suspense` for large route components to enable code splitting, so users only download the JavaScript for those views when they actually navigate to them.
