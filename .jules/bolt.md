## 2024-05-24 - Sorting ISO Date Strings
**Learning:** Parsing ISO date strings like 'YYYY-MM-DD' into Date objects inside a `.sort()` comparator (`new Date(a.date).getTime()`) is significantly slower than doing a simple string comparison (`a.date < b.date ? -1 : a.date > b.date ? 1 : 0`), because it creates an object for every comparison. The standard ISO date format is designed to be lexically comparable.
**Action:** When sorting ISO date strings, use direct string comparisons instead of `new Date().getTime()`.
