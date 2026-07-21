
## 2024-07-21 - Optimize Data Filtering and Aggregation in CostExplorer
**Learning:** Found multiple array iterations (filter followed by forEach and Map logic) inside `useMemo` hooks. For high-volume data like cost metrics, reducing intermediate array allocations and simplifying data structures significantly improves calculation speed on every filter state change.
**Action:** When filtering, grouping, and aggregating large datasets, combine them into a single `for` loop with a plain JavaScript Object (`Record<string, ...>`) accumulator to avoid multiple passes and memory overhead of maps/intermediate arrays.
