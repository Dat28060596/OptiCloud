## 2025-03-09 - Optimize Date Sorting
**Learning:** Lexical string comparison should be preferred over `new Date()` instantiations inside sort comparators for ISO 8601 formatted date strings to avoid unnecessary object creation and improve performance in hot paths.
**Action:** Use string comparison `a < b ? -1 : (a > b ? 1 : 0)` when sorting date strings instead of parsing them into Date objects.
