## 2024-05-24 - React State vs Lookup Optimization
**Learning:** Arrays are required for serializable React state, but they have O(n) lookup performance. Converting them to `Set` objects directly inside the `useMemo` immediately before iterating over a large dataset provides O(1) lookups while maintaining serializability of state.
**Action:** Use arrays for `useState` to keep React state fully serializable, but create transient `Set` objects at the top of a `useMemo` block whenever filtering or performing repetitive lookups against large arrays.
