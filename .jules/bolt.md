## 2025-03-09 - Extracted and memoized FilterDropdown
**Learning:** Defining sub-components (like `FilterDropdown`) inside the parent component's render function (like `CostExplorer`) creates unnecessary DOM teardown and recreation overhead specific to this application's dropdowns, causing all inner components to remount on every parent state change.
**Action:** Always extract sub-components to the module scope and pass dependencies explicitly as props, wrapping them with `React.memo()` and passing stable references (`useCallback`) to avoid this application-specific performance trap.
