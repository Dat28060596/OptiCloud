## 2024-10-24 - Avoid `new Date()` in hot sorting paths for ISO date strings
**Learning:** Instantiating `new Date()` within an array `sort` comparator for YYYY-MM-DD ISO 8601 strings causes unnecessary memory allocations and CPU overhead, especially as data grows.
**Action:** When sorting ISO date strings, use lexical string comparison (e.g. `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`) which correctly maintains strict weak ordering without the parsing and garbage collection penalty.
