## 2024-05-24 - Extracted FilterDropdown correctly
**Learning:** Defining sub-components inside a parent component's render function in React causes unnecessary DOM teardown and recreations on every render, severely impacting performance.
**Action:** Always extract sub-components to module scope and wrap with `React.memo()` (like extracting `FilterDropdown` in `CostExplorer.tsx`).
