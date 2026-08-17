## 2024-03-24 - Extracted inline FilterDropdown component in CostExplorer
**Learning:** Defining inline React components within a parent component's render method causes the inner component to unmount and remount on every single parent render, degrading performance and destroying local DOM state. Using `React.memo` requires props like event handlers to be wrapped in `useCallback` to maintain stable references.
**Action:** Always extract inner components to the top level outside the parent and memoize them, using `useCallback` for functions passed as props.
