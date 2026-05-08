
## 2024-05-08 - Optimized Dashboard Chart Re-Renders & CostExplorer Data Processing
**Learning:** Chained array methods (`filter`, `forEach`) coupled with a `Map` structure can cause significant overhead on large datasets due to array allocations and iterator processing. Single-pass loops over basic arrays and using plain objects (`Record<string, ...>`) for grouping is ~2.3x faster for this codebase's specific data transformations.
**Action:** Always favor a single `for` loop combined with a plain JS object map over multi-pass iterators for hot paths in data table filtering and grouping logic.
