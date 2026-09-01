## 2026-09-01 - Optimize date sorting
**Learning:** Instantiating `Date` objects inside the sort comparator for an array of ISO 8601 formatted date strings introduces significant garbage collection overhead, especially in hot paths. Lexical string comparison provides the same result much faster.
**Action:** When sorting arrays of objects by an ISO 8601 formatted date string, use lexical string comparison (e.g., `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`) rather than instantiating `Date` objects.
