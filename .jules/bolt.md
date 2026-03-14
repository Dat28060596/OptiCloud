## 2026-03-14 - CostExplorer Filter Array vs Set Lookup
**Learning:** React state typically stores arrays for multiple-select filters (`activeFilters`), leading to accidental O(n*m) performance bottlenecks if `Array.includes()` is used directly inside large data map/filter iterations (`CostMetric[]`).
**Action:** Always convert filter arrays to `Set` objects *inside* the `useMemo` immediately before iterating over the data array. This keeps the React state serializable while achieving O(1) lookups during the expensive iteration phase.
