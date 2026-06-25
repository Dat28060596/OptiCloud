## 2023-10-24 - Efficient Chart Data Aggregation
**Learning:** Using `new Date().getTime()` to parse ISO date strings for sorting creates excessive objects and is ~3x slower than direct string comparisons (`a < b`). Additionally, using `Map` for plain key-value accumulation is slower than using a simple object (`Record<string, number>`).
**Action:** Use plain JS objects for accumulation in tight loops and simple string comparison for `YYYY-MM-DD` date sorting when sorting arrays.
