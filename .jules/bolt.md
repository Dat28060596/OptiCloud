## 2026-08-20 - Optimize chart data sorting performance
**Learning:** Instantiating `Date` objects inside a `.sort()` comparator creates significant garbage collection overhead and slows down execution for large datasets when sorting ISO 8601 date strings.
**Action:** When sorting arrays by an ISO 8601 formatted date string (e.g., 'YYYY-MM-DD'), prefer lexical string comparison (`a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`) over instantiating `Date` objects inside the comparator.
