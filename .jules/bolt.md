## 2025-03-05 - Extracted and memoized inline FilterDropdown
**Learning:** Defining inline React components (like `FilterDropdown`) inside the parent component's render method causes the inner component to unmount and remount on every single parent render, degrading performance and destroying local DOM state. Memoizing it won't help if it's declared inline.
**Action:** Always extract inner helper components to the top level outside the parent, pass necessary props (wrapping functions in `useCallback`), and use `React.memo` to prevent unnecessary re-renders.
