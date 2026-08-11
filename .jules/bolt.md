## 2025-02-28 - Fast Date Sorting in JS
**Learning:** Instantiating `Date` objects inside a `sort` comparator for ISO 8601 string dates (YYYY-MM-DD) introduces significant garbage collection overhead and slows down hot paths. Lexical string comparison is natively supported and vastly faster.
**Action:** Use string comparison (`a < b ? -1 : 1`) when sorting arrays by ISO 8601 formatted date strings instead of creating temporary `Date` objects.
