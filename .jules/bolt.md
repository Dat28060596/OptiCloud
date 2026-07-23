## 2025-03-05 - Replacing Map and Chained Arrays with Single-Pass Object Loops

**Learning:** In React components that process large datasets on every render (or filter change), chaining array methods (`filter`, `forEach`, `map`) creates intermediate array allocations and causes multiple iterations over the data. Furthermore, using a `Map` structure for simple string-key aggregation has higher overhead than plain JavaScript Objects (`{}`).
**Action:** When filtering and grouping large datasets on the frontend, combine operations into a single-pass `for` loop using plain Object accumulation (`Record<string, ...>`). This reduces iterations, avoids intermediate arrays, and lowers memory usage, leading to noticeably faster processing and less jank.
