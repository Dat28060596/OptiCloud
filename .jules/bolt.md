## 2024-07-25 - Object Accumulation vs Map/Array chaining
**Learning:** Chaining array methods (`filter`, `forEach`) and using `Map` can be significantly slower and more memory-intensive than using a single `for` loop and a plain JavaScript object (`Record<string, ...>`) for accumulation on large datasets.
**Action:** When filtering, grouping, and aggregating large datasets on the frontend, prefer a single `for` loop with plain JavaScript Object accumulation over chaining multiple array methods or using `Map` structures to significantly improve performance.
