## 2025-03-03 - ISO Date String Sorting
**Learning:** ISO 8601 date strings (`YYYY-MM-DD`) sort lexicographically in the exact same order as chronological time. Calling `new Date(dateString)` in a `.sort()` comparator creates massive O(N log N) object allocation and parsing overhead in JavaScript. Natively comparing the strings (`a < b`) executes ~6x faster in V8.
**Action:** Always prefer direct string comparison (`<` / `>`) over `new Date()` or `.localeCompare()` for ISO date strings within sorting comparators.
