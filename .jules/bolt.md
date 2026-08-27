## 2024-05-24 - Extract and memoize inline React components
**Learning:** Defining inline React components within a parent component's render method causes the inner component to unmount and remount on every single parent render, degrading performance and destroying local DOM state.
**Action:** Always extract these components to the top level outside the parent. Furthermore, memoize them using `React.memo` and pass stable function references via `useCallback` to prevent unnecessary re-renders.
