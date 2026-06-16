## 2024-05-15 - Fast ISO Date Sorting
**Learning:** Parsing dates inside `Array.prototype.sort()` using `new Date().getTime()` is a significant performance bottleneck due to repeated object allocation in the $O(N \log N)$ loop. Since ISO 8601 strings (like `YYYY-MM-DD`) are naturally lexicographically sortable, direct string comparison is >10x faster.
**Action:** Always prefer string comparison operators (`<`, `>`) over Date object instantiation when sorting strict ISO 8601 date strings.
