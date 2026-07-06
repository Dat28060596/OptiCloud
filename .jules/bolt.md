## 2024-07-06 - [Optimize date string sorting]
**Learning:** ISO date strings (like 'YYYY-MM-DD') sort lexicographically. Parsing them into `Date` objects for sorting with `getTime()` is a significant performance bottleneck (over 10x slower) that can be easily avoided using direct string comparisons.
**Action:** When sorting ISO date strings, always use direct string comparison (`a.date < b.date ? -1 : a.date > b.date ? 1 : 0`) instead of parsing dates. Avoid `String.prototype.localeCompare()` for this, as it is also slower than direct comparison operators.
