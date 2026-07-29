## 2025-03-08 - Combining Data Loops in React

**Learning:** When dealing with multiple operations on large arrays in React (like filtering, grouping, and aggregating), chaining methods like `filter()` and `forEach()` with intermediate structures like `Map` is noticeably slower than a single `for` loop that accumulates data into a plain JavaScript object. The overhead of iterating the array multiple times and initializing Map structures adds up.

**Action:** Prefer single-pass operations using `for` loops and plain JavaScript object accumulators (`Record<string, ...>`) for filtering and grouping large datasets on the frontend to improve execution speed.
