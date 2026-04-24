## 2024-04-24 - Sorting ISO 8601 Date Strings
**Learning:** Instantiating `Date` objects dynamically within sort comparators causes massive memory allocations and is incredibly slow in JavaScript (O(N log N) object creations). For dates in `YYYY-MM-DD` format, lexicographical string comparison is fully equivalent chronologically.
**Action:** Always prefer direct string comparison (`a < b ? -1 : 1`) over parsing timestamps when sorting standard ISO date strings.
