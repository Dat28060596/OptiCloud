## 2024-05-27 - ISO Date Sorting Optimization
**Learning:** In V8/JavaScript execution, parsing strings into Date objects (`new Date(str).getTime()`) inside a `.sort()` comparator is excessively slow, taking ~117ms for 10k items. Since ISO-8601 strings ('YYYY-MM-DD') sort lexicographically identically to their chronological order, direct string comparison is ~13x faster (~8ms).
**Action:** Always prefer direct string comparison (`a < b ? -1 : a > b ? 1 : 0`) over `new Date().getTime()` or `localeCompare()` when sorting known ISO-8601 formatted date strings.
