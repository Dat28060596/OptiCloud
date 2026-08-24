## 2025-02-28 - Extract and Memoize Inline React Components
**Learning:** Defining inline React components within a parent component's render method causes the inner component to unmount and remount on every parent render, degrading performance and losing local DOM state. Using `React.memo` on the extracted component is ineffective if functions passed as props are not wrapped in `useCallback`.
**Action:** Always extract inline components to the top level outside the parent. Wrap passed event handlers in `useCallback` to ensure stable references and effectively prevent unnecessary re-renders.
