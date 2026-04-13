## 2024-04-13 - O(1) Lookups in React Component State

**Learning:** When dealing with multiple active filters stored as arrays in React state (to maintain serializability), computing filtered data by checking `array.includes(item)` inside an array `filter` loop creates an O(N*M) bottleneck where N is the dataset size and M is the number of active filters across all categories.
**Action:** Convert the filter arrays into `Set` objects *inside* the `useMemo` block just before the filter iteration. This converts the lookup complexity to O(1) `Set.has()`, improving overall performance to O(N+M) while keeping the React component state easily manageable.
