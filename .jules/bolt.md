## 2024-05-18 - CostExplorer Filter Optimization
**Learning:** React state serialization (like using an Array for active filters) can cause performance bottlenecks when iterating large datasets if O(N) array lookups (`Array.includes()`) are repeatedly executed inside a loop.
**Action:** Always map array-based filter state to `Set` objects *inside* the processing hook (e.g. `useMemo`) before looping over large lists. This maintains serializable state while achieving O(1) performance during data processing.
