## 2026-08-21 - Avoid Date Instantiation in Sort Comparators
**Learning:** Instantiating `Date` objects inside array `.sort()` methods (e.g., `new Date(a.date)`) for ISO 8601 formatted strings creates significant garbage collection overhead in hot paths.
**Action:** Use lexical string comparison (`a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`) for ISO 8601 date strings to maintain strict weak ordering without allocation overhead.
