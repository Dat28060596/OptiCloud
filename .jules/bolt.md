## 2024-04-10 - Extracted Inner Component from Render Cycle
**Learning:** In `CostExplorer.tsx`, the `FilterDropdown` component was declared inside the main component body, causing it to be torn down and recreated from scratch on every single parent render, even when memoized props were provided. This is an anti-pattern in React.
**Action:** Always move helper/sub components outside of the main functional component body, wrap them in `React.memo` if necessary, and use `useCallback` to pass handlers down to prevent cascading re-renders.
