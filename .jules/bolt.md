## 2024-05-14 - CostExplorer filter optimization
**Learning:** When filtering large arrays in React `useMemo` hooks, using `Array.includes()` inside `.filter()` results in $O(N \cdot M)$ complexity. Converting filter arrays to `Set` objects *inside* the `useMemo` block right before filtering reduces lookups to $O(1)$, resulting in an overall $O(N)$ operation without breaking serializable React state.
**Action:** Always use `Set` objects inside `useMemo` for checking membership in large collections during rendering instead of `Array.includes()`.
