## 2024-06-18 - Optimized Array Sorting for Date Strings
**Learning:** Replaced `new Date(a).getTime() - new Date(b).getTime()` with lexical string comparison in `Array.prototype.sort()` to improve performance. This avoids expensive Date object allocation and parsing inside a sorting loop, which is executed O(n log n) times.
**Action:** When sorting arrays of objects by an ISO 8601 formatted date string (e.g., 'YYYY-MM-DD'), prefer lexical string comparison `a < b ? -1 : (a > b ? 1 : 0)` over instantiating `Date` objects inside the sort comparator.
