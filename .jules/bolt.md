## 2024-05-23 - Optimizing Date Sorting in React Recharts
**Learning:** Parsing ISO date strings ('YYYY-MM-DD') using `new Date(string).getTime()` in a `sort()` comparator is extremely slow because it instantiates a new Date object for every comparison. For simple ISO date strings, standard string lexicographical comparison is over 3x faster in V8.
**Action:** When sorting ISO date strings ('YYYY-MM-DD'), use direct string comparison (`a.date < b.date ? -1 : a.date > b.date ? 1 : 0`) instead of parsing with `new Date().getTime()` to optimize performance and avoid expensive object creation.
