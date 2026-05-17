## 2026-05-17 - Fast Grouping and Filtering
**Learning:** Chaining array methods like `filter` and `forEach` alongside a `Map` creates noticeable memory allocations and O(N)+O(K) iterations. In React `useMemo` hooks dealing with metric aggregations, this can cause stuttering when dependencies like filters change.
**Action:** When filtering and grouping large frontend datasets, merge the passes into a single `for` loop and use a standard Javascript object (`Record<string, T>`) for O(1) accumulation. This avoids intermediate array allocations and map instantiation overhead.
