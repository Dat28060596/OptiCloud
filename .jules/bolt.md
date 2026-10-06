## 2024-05-17 - React Route Code Splitting
**Learning:** In large React SPAs, synchronously importing route components that use heavy libraries (like Recharts) bloats the initial main bundle, increasing Time to Interactive (TTI).
**Action:** Use React.lazy() and Suspense for top-level view/route components to automatically chunk bundles, loading dependencies only when the specific view is requested.
