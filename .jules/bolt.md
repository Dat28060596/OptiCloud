## 2025-03-09 - Lexical String Comparison for ISO 8601 Dates
**Learning:** When sorting arrays of objects by an ISO 8601 formatted date string (e.g., 'YYYY-MM-DD'), instantiating `Date` objects inside the sort comparator introduces significant garbage collection overhead and is extremely slow.
**Action:** Prefer lexical string comparison over `Date` instantiation. Use `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` to maintain strict weak ordering and improve execution speed without introducing sort instability.
