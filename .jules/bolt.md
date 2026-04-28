## 2024-05-14 - ISO Date String Sorting
**Learning:** Parsing `new Date(string).getTime()` within a `sort` callback for ISO-formatted ('YYYY-MM-DD') strings is significantly slower (up to 5x) than doing a direct lexicographical string comparison (`a < b ? -1 : a > b ? 1 : 0`). This can cause unexpected UI freezes or jank in components rendering charts over large datasets when re-rendering happens frequently.
**Action:** Always use lexicographical string comparison for sorting ISO 8601 date strings or other naturally sortable formats instead of instantiating `Date` objects in JS/TS.
