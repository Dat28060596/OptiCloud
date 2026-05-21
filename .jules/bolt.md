## 2024-05-14 - Direct String Comparison for Date Sorting
**Learning:** In V8/JavaScript execution, parsing ISO date strings (e.g., 'YYYY-MM-DD') using `new Date().getTime()` is an expensive operation that can cause a bottleneck when sorting large datasets.
**Action:** When sorting ISO date strings ('YYYY-MM-DD'), use direct string comparison (`a.date < b.date ? -1 : a.date > b.date ? 1 : 0`) instead of parsing with `new Date().getTime()` to optimize performance and avoid expensive object creation.
