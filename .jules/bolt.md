## 2026-02-09 - O(N*M) Filter Lookup Bottleneck
**Learning:** Found a classic O(N*M) performance bottleneck in `CostExplorer.tsx` where `.filter()` calls `Array.includes()` inside the inner loop for four different filter categories.
**Action:** When filtering large datasets against multiple sets of criteria in React, convert arrays to Sets right before the data `.filter()` inside `useMemo` to bring lookups down to O(1) while keeping React state serializable as arrays.
