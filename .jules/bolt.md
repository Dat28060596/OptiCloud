## 2025-04-08 - Fast Filter Lookups
**Learning:** In React `useMemo` hooks dealing with array filtering, converting filter configuration arrays to `Set` objects before the `.filter` loop provides a measurable O(1) performance boost over `Array.includes()`, significantly decreasing computation time without changing state shapes.
**Action:** Always prefer `Set` conversions for any filtering arrays that run over large datasets within critical render paths or memoized hooks.
