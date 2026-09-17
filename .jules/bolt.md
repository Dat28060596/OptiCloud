## 2025-02-28 - Extract inline React components
**Learning:** Defining inline React components within a parent component's render method causes the inner component to unmount and remount on every single parent render, degrading performance and destroying local DOM state.
**Action:** Always extract these components to the top level outside the parent and use `React.memo` along with `useCallback` for stable props.
