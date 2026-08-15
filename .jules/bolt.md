## 2026-08-15 - Lexical Date Sorting Optimization
**Learning:** When sorting arrays of objects by an ISO 8601 formatted date string (e.g., 'YYYY-MM-DD'), prefer lexical string comparison (e.g., `a.date < b.date ? -1 : 1`) over instantiating `Date` objects inside the sort comparator. This avoids significant garbage collection overhead and greatly improves execution speed in hot paths.
**Action:** Always use string comparison for ISO 8601 formatted date strings instead of creating new Date objects in sorting functions.
