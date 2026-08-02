## 2024-05-24 - Single Pass Object Accumulation vs Chained Array Methods
**Learning:** When dealing with large datasets on the frontend, chaining array methods (`filter`, `forEach`) and using `Map` can create a noticeable overhead due to multiple iterations and memory allocations. A single `for` loop with plain JavaScript object accumulation (`Record<string, ...>`) is significantly faster and reduces memory overhead.
**Action:** For large data aggregations on the frontend, default to a single-pass `for` loop and plain objects instead of functional array chaining when performance is critical.
