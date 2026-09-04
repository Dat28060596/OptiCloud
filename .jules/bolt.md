## 2026-09-04 - Lexical Sort for ISO 8601 Strings
**Learning:** Instantiating `Date` objects inside array sort comparators for ISO 8601 date strings (YYYY-MM-DD) introduces garbage collection overhead. Lexical string comparison is faster and maintains the correct strict weak ordering.
**Action:** Always use lexical string comparison `a < b ? -1 : (a > b ? 1 : 0)` when sorting ISO 8601 formatted date strings instead of `new Date()`.
