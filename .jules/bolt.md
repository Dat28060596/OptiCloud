## 2024-05-18 - Optimized date sort in Chart Data
**Learning:** Re-instantiating `Date` objects repeatedly inside a `.sort()` comparator creates massive garbage collection pressure and CPU overhead for larger arrays.
**Action:** When sorting by standard ISO 8601 date strings, rely on simple lexical string comparison (e.g., `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`) which correctly orders YYYY-MM-DD values significantly faster.
