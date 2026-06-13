## 2024-06-13 - [Sorting ISO Date Strings]
**Learning:** Parsing ISO date strings ('YYYY-MM-DD') using `new Date(string).getTime()` in a tight loop/sort function is surprisingly slow in JavaScript due to expensive Date object creation and parsing overhead. Lexicographical string comparison is natively supported and significantly faster for this specific format.
**Action:** Always use direct string comparison (`a < b ? -1 : a > b ? 1 : 0`) for sorting ISO-8601 formatted date strings instead of converting them to Date objects first.
