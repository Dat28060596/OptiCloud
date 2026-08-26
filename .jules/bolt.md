## 2026-08-26 - Date Sorting Optimization
**Learning:** When sorting arrays of objects by an ISO 8601 formatted date string, instantiating `Date` objects inside the sort comparator creates significant garbage collection overhead and slows down hot paths.
**Action:** Prefer lexical string comparison `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` to maintain strict weak ordering and improve execution speed without sort instability.
