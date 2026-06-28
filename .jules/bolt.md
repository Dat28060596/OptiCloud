## 2026-06-28 - [Optimize ISO Date Sorting]
**Learning:** Instantiating `new Date()` within array `.sort()` callbacks for large datasets causes a significant performance bottleneck due to excessive object creation and parsing overhead.
**Action:** For ISO 8601 formatted date strings (like `YYYY-MM-DD`), use direct lexicographical string comparisons (`a < b ? -1 : a > b ? 1 : 0`) instead of parsing them into Date objects.
