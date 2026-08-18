## 2024-05-15 - [String Comparison for Date Sorting]
**Learning:** Creating new `Date` objects inside an array `sort` comparator for ISO 8601 (`YYYY-MM-DD`) strings causes significant unnecessary overhead and garbage collection. Lexical string comparison is naturally safe and much faster for this format.
**Action:** When sorting arrays of objects by an ISO 8601 date string, prefer lexical string comparison (`a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`) over instantiating `Date` objects inside the sort comparator.
