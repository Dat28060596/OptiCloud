## 2026-09-16 - Extracting Inline Components in React
**Learning:** Defining inline React components within a parent component's render method causes the inner component to unmount and remount on every single parent render, degrading performance and destroying local DOM state.
**Action:** Always extract these components to the top level outside the parent. Wrap them in `React.memo` and use `useCallback` for any functions passed as props to maintain stable references.
