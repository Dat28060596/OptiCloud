## 2024-06-12 - Date Sorting Performance
**Learning:** In Javascript, parsing 'YYYY-MM-DD' dates via `new Date(str).getTime()` during array `.sort()` operations causes excessive object creation overhead, especially in loops/reducers in Recharts data preparation like `Dashboard.tsx`. String comparison is ~13x faster.
**Action:** Always use simple string comparison (`a.date < b.date ? -1 : a.date > b.date ? 1 : 0`) for sorting ISO 8601 date strings.
