## 2025-02-18 - Extract inline components
**Learning:** Inline components defined inside a parent component's render function unmount and remount on every parent render, leading to poor performance and destruction of local DOM state.
**Action:** Extract nested inline components to the module level and pass required properties as props. Use React.memo combined with useCallback for passed functions to prevent unnecessary re-renders.
