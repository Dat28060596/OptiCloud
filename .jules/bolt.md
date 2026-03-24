## 2024-10-24 - React Component Mounting in Dev Env
**Learning:** Vite relies on `index.html` having an explicit script tag (e.g., `<script type="module" src="/index.tsx"></script>`) pointing to the React root. Without it, the application will serve a blank page, causing Playwright frontend verifications to fail with timeouts since the UI elements never mount.
**Action:** Always verify `index.html` includes the entrypoint module script tag when debugging blank page rendering issues in Vite-based React apps during Playwright test setup.

## 2024-10-24 - Array vs Set in useMemo Filtering
**Learning:** Calling `Array.prototype.includes()` inside an array `filter()` loop over thousands of `CostMetric` objects in `CostExplorer.tsx` led to an O(N*M) bottleneck, measurably slowing down UI updates (287ms). Converting active filter arrays to `Set` objects *inside* the `useMemo` immediately prior to the iteration reduced lookup time to O(1), speeding up execution 3x (89ms).
**Action:** Always pre-compute `Set` objects for active filter arrays before performing complex, multi-condition array filtering operations on large datasets on the client-side.
