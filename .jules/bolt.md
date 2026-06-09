## 2024-05-19 - Fast Data Filtering and Aggregation in React
**Learning:** In React components like `CostExplorer.tsx`, chaining array methods like `filter()` and `forEach()` with intermediate `Map` usage causes large performance hits by running multiple passes over potentially huge datasets (like cost metrics) and producing unnecessary garbage collection overhead.
**Action:** When working with large datasets, always consolidate filtering and aggregation into a single pass using a `for` loop and accumulate directly into a plain JavaScript Object (`Record<string, ...>`).
