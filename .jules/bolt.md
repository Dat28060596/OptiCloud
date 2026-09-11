## 2025-03-08 - Extract inline React components
**Learning:** Defining components inside a parent's render function (like `FilterDropdown` inside `CostExplorer`) causes them to unmount and remount completely on every render, destroying their state and degrading performance.
**Action:** Always extract such sub-components outside the parent component, and use `React.memo` along with `useCallback` for stable props to avoid unnecessary re-renders.
