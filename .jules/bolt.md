## 2025-03-05 - Lexicographical Date Sorting
**Learning:** `localeCompare` is surprisingly much slower (~186ms for 10k dates) compared to parsing `new Date()` (~100ms), but direct string comparison (`a < b`) is dramatically faster (~11.6ms).
**Action:** Always prefer direct string comparison (`<`, `>`) over `localeCompare()` or `Date()` parsing when sorting ISO-formatted date strings like `YYYY-MM-DD`.
