## 2024-05-24 - [ISO Date Sorting Performance]
**Learning:** Parsing ISO date strings ('YYYY-MM-DD') using `new Date(date).getTime()` inside a `.sort()` comparator creates massive object allocation overhead and slows down sorting by ~5-6x compared to direct string comparison in V8.
**Action:** Always use string comparison (`a.date < b.date ? -1 : a.date > b.date ? 1 : 0`) when sorting standard ISO date strings instead of converting to Date objects.
