## YYYY-MM-DD - Initial Journal Entry
**Learning:** Initializing journal for Bolt.
**Action:** Document performance optimizations and bottlenecks.

## 2026-08-08 - Optimize sorting with string comparison instead of Date instantiation
**Learning:** Instantiating `Date` objects inside a sort comparator creates a large amount of short-lived objects leading to garbage collection overhead and slower execution, especially when rendering charts with many data points. Standard ISO date strings (`YYYY-MM-DD`) naturally sort lexically.
**Action:** Always prefer lexical string comparison for sorting ISO formatted date strings instead of creating `Date` objects in performance-critical paths like empty-dependency hooks, `useMemo` chart aggregations, or large data tables.
