## 2024-06-01 - [Cost Explorer O(N) single-pass optimization]
**Learning:** Chaining `.filter` and `.forEach` with `new Map()` on large datasets on the frontend has a massive performance overhead due to iterating over arrays multiple times and Map object management overhead. Using a single `for` loop and a plain `Record<string, ...>` accumulator is > 2.5x faster in JS engines.
**Action:** When filtering, grouping, and aggregating large datasets on the frontend, prefer a single `for` loop with plain JavaScript Object accumulation over chaining multiple array methods or using Map structures to significantly improve performance by reducing iterations and memory overhead.
## 2024-06-01 - [Pre-existing TS errors and package boundaries]
**Learning:** Adding new types to fix existing `tsc` errors by installing `@types/react` modifies `package.json`, which strictly violates my instructions when acting as Bolt. I must accept pre-existing build/type errors if fixing them violates core boundaries.
**Action:** Reverted the `package.json` changes and restored `Dashboard.tsx` to its original state. Will submit the optimization PR as is since it safely addresses a standalone runtime concern.
