## 2026-07-19 - Optimize ISO Date Sorting
**Learning:** Parsing dates (e.g. `new Date(d).getTime()`) inside `.sort()` loops is a common frontend performance bottleneck, especially on large datasets. ISO 8601 formatted date strings ('YYYY-MM-DD') are naturally lexicographically sortable.
**Action:** When sorting dates that are already in a standard ISO string format, use direct string comparison (e.g. `a < b ? -1 : a > b ? 1 : 0`) instead of instantiating `Date` objects to achieve roughly 10x faster sorting performance.
