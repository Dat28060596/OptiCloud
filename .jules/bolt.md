## 2026-09-05 - Optimize sorting of ISO 8601 date strings
**Learning:** When sorting arrays of objects by an ISO 8601 formatted date string (e.g., 'YYYY-MM-DD'), using lexical string comparison is faster than instantiating `Date` objects inside the sort comparator.
**Action:** Use `(a.date < b.date ? -1 : (a.date > b.date ? 1 : 0))` rather than creating Date objects to avoid significant garbage collection overhead and improve execution speed in hot paths without introducing sort instability.
