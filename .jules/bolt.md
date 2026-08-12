## 2024-05-18 - Optimize ISO 8601 Date Sorting
**Learning:** When sorting arrays of objects by an ISO 8601 formatted date string (e.g., 'YYYY-MM-DD'), instantiating `Date` objects inside the sort comparator introduces significant garbage collection overhead and is very slow.
**Action:** Prefer lexical string comparison (e.g., `a.date < b.date ? -1 : 1`) over `Date` instantiation for sorting ISO 8601 date strings.
