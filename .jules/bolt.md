## 2025-03-05 - V8 String Comparison Optimization
**Learning:** `localeCompare` and `new Date().getTime()` evaluate significantly slower in V8/JavaScript execution than simple lexicographical comparisons for YYYY-MM-DD strings. Sorting 10,000 dates 100 times took ~4708ms with `new Date()` vs ~725ms with string `<`/`>` operators.
**Action:** Always prefer direct string comparison (`a < b ? -1 : a > b ? 1 : 0`) over `Date` parsing when sorting ISO-formatted date strings to avoid expensive object creation and garbage collection overhead.
