## 2025-05-13 - [Date String Sorting Optimization]
**Learning:** In V8/JavaScript, comparing ISO date strings like 'YYYY-MM-DD' via direct string comparison operators (`a.date < b.date ? -1 : 1`) is drastically faster than parsing them into `Date` objects and calling `.getTime()`. In tests with 10,000 items, parsing to `Date` took ~6.06s while simple string comparison took ~1s.
**Action:** Always use simple string comparison (`<`, `>`, `===`) when sorting dates formatted consistently in ISO 8601 (e.g., 'YYYY-MM-DD'). Do not parse them into `Date` objects.
