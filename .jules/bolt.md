## 2024-05-24 - Avoid Date parsing for ISO string sorting
**Learning:** Parsing ISO string dates (YYYY-MM-DD) via `new Date(str).getTime()` is significantly slower (up to 5-10x) than standard lexicographical string comparison due to object allocation overhead and date parsing. In frontend rendering with large timeseries cost datasets, this causes measurable main-thread blocking.
**Action:** Always use direct string comparison (`a < b ? -1 : a > b ? 1 : 0`) for sorting standardized ISO date formats instead of instantiating `Date` objects.
