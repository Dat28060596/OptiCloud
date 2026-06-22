## 2024-05-15 - Fast Date String Sorting
**Learning:** Parsing `YYYY-MM-DD` strings with `new Date().getTime()` is highly inefficient, about 5-6x slower than direct string comparison inside V8, due to the overhead of creating Date objects.
**Action:** When sorting standard ISO date strings, always use direct lexicographical string comparison (`a < b ? -1 : a > b ? 1 : 0`).
