## 2023-10-27 - [Cost Explorer Array Operations Overhead]
**Learning:** Chaining multiple array methods (`filter`, `forEach`) and using `Map` structures to group and aggregate large datasets on the frontend introduces measurable performance overhead (iterations and memory) compared to a single-pass loop with a plain Object accumulator.
**Action:** Prefer a single `for` loop with plain JavaScript Object accumulation over chaining array methods for filtering and aggregating data arrays on the frontend.
